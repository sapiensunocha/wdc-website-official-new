import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, findOne, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'partners';

export interface IPartner {
  id?: string;
  name: string;
  type: string;
  country?: string;
  website?: string;
  logo?: string;
  description?: string;
  contactPerson?: { name: string; email: string; phone: string; title: string };
  authEmail: string;
  password: string;
  status: string;
  freeMonthUsed: boolean;
  freeMonthExpiry?: string | null;
  accessLevel: string;
  docsToSign?: { docName: string; docUrl: string; required: boolean; signed: boolean; signedDate?: string | null }[];
  activeDeployments: number;
  totalDeployments: number;
  createdBy: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function hashPartnerPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function comparePartnerPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function setPartnerJwtCookie(partnerId: string, res: Response): string {
  const token = jwt.sign({ partnerId, role: 'partner' }, process.env.JWTSK!, { expiresIn: '7d' });
  res.cookie('jwt_partner', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

export const PartnerFS = {
  findById: (id: string) => getById<IPartner>(COLLECTION, id),

  findByEmail: (email: string) => findOne<IPartner>(COLLECTION, 'authEmail', email),

  create: async (data: Omit<IPartner, 'id'>) => {
    const hashed = await hashPartnerPassword(data.password);
    return create<Omit<IPartner, 'id'>>(COLLECTION, { ...data, password: hashed });
  },

  update: (id: string, data: Partial<IPartner>) => updateById<IPartner>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0
  ) => queryDocs<IPartner>(COLLECTION, filters, 'createdAt', 'desc', limitN, offsetN),
};
