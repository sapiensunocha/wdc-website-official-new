import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'rosterEvents';

export interface IRosterEvent {
  id?: string;
  title: string;
  description?: string;
  type: string;
  host?: string;
  hostBio?: string;
  date: string;
  duration?: string;
  link?: string;
  targetSectors: string[];
  targetLevel?: string;
  maxAttendees?: number | null;
  registeredMembers: { memberId: string; memberName: string; registeredAt: string }[];
  attendees: { memberId: string; memberName: string; attendedAt: string }[];
  recordingUrl?: string;
  materialsUrl?: string;
  status: string;
  createdBy: string;
  featured: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const RosterEventFS = {
  findById: (id: string) => getById<IRosterEvent>(COLLECTION, id),

  create: (data: Omit<IRosterEvent, 'id'>) =>
    create<Omit<IRosterEvent, 'id'>>(COLLECTION, data),

  update: (id: string, data: Partial<IRosterEvent>) => updateById<IRosterEvent>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0,
    orderByField = 'date',
    orderDir: 'asc' | 'desc' = 'asc'
  ) => queryDocs<IRosterEvent>(COLLECTION, filters, orderByField, orderDir, limitN, offsetN),
};
