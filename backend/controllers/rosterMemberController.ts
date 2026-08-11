import { Request, RequestHandler, Response } from 'express';
import type { WhereFilterOp } from 'firebase-admin/firestore';
import { RosterMemberFS, comparePassword, setMemberJwtCookie, COLLECTION as MEMBER_COL } from '../models/rosterMemberModel';
import { OpportunityFS, COLLECTION as OPP_COL } from '../models/opportunityModel';
import { RosterEventFS } from '../models/rosterEventModel';
import { db, arrayUnion } from '../utils/firestore';
import { sendWelcomeMemberEmail, sendNewApplicationAlert } from '../utils/resend';

type FSFilter = [string, WhereFilterOp, unknown];

function calcProfileScore(m: any): number {
  let score = 10;
  if (m.photo) score += 10;
  if (m.bio && m.bio.length > 30) score += 10;
  if (m.skills && m.skills.length >= 3) score += 10;
  if (m.languages && m.languages.length > 0) score += 10;
  if (m.education && m.education.length > 0) score += 10;
  if (m.experience && m.experience.length > 0) score += 10;
  if (m.certifications && m.certifications.length > 0) score += 10;
  if (m.deploymentType) score += 10;
  if (m.linkedIn) score += 5;
  if (m.availabilityDate) score += 5;
  return Math.min(score, 100);
}

export const registerRosterMember: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !phone) {
      res.status(400).json({ message: 'Please fill all required fields' });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email address' });
      return;
    }
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password must be 8+ chars with uppercase, lowercase, number and special character' });
      return;
    }
    const exists = await RosterMemberFS.findByEmail(email.toLowerCase());
    if (exists) {
      res.status(400).json({ message: 'An account with this email already exists' });
      return;
    }
    const member = await RosterMemberFS.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      rosterStatus: 'applied',
      applicationDate: new Date().toISOString(),
      photo: '',
      dateOfBirth: null,
      gender: 'Prefer not to say',
      nationality: '',
      countryOfResidence: '',
      city: '',
      timezone: '',
      bio: '',
      linkedIn: '',
      twitter: '',
      website: '',
      skills: [],
      languages: [],
      education: [],
      experience: [],
      certifications: [],
      sectors: [],
      deploymentType: 'both',
      availabilityDate: null,
      preferredRegions: [],
      dailyRate: 0,
      monthlyRate: 0,
      currency: 'USD',
      interviewDate: null,
      interviewNotes: '',
      contractSigned: false,
      contractSignedDate: null,
      contractUrl: '',
      adminNotes: [],
      projects: [],
      eventsAttended: [],
      recognitions: [],
      deploymentHistory: [],
      profileCompletionScore: 10,
      lastActive: new Date().toISOString(),
      availabilityStatus: 'available',
      motivationStatement: '',
    });
    setMemberJwtCookie(member.id, res);
    const memberObj = { ...member } as any;
    delete memberObj.password;
    // Fire-and-forget emails — never block the response
    sendWelcomeMemberEmail(email.toLowerCase(), firstName).catch(() => {});
    sendNewApplicationAlert(`${firstName} ${lastName}`, email.toLowerCase(), [], '').catch(() => {});
    res.status(201).json({ message: 'Application submitted successfully', member: memberObj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const loginRosterMember: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }
    const member = await RosterMemberFS.findByEmail(email.toLowerCase());
    if (!member) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const valid = await comparePassword(password, member.password);
    if (!valid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    await RosterMemberFS.update(member.id, { lastActive: new Date().toISOString() });
    setMemberJwtCookie(member.id, res);
    const memberObj = { ...member } as any;
    delete memberObj.password;
    res.status(200).json({ message: 'Logged in successfully', member: memberObj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const logoutRosterMember: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMyProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = req.user as any;
    if (!member) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateMyProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = req.user as any;
    if (!member) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }
    const forbidden = ['email', 'password', 'rosterStatus', 'contractSigned', 'adminNotes', 'deploymentHistory', 'applicationDate'];
    const updateData = { ...req.body };
    forbidden.forEach(f => delete updateData[f]);
    const updated = await RosterMemberFS.update(member.id, updateData);
    if (!updated) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }
    const score = calcProfileScore(updated);
    await RosterMemberFS.update(member.id, { profileCompletionScore: score });
    const memberObj = { ...updated } as any;
    delete memberObj.password;
    res.status(200).json({ message: 'Profile updated', member: { ...memberObj, profileCompletionScore: score } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getOpportunities: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, region, page = 1, limit = 12 } = req.query;
    const filters: FSFilter[] = [['status', '==', 'open']];
    if (type) filters.push(['type', '==', type as string]);
    if (region) filters.push(['region', '==', region as string]);
    const offsetN = (Number(page) - 1) * Number(limit);
    const [opportunities, total] = await Promise.all([
      OpportunityFS.query(filters, Number(limit), offsetN),
      OpportunityFS.count(filters),
    ]);
    res.status(200).json({ opportunities, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const applyToOpportunity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = req.user as any;
    const id = req.params.id as string;
    const opportunity = await OpportunityFS.findById(id);
    if (!opportunity || opportunity.status !== 'open') {
      res.status(404).json({ message: 'Opportunity not found or no longer open' });
      return;
    }
    const alreadyApplied = (opportunity.applicants || []).some(a => a.memberId === String(member.id));
    if (alreadyApplied) {
      res.status(400).json({ message: 'You have already applied to this opportunity' });
      return;
    }
    const newApplicant = {
      memberId: String(member.id),
      memberName: `${member.firstName} ${member.lastName}`,
      appliedAt: new Date().toISOString(),
      status: 'pending',
    };
    await db.collection(OPP_COL).doc(id).update({
      applicants: arrayUnion(newApplicant),
    });
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getMyDeployments: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = req.user as any;
    res.status(200).json({ deployments: member.deploymentHistory || [] });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getMyEvents: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Firestore can only use 'in' operator for array membership; query upcoming/ongoing with separate calls or a single filter
    const [upcoming, ongoing] = await Promise.all([
      RosterEventFS.query([['status', '==', 'upcoming']], 10, 0, 'date', 'asc'),
      RosterEventFS.query([['status', '==', 'ongoing']], 10, 0, 'date', 'asc'),
    ]);
    const events = [...upcoming, ...ongoing]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
