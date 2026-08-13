import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, findOne, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'disasterHeroes';

export interface IDisasterHero {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  organization?: string;
  heroRole?: string;
  linkedinUrl?: string;
  sectors: string[];
  skills: string[];
  languages: string[];
  availability: string;
  country: string;
  city: string;
  motivation: string;
  experience?: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpiry?: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function setHeroJwtCookie(id: string, res: Response): string {
  const token = jwt.sign({ userId: id, role: 'disasterHero' }, process.env.JWTSK!, { expiresIn: '7d' });
  res.cookie('dh_jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

export const DisasterHeroFS = {
  findById: (id: string) => getById<IDisasterHero>(COLLECTION, id),

  findByEmail: (email: string) => findOne<IDisasterHero>(COLLECTION, 'email', email),

  create: async (data: Omit<IDisasterHero, 'id'>) => {
    const hashed = await hashPassword(data.password);
    return create<Omit<IDisasterHero, 'id'>>(COLLECTION, { ...data, password: hashed });
  },

  update: (id: string, data: Partial<IDisasterHero>) => updateById<IDisasterHero>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 50,
    offsetN = 0
  ) => queryDocs<IDisasterHero>(COLLECTION, filters, 'createdAt', 'desc', limitN, offsetN),
};
