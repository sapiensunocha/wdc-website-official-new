import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import type { WhereFilterOp, Firestore, Query, QueryDocumentSnapshot } from 'firebase-admin/firestore';

// On Cloud Run, ADC is automatic. Locally, set GOOGLE_APPLICATION_CREDENTIALS.
if (!getApps().length) {
  initializeApp({
    projectId: process.env.GOOGLE_CLOUD_PROJECT || 'white-setting-405903',
  });
}

export const db: Firestore = getFirestore();

// ─── Helpers ──────────────────────────────────────────────────────────────────

export type FSDoc<T> = T & { id: string };

/** Get a single document by ID */
export async function getById<T>(col: string, id: string): Promise<FSDoc<T> | null> {
  const snap = await db.collection(col).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

/** Get first document matching a field */
export async function findOne<T>(
  col: string,
  field: string,
  value: unknown
): Promise<FSDoc<T> | null> {
  const snap = await db.collection(col).where(field, '==', value).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as T) };
}

/** Create a document (auto-ID) */
export async function create<T extends object>(col: string, data: T): Promise<FSDoc<T>> {
  const now = FieldValue.serverTimestamp();
  const ref = await db.collection(col).add({ ...data, createdAt: now, updatedAt: now });
  const snap = await ref.get();
  return { id: ref.id, ...(snap.data() as T) };
}

/** Update a document by ID, returns updated doc */
export async function updateById<T>(
  col: string,
  id: string,
  data: Partial<T>
): Promise<FSDoc<T> | null> {
  const now = FieldValue.serverTimestamp();
  const ref = db.collection(col).doc(id);
  await ref.update({ ...(data as Record<string, unknown>), updatedAt: now });
  const snap = await ref.get();
  if (!snap.exists) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

/** Delete a document by ID */
export async function deleteById(col: string, id: string): Promise<void> {
  await db.collection(col).doc(id).delete();
}

/** Count documents in a collection (with optional filter) */
export async function countDocs(
  col: string,
  filters: [string, WhereFilterOp, unknown][] = []
): Promise<number> {
  let q: Query = db.collection(col);
  for (const [f, op, v] of filters) q = q.where(f, op, v);
  const snap = await q.count().get();
  return snap.data().count;
}

/** Paginated query */
export async function queryDocs<T>(
  col: string,
  filters: [string, WhereFilterOp, unknown][] = [],
  orderByField = 'createdAt',
  orderDir: 'asc' | 'desc' = 'desc',
  limitN = 20,
  offsetN = 0
): Promise<FSDoc<T>[]> {
  let q: Query = db.collection(col);
  for (const [f, op, v] of filters) q = q.where(f, op, v);
  q = q.orderBy(orderByField, orderDir).limit(limitN).offset(offsetN);
  const snap = await q.get();
  return snap.docs.map((d: QueryDocumentSnapshot) => ({ id: d.id, ...(d.data() as T) }));
}

export const serverTimestamp = () => FieldValue.serverTimestamp();
export const arrayUnion = (...items: unknown[]) => FieldValue.arrayUnion(...items);
export const increment = (n: number) => FieldValue.increment(n);

export { Timestamp };
