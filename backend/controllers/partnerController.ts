import { Request, RequestHandler, Response } from 'express';
import { sendDeploymentRequestAlert, sendDeploymentRequestConfirmation } from '../utils/resend';
import { PartnerFS, comparePartnerPassword, setPartnerJwtCookie } from '../models/partnerModel';
import { RosterMemberFS } from '../models/rosterMemberModel';
import { OpportunityFS } from '../models/opportunityModel';
import { DeploymentFS } from '../models/deploymentModel';

export const loginPartner: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' }); return;
    }
    const partner = await PartnerFS.findByEmail(email.toLowerCase());
    if (!partner || partner.status !== 'active') {
      res.status(401).json({ message: 'Invalid credentials or account not active' }); return;
    }
    const valid = await comparePartnerPassword(password, partner.password);
    if (!valid) {
      res.status(401).json({ message: 'Invalid credentials' }); return;
    }
    setPartnerJwtCookie(partner.id, res);
    const obj = { ...partner } as any;
    delete obj.password;
    res.status(200).json({ message: 'Logged in successfully', partner: obj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const logoutPartner: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('jwt_partner');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getPartnerProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json(req.partner);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updatePartnerProfile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = req.partner as any;
    const forbidden = ['authEmail', 'password', 'status', 'accessLevel', 'createdBy'];
    const updateData = { ...req.body };
    forbidden.forEach(f => delete updateData[f]);
    const updated = await PartnerFS.update(partner.id, updateData);
    if (!updated) { res.status(404).json({ message: 'Partner not found' }); return; }
    const obj = { ...updated } as any;
    delete obj.password;
    res.status(200).json({ message: 'Profile updated', partner: obj });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const browseRoster: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = req.partner as any;
    const { availability, page = 1, limit = 12 } = req.query;
    const filters: [string, FirebaseFirestore.WhereFilterOp, unknown][] = [
      ['rosterStatus', 'in', ['active', 'deployed']],
    ];
    if (availability) filters.push(['availabilityStatus', '==', availability]);

    const canSeeContact = ['can_request', 'full_access'].includes(partner.accessLevel);
    const offsetN = (Number(page) - 1) * Number(limit);
    const [allMembers, total] = await Promise.all([
      RosterMemberFS.query(filters, Number(limit), offsetN),
      RosterMemberFS.count(filters),
    ]);

    const members = allMembers.map(m => {
      if (canSeeContact) {
        const { password, adminNotes, deploymentHistory, interviewNotes, contractUrl, contractSigned, contractSignedDate, applicationDate, ...rest } = m as any;
        return rest;
      } else {
        const { firstName, lastName, photo, skills, languages, sectors, certifications, deploymentType, preferredRegions, availabilityStatus, profileCompletionScore, nationality, countryOfResidence, bio, id } = m as any;
        return { id, firstName, lastName, photo, skills, languages, sectors, certifications, deploymentType, preferredRegions, availabilityStatus, profileCompletionScore, nationality, countryOfResidence, bio };
      }
    });

    res.status(200).json({ members, total, page: Number(page), pages: Math.ceil(total / Number(limit)), canSeeContact });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const requestDeployment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = req.partner as any;
    if (partner.accessLevel === 'browse_only') {
      res.status(403).json({ message: 'Your account does not have deployment request access. Please contact WDC.' }); return;
    }
    const { title, description, requiredSkills, requiredLanguages, duration, startDate, compensationType, budgetMin, budgetMax, region, location, memberId, memberName } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: 'title and description are required' }); return;
    }
    const opp = await OpportunityFS.create({
      title,
      description,
      type: 'deployment',
      requiredSkills: requiredSkills || [],
      requiredLanguages: requiredLanguages || [],
      requiredCertifications: [],
      requiredSectors: [],
      duration: duration || '',
      startDate: startDate || null,
      endDate: null,
      compensationType: compensationType || 'tbd',
      budgetMin: budgetMin || 0,
      budgetMax: budgetMax || 0,
      region: region || (typeof location === 'string' ? location : '') || '',
      location: typeof location === 'object' ? location : { country: location || region || '', city: '', remote: false },
      ...(memberId ? { selectedMemberId: memberId, selectedMemberName: memberName } : {}),
      partnerId: String(partner.id),
      partnerName: partner.name,
      postedBy: partner.authEmail,
      status: 'open',
      currency: 'USD',
      urgency: 'medium',
      applicants: [],
      openings: 1,
      filled: 0,
    });
    const expertLabel = memberName || 'Expert to be matched by WDC';
    sendDeploymentRequestConfirmation(partner.authEmail, partner.name, expertLabel, title).catch(() => {});
    sendDeploymentRequestAlert(partner.name, expertLabel, title, (typeof location === 'string' ? location : region) || 'TBD').catch(() => {});
    res.status(201).json({ message: 'Deployment request submitted. WDC will review and contact you within 48 hours.', opportunity: opp });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getPartnerDeployments: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const partner = req.partner as any;
    const deployments = await DeploymentFS.query([['partnerId', '==', String(partner.id)]], 100, 0);
    res.status(200).json({ deployments });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
