import { Request, RequestHandler, Response } from 'express';
import type { WhereFilterOp } from 'firebase-admin/firestore';
import { RosterMemberFS, COLLECTION as MEMBER_COL } from '../models/rosterMemberModel';
import { RosterAdminFS, compareAdminPassword, setAdminJwtCookie } from '../models/rosterAdminModel';
import { PartnerFS } from '../models/partnerModel';
import { OpportunityFS } from '../models/opportunityModel';
import { DeploymentFS } from '../models/deploymentModel';
import { RosterEventFS } from '../models/rosterEventModel';
import { db, arrayUnion } from '../utils/firestore';

type FSFilter = [string, WhereFilterOp, unknown];
import {
  sendStatusUpdateEmail,
  sendDeploymentConfirmedEmail,
  sendPartnerWelcomeEmail,
  sendNewPartnerAlert,
} from '../utils/resend';

export const seedSuperAdmin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await RosterAdminFS.count();
    if (count > 0) {
      res.status(400).json({ message: 'Admins already exist. Seed is disabled.' });
      return;
    }
    const { name, email, password, seedKey } = req.body;
    if (seedKey !== process.env.ADMIN_SEED_KEY) {
      res.status(403).json({ message: 'Invalid seed key' });
      return;
    }
    await RosterAdminFS.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'super',
      permissions: ['approve_members', 'post_opportunities', 'manage_partners', 'view_contracts', 'manage_admins'],
      isActive: true,
      createdBy: 'system',
      lastLogin: null,
    });
    res.status(201).json({ message: 'Super admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const loginAdmin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }
    const admin = await RosterAdminFS.findByEmail(email.toLowerCase());
    if (!admin || !admin.isActive) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const valid = await compareAdminPassword(password, admin.password);
    if (!valid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    await RosterAdminFS.update(admin.id, { lastLogin: new Date().toISOString() });
    setAdminJwtCookie(admin.id, res);
    const adminObj = { ...admin } as any;
    delete adminObj.password;
    res.status(200).json({ message: 'Logged in successfully', admin: adminObj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const logoutAdmin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('jwt_admin');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getDashboardStats: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalMembers, activeMembers, deployed, pendingApps, totalPartners, openOpps] = await Promise.all([
      RosterMemberFS.count(),
      RosterMemberFS.count([['rosterStatus', '==', 'active']]),
      RosterMemberFS.count([['rosterStatus', '==', 'deployed']]),
      // Firestore doesn't support 'in' with countDocs in our helper — count each and sum
      Promise.all([
        RosterMemberFS.count([['rosterStatus', '==', 'applied']]),
        RosterMemberFS.count([['rosterStatus', '==', 'screening']]),
        RosterMemberFS.count([['rosterStatus', '==', 'interview_scheduled']]),
        RosterMemberFS.count([['rosterStatus', '==', 'background_check']]),
      ]).then(counts => counts.reduce((a, b) => a + b, 0)),
      PartnerFS.count([['status', '==', 'active']]),
      OpportunityFS.count([['status', '==', 'open']]),
    ]);

    // Recent 5 members
    const recentMembers = await RosterMemberFS.query([], 5, 0);
    const recentMembersClean = recentMembers.map(({ firstName, lastName, email, rosterStatus, applicationDate, nationality, id }) => ({
      id, firstName, lastName, email, rosterStatus, applicationDate, nationality,
    }));

    res.status(200).json({
      totalMembers,
      activeMembers,
      deployed,
      pendingApps,
      totalPartners,
      openOpps,
      deploymentsMonth: 0, // Firestore doesn't support range queries with our count helper without composite index
      deploymentsToday: 0,
      recentMembers: recentMembersClean,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getMembers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filters: FSFilter[] = [];
    if (status) filters.push(['rosterStatus', '==', status as string]);
    const offsetN = (Number(page) - 1) * Number(limit);
    const [members, total] = await Promise.all([
      RosterMemberFS.query(filters, Number(limit), offsetN),
      RosterMemberFS.count(filters),
    ]);
    const membersClean = members.map(m => { const o = { ...m } as any; delete o.password; return o; });
    res.status(200).json({ members: membersClean, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getMemberById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await RosterMemberFS.findById(req.params.id as string);
    if (!member) {
      res.status(404).json({ message: 'Member not found' });
      return;
    }
    const memberObj = { ...member } as any;
    delete memberObj.password;
    res.status(200).json(memberObj);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateMemberStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { rosterStatus, note } = req.body;

    if (note) {
      const member = await RosterMemberFS.findById(req.params.id as string);
      if (!member) { res.status(404).json({ message: 'Member not found' }); return; }
      const newNote = { note, addedBy: admin.email, date: new Date().toISOString() };
      const updatePayload: any = { adminNotes: arrayUnion(newNote) };
      if (rosterStatus) updatePayload.rosterStatus = rosterStatus;
      await db.collection(MEMBER_COL).doc(req.params.id as string).update(updatePayload);
      if (rosterStatus) {
        sendStatusUpdateEmail(member.email, member.firstName, rosterStatus, note).catch(() => {});
      }
      res.status(200).json({ message: 'Status updated' });
      return;
    }

    const update: any = {};
    if (rosterStatus) update.rosterStatus = rosterStatus;
    const updated = await RosterMemberFS.update(req.params.id as string, update);
    if (!updated) { res.status(404).json({ message: 'Member not found' }); return; }
    if (rosterStatus) {
      sendStatusUpdateEmail(updated.email, updated.firstName, rosterStatus).catch(() => {});
    }
    const updatedObj = { ...updated } as any;
    delete updatedObj.password;
    res.status(200).json({ message: 'Status updated', member: updatedObj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const addAdminNote: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { note } = req.body;
    if (!note) { res.status(400).json({ message: 'Note is required' }); return; }
    const member = await RosterMemberFS.findById(req.params.id as string);
    if (!member) { res.status(404).json({ message: 'Member not found' }); return; }
    const newNote = { note, addedBy: admin.email, date: new Date().toISOString() };
    await db.collection(MEMBER_COL).doc(req.params.id as string).update({
      adminNotes: arrayUnion(newNote),
    });
    const notes = [...(member.adminNotes || []), newNote];
    res.status(200).json({ message: 'Note added', notes });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteAdminNote: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await RosterMemberFS.findById(req.params.id as string);
    if (!member) { res.status(404).json({ message: 'Member not found' }); return; }
    const idx = Number(req.params.noteIndex as string);
    const notes = member.adminNotes || [];
    if (idx < 0 || idx >= notes.length) {
      res.status(400).json({ message: 'Invalid note index' }); return;
    }
    const updatedNotes = notes.filter((_, i) => i !== idx);
    await RosterMemberFS.update(req.params.id as string, { adminNotes: updatedNotes });
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getPartners: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const partners = await PartnerFS.query([], 100, 0);
    const partnersClean = partners.map(p => { const o = { ...p } as any; delete o.password; return o; });
    res.status(200).json({ partners: partnersClean });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const createPartner: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { name, type, authEmail, password, ...rest } = req.body;
    if (!name || !type || !authEmail || !password) {
      res.status(400).json({ message: 'name, type, authEmail and password are required' }); return;
    }
    const exists = await PartnerFS.findByEmail(authEmail.toLowerCase());
    if (exists) { res.status(400).json({ message: 'A partner with this email already exists' }); return; }
    const partner = await PartnerFS.create({
      name,
      type,
      authEmail: authEmail.toLowerCase(),
      password,
      ...rest,
      status: rest.status || 'pending',
      freeMonthUsed: rest.freeMonthUsed || false,
      accessLevel: rest.accessLevel || 'browse_only',
      activeDeployments: rest.activeDeployments || 0,
      totalDeployments: rest.totalDeployments || 0,
      createdBy: admin.email,
    });
    const obj = { ...partner } as any;
    delete obj.password;
    sendPartnerWelcomeEmail(authEmail.toLowerCase(), name).catch(() => {});
    sendNewPartnerAlert(name, type, authEmail.toLowerCase()).catch(() => {});
    res.status(201).json({ message: 'Partner created', partner: obj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updatePartner: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const forbidden = ['authEmail', 'password', 'createdBy'];
    const updateData = { ...req.body };
    forbidden.forEach(f => delete updateData[f]);
    const updated = await PartnerFS.update(req.params.id as string, updateData);
    if (!updated) { res.status(404).json({ message: 'Partner not found' }); return; }
    const obj = { ...updated } as any;
    delete obj.password;
    res.status(200).json({ message: 'Partner updated', partner: obj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updatePartnerAccess: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accessLevel, status } = req.body;
    const update: any = {};
    if (accessLevel) update.accessLevel = accessLevel;
    if (status) update.status = status;
    const updated = await PartnerFS.update(req.params.id as string, update);
    if (!updated) { res.status(404).json({ message: 'Partner not found' }); return; }
    const obj = { ...updated } as any;
    delete obj.password;
    res.status(200).json({ message: 'Access updated', partner: obj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getOpportunities: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const opps = await OpportunityFS.query([], 100, 0);
    res.status(200).json({ opportunities: opps });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const createOpportunity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { title, description, type } = req.body;
    if (!title || !description || !type) {
      res.status(400).json({ message: 'title, description and type are required' }); return;
    }
    const opp = await OpportunityFS.create({
      ...req.body,
      postedBy: admin.email,
      applicants: [],
      requiredSkills: req.body.requiredSkills || [],
      requiredLanguages: req.body.requiredLanguages || [],
      requiredCertifications: req.body.requiredCertifications || [],
      requiredSectors: req.body.requiredSectors || [],
      location: req.body.location || { country: '', city: '', remote: false },
      duration: req.body.duration || '',
      compensationType: req.body.compensationType || 'tbd',
      currency: req.body.currency || 'USD',
      status: req.body.status || 'open',
      urgency: req.body.urgency || 'medium',
      openings: req.body.openings || 1,
      filled: req.body.filled || 0,
    });
    res.status(201).json({ message: 'Opportunity created', opportunity: opp });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateOpportunity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await OpportunityFS.update(req.params.id as string, req.body);
    if (!updated) { res.status(404).json({ message: 'Opportunity not found' }); return; }
    res.status(200).json({ message: 'Opportunity updated', opportunity: updated });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const selectMemberForOpportunity: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { memberId } = req.body;
    const [opp, member] = await Promise.all([
      OpportunityFS.findById(req.params.id as string),
      RosterMemberFS.findById(memberId),
    ]);
    if (!opp) { res.status(404).json({ message: 'Opportunity not found' }); return; }
    if (!member) { res.status(404).json({ message: 'Member not found' }); return; }

    // Update opportunity: mark selected member, set status, update applicants array
    const updatedApplicants = (opp.applicants || []).map(a => ({
      ...a,
      status: a.memberId === String(member.id) ? 'selected' : a.status,
    }));
    await OpportunityFS.update(req.params.id as string, {
      selectedMemberId: String(member.id),
      selectedMemberName: `${member.firstName} ${member.lastName}`,
      status: 'screening',
      applicants: updatedApplicants,
    });

    // Create deployment record
    const deployment = await DeploymentFS.create({
      memberId: String(member.id),
      memberName: `${member.firstName} ${member.lastName}`,
      memberEmail: member.email,
      opportunityId: String(opp.id),
      opportunityTitle: opp.title,
      partnerId: opp.partnerId || '',
      partnerName: opp.partnerName || '',
      startDate: opp.startDate || null,
      endDate: opp.endDate || null,
      status: 'active',
      contractUrl: '',
      memberFeedback: '',
      partnerFeedback: '',
      skillsUsed: opp.requiredSkills || [],
      sectors: opp.requiredSectors || [],
      outcome: '',
      dailyRate: 0,
      totalCompensation: 0,
      currency: opp.currency || 'USD',
      createdBy: admin.email,
    });

    // Update member: set deployed status and add to deploymentHistory
    const newHistoryEntry = {
      opportunityId: String(opp.id),
      partnerId: opp.partnerId || '',
      partnerName: opp.partnerName || '',
      from: opp.startDate || new Date().toISOString(),
      status: 'active',
    };
    await db.collection(MEMBER_COL).doc(String(member.id)).update({
      rosterStatus: 'deployed',
      availabilityStatus: 'deployed',
      deploymentHistory: arrayUnion(newHistoryEntry),
    });

    const locationStr = typeof opp.location === 'object' && opp.location
      ? [opp.location.city, opp.location.country].filter(Boolean).join(', ')
      : (opp.region || 'TBD');
    sendDeploymentConfirmedEmail(
      member.email,
      member.firstName,
      opp.title,
      opp.partnerName || 'WDC Partner',
      locationStr,
      opp.startDate ? new Date(opp.startDate).toLocaleDateString() : undefined
    ).catch(() => {});

    res.status(200).json({ message: 'Member selected and deployment created', deployment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getDeployments: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filters: FSFilter[] = [];
    if (status) filters.push(['status', '==', status as string]);
    const offsetN = (Number(page) - 1) * Number(limit);
    const [deployments, total] = await Promise.all([
      DeploymentFS.query(filters, Number(limit), offsetN),
      DeploymentFS.count(filters),
    ]);
    res.status(200).json({ deployments, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateDeployment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await DeploymentFS.update(req.params.id as string, req.body);
    if (!updated) { res.status(404).json({ message: 'Deployment not found' }); return; }
    res.status(200).json({ message: 'Deployment updated', deployment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getEvents: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await RosterEventFS.query([], 100, 0, 'date', 'asc');
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const createEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    const { title, type, date } = req.body;
    if (!title || !type || !date) {
      res.status(400).json({ message: 'title, type and date are required' }); return;
    }
    const event = await RosterEventFS.create({
      ...req.body,
      createdBy: admin.email,
      targetSectors: req.body.targetSectors || [],
      registeredMembers: req.body.registeredMembers || [],
      attendees: req.body.attendees || [],
      status: req.body.status || 'upcoming',
      featured: req.body.featured || false,
    });
    res.status(201).json({ message: 'Event created', event });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await RosterEventFS.update(req.params.id as string, req.body);
    if (!updated) { res.status(404).json({ message: 'Event not found' }); return; }
    res.status(200).json({ message: 'Event updated', event: updated });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteEvent: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    await RosterEventFS.delete(req.params.id as string);
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getAdmins: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    if (admin.role !== 'super') {
      res.status(403).json({ message: 'Only super admins can view all admins' }); return;
    }
    const admins = await RosterAdminFS.query([], 100, 0);
    const adminsClean = admins.map(a => { const o = { ...a } as any; delete o.password; return o; });
    res.status(200).json({ admins: adminsClean });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const createAdminUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin as any;
    if (admin.role !== 'super') {
      res.status(403).json({ message: 'Only super admins can create admins' }); return;
    }
    const { name, email, password, role, permissions } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: 'name, email and password are required' }); return;
    }
    const exists = await RosterAdminFS.findByEmail(email.toLowerCase());
    if (exists) { res.status(400).json({ message: 'Admin with this email already exists' }); return; }
    await RosterAdminFS.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'manager',
      permissions: permissions || ['approve_members', 'post_opportunities', 'manage_partners', 'view_contracts'],
      isActive: true,
      createdBy: admin.email,
      lastLogin: null,
    });
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
