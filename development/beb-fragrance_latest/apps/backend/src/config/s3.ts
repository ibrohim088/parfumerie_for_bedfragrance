import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './env';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = env.AWS_BUCKET_NAME;
const PRESIGNED_URL_EXPIRES = 3600; // 1 soat

// ── Upload ─────────────────────────────────────────────────────

export interface UploadResult {
  key: string;
  url: string;
}

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  folder = 'products',
): Promise<UploadResult> {
  const ext = path.extname(originalName).toLowerCase();
  const key = `${folder}/${uuidv4()}${ext}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: 'max-age=31536000',
    }),
  );

  const url = `https://${BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
  return { key, url };
}

// ── Delete ─────────────────────────────────────────────────────

export async function deleteFile(key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
  );
}

// ── Presigned URL (private fayllar uchun) ──────────────────────

export async function getPresignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: PRESIGNED_URL_EXPIRES });
}

// ── Key dan URL yasash ─────────────────────────────────────────

export function getPublicUrl(key: string): string {
  return `https://${BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
}

// ── S3 URL dan key chiqarish ───────────────────────────────────

export function extractKeyFromUrl(url: string): string {
  const base = `https://${BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/`;
  return url.replace(base, '');
}