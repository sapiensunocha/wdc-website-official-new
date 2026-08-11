import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, findOne, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'opportunities';

export interface IOpportunity {
  id?: string;
  title: string;
  description: string;
  type: string;
  requiredSkills: string[];
  requiredLanguages: string[];
  requiredCertifications: string[];
  requiredSectors: string[];
  location: { country: string; city: string; remote: boolean };
  duration: string;
  startDate?: string | null;
  endDate?: string | null;
  compensationType: string;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  status: string;
  urgency: string;
  partnerId?: string | null;
  partnerName?: string;
  applicants: { memberId: string; memberName: string; appliedAt: string; status: string }[];
  selectedMemberId?: string | null;
  selectedMemberName?: string;
  postedBy: string;
  region?: string;
  openings: number;
  filled: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const OpportunityFS = {
  findById: (id: string) => getById<IOpportunity>(COLLECTION, id),

  findOne: (field: string, value: unknown) => findOne<IOpportunity>(COLLECTION, field, value),

  create: (data: Omit<IOpportunity, 'id'>) =>
    create<Omit<IOpportunity, 'id'>>(COLLECTION, data),

  update: (id: string, data: Partial<IOpportunity>) => updateById<IOpportunity>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0,
    orderByField = 'createdAt',
    orderDir: 'asc' | 'desc' = 'desc'
  ) => queryDocs<IOpportunity>(COLLECTION, filters, orderByField, orderDir, limitN, offsetN),
};
