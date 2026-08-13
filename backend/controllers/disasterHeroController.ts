import crypto from 'crypto';
import { Request, RequestHandler, Response } from 'express';
import { DisasterHeroFS, comparePassword, hashPassword, setHeroJwtCookie } from '../models/disasterHeroModel';
import cloudinary from '../utils/cloudinary';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'WDC Disaster Heroes <roster@worlddisastercenter.org>';
const ADMIN_EMAIL = 'office@worlddisastercenter.org';
const FRONTEND_URL = process.env.ALLOWED_ORIGIN?.split(',')[0]?.trim() || 'https://www.worlddisastercenter.org';

// ─── helpers ──────────────────────────────────────────────────────────────────

async function uploadToCloudinary(buffer: Buffer, mimetype: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'disaster-heroes', resource_type: 'image', transformation: [{ width: 400, height: 400, crop: 'fill' }] },
      (err, result) => {
        if (err || !result) return reject(err || new Error('Upload failed'));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

async function sendApplicationConfirmation(name: string, email: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your WDC Disaster Heroes Application — Received',
      html: `<p>Hi ${name},</p><p>We've received your application to join WDC Disaster Heroes. Our team will review it within 5–7 business days and notify you at this email.</p><p>— World Disaster Center</p>`,
    });
  } catch { /* silent */ }
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
      try { photoUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype); }
      catch { /* photo optional */ }
    }

    const hero = await DisasterHeroFS.create({
      fullName,
      email: email.toLowerCase(),
      password,
      organization: organization || '',
      heroRole: heroRole || '',
      linkedinUrl: linkedinUrl || '',
      sectors: JSON.parse(sectors || '[]'),
      skills: JSON.parse(skills || '[]'),
      languages: JSON.parse(languages || '[]'),
      availability,
      country,
      city,
      motivation,
      experience: experience || '',
      photoUrl,
      status: 'pending',
      approvedAt: null,
    });

    sendApplicationConfirmation(fullName, email.toLowerCase()).catch(() => {});
    sendNewHeroAlert(fullName, email.toLowerCase(), country).catch(() => {});

    res.status(201).json({ message: 'Application submitted. You will hear from us within 5–7 business days.' });
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
