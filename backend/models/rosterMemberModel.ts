import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { db, getById, findOne, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'rosterMembers';

export interface IRosterMember {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  photo?: string;
  dateOfBirth?: string | null;
  gender?: string;
  nationality?: string;
  countryOfResidence?: string;
  city?: string;
  timezone?: string;
  bio?: string;
  linkedIn?: string;
  twitter?: string;
  website?: string;
  skills?: { name: string; level: string; verified: boolean }[];
  languages?: { language: string; proficiency: string }[];
  education?: { institution: string; degree: string; field: string; from: string; to?: string; country: string; attachment?: string }[];
  experience?: { title: string; organization: string; country: string; from: string; to?: string; description: string; skills: string[]; sectors: string[] }[];
  certifications?: { name: string; issuer: string; date: string; expiry?: string; attachment?: string; verified: boolean }[];
  sectors?: string[];
  deploymentType?: string;
  availabilityDate?: string | null;
  preferredRegions?: string[];
  dailyRate?: number;
  monthlyRate?: number;
  currency?: string;
  rosterStatus: string;
  applicationDate?: string;
  interviewDate?: string | null;
  interviewNotes?: string;
  contractSigned?: boolean;
  contractSignedDate?: string | null;
  contractUrl?: string;
  adminNotes?: { note: string; addedBy: string; date: string }[];
  projects?: { title: string; partner: string; from: string; to?: string; description: string; skills: string[]; recognition?: string; status: string }[];
  eventsAttended?: { eventId: string; title: string; date: string }[];
  recognitions?: { type: string; title: string; date: string; issuer: string }[];
  deploymentHistory?: { opportunityId: string; partnerId: string; partnerName: string; from: string; to?: string; status: string; rating?: number; feedback?: string }[];
  profileCompletionScore?: number;
  lastActive?: string;
  availabilityStatus?: string;
  motivationStatement?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function setMemberJwtCookie(id: string, res: Response): string {
  const token = jwt.sign({ userId: id, role: 'member' }, process.env.JWTSK!, { expiresIn: '7d' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

export const RosterMemberFS = {
  findById: (id: string) => getById<IRosterMember>(COLLECTION, id),

  findByEmail: (email: string) => findOne<IRosterMember>(COLLECTION, 'email', email),

  create: async (data: Omit<IRosterMember, 'id'>) => {
    const hashed = await hashPassword(data.password);
    return create<Omit<IRosterMember, 'id'>>(COLLECTION, { ...data, password: hashed });
  },

  update: (id: string, data: Partial<IRosterMember>) => updateById<IRosterMember>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0
  ) => queryDocs<IRosterMember>(COLLECTION, filters, 'createdAt', 'desc', limitN, offsetN),
};

export { db };
