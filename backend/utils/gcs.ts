import { Storage } from '@google-cloud/storage';

const storage = new Storage({ projectId: process.env.GOOGLE_CLOUD_PROJECT || 'white-setting-405903' });
const bucket = storage.bucket('wdc-portal-media');

export async function uploadToGCS(buffer: Buffer, mimetype: string, folder: string): Promise<string> {
  const ext = mimetype.split('/')[1] || 'jpg';
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const file = bucket.file(filename);

  await file.save(buffer, { contentType: mimetype, resumable: false });
  await file.makePublic();

  return `https://storage.googleapis.com/wdc-portal-media/${filename}`;
}
