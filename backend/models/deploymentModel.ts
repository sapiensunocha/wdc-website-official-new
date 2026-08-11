import type { WhereFilterOp, Timestamp } from 'firebase-admin/firestore';
import { getById, create, updateById, deleteById, queryDocs, countDocs } from '../utils/firestore';

export const COLLECTION = 'deployments';

export interface IDeployment {
  id?: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  opportunityId: string;
  opportunityTitle: string;
  partnerId?: string | null;
  partnerName?: string;
  startDate?: string | null;
  endDate?: string | null;
  status: string;
  contractUrl?: string;
  performanceRating?: number | null;
  memberFeedback?: string;
  partnerFeedback?: string;
  skillsUsed: string[];
  sectors: string[];
  outcome?: string;
  dailyRate?: number;
  totalCompensation?: number;
  currency: string;
  createdBy: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const DeploymentFS = {
  findById: (id: string) => getById<IDeployment>(COLLECTION, id),

  create: (data: Omit<IDeployment, 'id'>) =>
    create<Omit<IDeployment, 'id'>>(COLLECTION, data),

  update: (id: string, data: Partial<IDeployment>) => updateById<IDeployment>(COLLECTION, id, data),

  delete: (id: string) => deleteById(COLLECTION, id),

  count: (filters: [string, WhereFilterOp, unknown][] = []) =>
    countDocs(COLLECTION, filters),

  query: (
    filters: [string, WhereFilterOp, unknown][] = [],
    limitN = 20,
    offsetN = 0
  ) => queryDocs<IDeployment>(COLLECTION, filters, 'createdAt', 'desc', limitN, offsetN),
};
