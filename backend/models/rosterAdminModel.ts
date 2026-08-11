import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, findOne, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

// Seed the super admin by running:
// POST /api/roster/admin/seed (only works if zero admins exist)
// with { name: "Sapiens Ndatabaye", email: "office@worlddisastercenter.org", password: "YourPassword", seedKey: process.env.ADMIN_SEED_KEY }

export const COLLECTION = 'rosterAdmins';

export interface IRosterAdmin {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  createdBy: string;
  lastLogin?: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function hashAdminPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function compareAdminPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function setAdminJwtCookie(adminId: string, res: Response): string {
  const token = jwt.sign({ adminId, role: 'admin' }, process.env.JWTSK!, { expiresIn: '8h' });
  res.cookie('jwt_admin', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 8 * 60 * 60 * 1000,
  });
  return token;
}

export const RosterAdminFS = {
  findById: (id: string) => getById<IRosterAdmin>(COLLECTION, id),

  findByEmail: (email: string) => findOne<IRosterAdmin>(COLLECTION, 'email', email),

  create: async (data: Omit<IRosterAdmin, 'id'>) => {
    const hashed = await hashAdminPassword(data.password);
    return create<Omit<IRosterAdmin, 'id'>>(COLLECTION, { ...data, password: hashed });
  },

  update: (id: string, data: Partial<IRosterAdmin>) => updateById<IRosterAdmin>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0
  ) => queryDocs<IRosterAdmin>(COLLECTION, filters, 'createdAt', 'desc', limitN, offsetN),
};
