import crypto from 'crypto';
import { Request, RequestHandler, Response } from 'express';
import { DisasterHeroFS, comparePassword, hashPassword, setHeroJwtCookie } from '../models/disasterHeroModel';
import { uploadToGCS } from '../utils/gcs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'WDC Disaster Heroes <roster@worlddisastercenter.org>';
const ADMIN_EMAIL = 'office@worlddisastercenter.org';
const FRONTEND_URL = process.env.ALLOWED_ORIGIN?.split(',')[0]?.trim() || 'https://www.worlddisastercenter.org';

// ─── helpers ──────────────────────────────────────────────────────────────────

async function sendWelcomeEmail(name: string, email: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Welcome to WDC Disaster Heroes — Your account is ready!',
      html: `<p>Hi ${name},</p><p>Your WDC Disaster Heroes account is active. You can sign in now at <a href="${FRONTEND_URL}/disaster-heroes/login">${FRONTEND_URL}/disaster-heroes/login</a>.</p><p>Our AI system (ARIA) is reviewing your profile in the background. Once verified, you'll receive a Verified Hero badge and access to advanced features.</p><p>— World Disaster Center</p>`,
    });
  } catch { /* silent */ }
}

async function runAriaVerification(heroId: string, data: {
  fullName: string; country: string; city: string; heroRole: string;
  motivation: string; experience: string; sectors: string[]; skills: string[];
  organization: string;
}) {
  if (!process.env.ANTHROPIC_API_KEY) return;
  try {
    const prompt = `You are ARIA, the WDC Disaster Heroes verification AI. Review this Disaster Hero application and decide if the person is genuine.

Applicant:
- Name: ${data.fullName}
- Country/City: ${data.country}, ${data.city}
- Role: ${data.heroRole || 'Not specified'}
- Organization: ${data.organization || 'Independent'}
- Sectors: ${data.sectors.join(', ')}
- Skills: ${data.skills.join(', ')}
- Motivation: ${data.motivation}
- Experience: ${data.experience || 'Not provided'}

Criteria:
- Approve if: motivation is genuine and specific, person is from or works in disaster-prone/humanitarian context, skills align with humanitarian work
- Needs more info if: motivation is vague/generic, inconsistencies in profile
- Flag if: clear red flags (fake info, spam patterns, malicious intent)
- Be inclusive: accept volunteers, students, community workers, professionals; accept all countries; do not require formal credentials

Respond ONLY with valid JSON:
{"decision":"verified"|"needs_more_info"|"flagged","score":0-100,"notes":"brief reason for admin","userMessage":"friendly message to show user"}`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const json = await resp.json() as any;
    const raw = json?.content?.[0]?.text || '';
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return;

    const result = JSON.parse(match[0]);
    const decision = ['verified', 'needs_more_info', 'flagged'].includes(result.decision)
      ? result.decision : 'needs_more_info';

    await DisasterHeroFS.update(heroId, {
      verificationStatus: decision,
      verificationScore: result.score ?? null,
      verificationNotes: result.notes ?? null,
      verifiedAt: decision === 'verified' ? new Date().toISOString() : null,
    });
  } catch { /* silent — verification can be retried manually */ }
}

async function sendApprovalEmail(name: string, email: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Welcome to WDC Disaster Heroes — You\'re Approved!',
      html: `<p>Hi ${name},</p><p>Congratulations! Your application to WDC Disaster Heroes has been approved. You can now sign in at ${FRONTEND_URL}/disaster-heroes/login.</p><p>— World Disaster Center</p>`,
    });
  } catch { /* silent */ }
}

async function sendRejectionEmail(name: string, email: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Update on Your WDC Disaster Heroes Application',
      html: `<p>Hi ${name},</p><p>Thank you for applying to WDC Disaster Heroes. After careful review, we are unable to move forward with your application at this time. You are welcome to apply again in the future.</p><p>— World Disaster Center</p>`,
    });
  } catch { /* silent */ }
}

async function sendNewHeroAlert(name: string, email: string, country: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New Disaster Hero Application — ${name}`,
      html: `<p>New application from <strong>${name}</strong> (${email}) from ${country}. Review at ${FRONTEND_URL}/disaster-heroes/admin</p>`,
    });
  } catch { /* silent */ }
}

// ─── Member endpoints ──────────────────────────────────────────────────────────

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName, email, password, organization, heroRole, linkedinUrl,
      sectors, skills, languages, availability, country, city, motivation, experience,
    } = req.body;

    if (!fullName || !email || !password || !availability || !country || !city || !motivation) {
      res.status(400).json({ message: 'Please fill all required fields' }); return;
    }
    if (!sectors || JSON.parse(sectors).length === 0) {
      res.status(400).json({ message: 'Select at least one sector' }); return;
    }
    if (!skills || JSON.parse(skills).length === 0) {
      res.status(400).json({ message: 'Select at least one skill' }); return;
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) { res.status(400).json({ message: 'Invalid email address' }); return; }

    const pwRx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;
    if (!pwRx.test(password)) {
      res.status(400).json({ message: 'Password must be 8+ chars with uppercase, lowercase, number and special character' }); return;
    }

    const exists = await DisasterHeroFS.findByEmail(email.toLowerCase());
    if (exists) { res.status(400).json({ message: 'An account with this email already exists' }); return; }

    let photoUrl = '';
    if (req.file) {
      try { photoUrl = await uploadToGCS(req.file.buffer, req.file.mimetype, 'disaster-heroes'); }
      catch { /* photo optional */ }
    }

    const parsedSectors = JSON.parse(sectors || '[]');
    const parsedSkills = JSON.parse(skills || '[]');
    const parsedLanguages = JSON.parse(languages || '[]');

    const hero = await DisasterHeroFS.create({
      fullName,
      email: email.toLowerCase(),
      password,
      organization: organization || '',
      heroRole: heroRole || '',
      linkedinUrl: linkedinUrl || '',
      sectors: parsedSectors,
      skills: parsedSkills,
      languages: parsedLanguages,
      availability,
      country,
      city,
      motivation,
      experience: experience || '',
      photoUrl,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      verificationStatus: 'reviewing',
      verificationScore: null,
      verificationNotes: null,
      verifiedAt: null,
    });

    sendWelcomeEmail(fullName, email.toLowerCase()).catch(() => {});
    sendNewHeroAlert(fullName, email.toLowerCase(), country).catch(() => {});

    runAriaVerification(hero.id!, {
      fullName, country, city,
      heroRole: heroRole || '',
      motivation, experience: experience || '',
      sectors: parsedSectors, skills: parsedSkills,
      organization: organization || '',
    }).catch(() => {});

    res.status(201).json({ message: 'Account created! You can sign in now.', autoApproved: true });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { res.status(400).json({ message: 'Please provide email and password' }); return; }

    const hero = await DisasterHeroFS.findByEmail(email.toLowerCase());
    if (!hero) { res.status(401).json({ message: 'Invalid email or password' }); return; }

    const valid = await comparePassword(password, hero.password);
    if (!valid) { res.status(401).json({ message: 'Invalid email or password' }); return; }

    if (hero.status === 'pending') {
      res.status(403).json({ message: 'Your application is still under review. You\'ll be notified when approved.' }); return;
    }
    if (hero.status === 'rejected') {
      res.status(403).json({ message: 'Your application was not accepted. Contact office@worlddisastercenter.org for details.' }); return;
    }

    const token = setHeroJwtCookie(hero.id!, res);
    const heroObj = { ...hero } as any;
    delete heroObj.password;
    res.status(200).json({ token, hero: heroObj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const logout: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  res.cookie('dh_jwt', '', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 0 });
  res.status(200).json({ message: 'Logged out' });
};

export const getMe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ hero: req.hero });
};

export const forgotPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) { res.status(400).json({ message: 'Email is required' }); return; }
    const hero = await DisasterHeroFS.findByEmail(email.toLowerCase());
    res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
    if (!hero) return;

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await DisasterHeroFS.update(hero.id!, { resetPasswordToken: token, resetPasswordExpiry: expiry });

    if (!process.env.RESEND_API_KEY) return;
    const resetUrl = `${FRONTEND_URL}/disaster-heroes/reset-password?token=${token}`;
    await resend.emails.send({
      from: FROM,
      to: hero.email,
      subject: 'WDC Disaster Heroes — Password Reset',
      html: `<p>Hi ${hero.fullName},</p><p>Click the link below to reset your password (expires in 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, ignore this email.</p>`,
    });
  } catch { res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' }); }
};

export const resetPassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;
    if (!token || !password) { res.status(400).json({ message: 'Token and new password are required' }); return; }

    const pwRx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/;
    if (!pwRx.test(password)) { res.status(400).json({ message: 'Password must be 8+ chars with uppercase, lowercase, number and special character' }); return; }

    const snap = await (await import('../utils/firestore')).db
      .collection('disasterHeroes')
      .where('resetPasswordToken', '==', token)
      .limit(1)
      .get();
    if (snap.empty) { res.status(400).json({ message: 'Invalid or expired reset link.' }); return; }

    const doc = snap.docs[0];
    const hero = doc.data();
    if (!hero.resetPasswordExpiry || new Date(hero.resetPasswordExpiry) < new Date()) {
      res.status(400).json({ message: 'This reset link has expired.' }); return;
    }

    const hashed = await hashPassword(password);
    await doc.ref.update({ password: hashed, resetPasswordToken: null, resetPasswordExpiry: null });
    res.status(200).json({ message: 'Password reset successfully. You can now sign in.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// ─── Admin endpoints ───────────────────────────────────────────────────────────

export const adminListHeroes: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filters: [string, any, unknown][] = [];
    if (status && status !== 'all') filters.push(['status', '==', status as string]);
    const offsetN = (Number(page) - 1) * Number(limit);
    const [heroes, total] = await Promise.all([
      DisasterHeroFS.query(filters, Number(limit), offsetN),
      DisasterHeroFS.count(filters),
    ]);
    const safe = heroes.map(h => { const o = { ...h } as any; delete o.password; return o; });
    res.status(200).json({ heroes: safe, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const adminUpdateStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { status } = req.body as { status: string };
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' }); return;
    }

    const hero = await DisasterHeroFS.findById(id);
    if (!hero) { res.status(404).json({ message: 'Hero not found' }); return; }

    const update: any = { status };
    if (status === 'approved') update.approvedAt = new Date().toISOString();
    else update.approvedAt = null;

    await DisasterHeroFS.update(id, update);

    if (status === 'approved') sendApprovalEmail(hero.fullName, hero.email).catch(() => {});
    if (status === 'rejected') sendRejectionEmail(hero.fullName, hero.email).catch(() => {});

    res.status(200).json({ message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
