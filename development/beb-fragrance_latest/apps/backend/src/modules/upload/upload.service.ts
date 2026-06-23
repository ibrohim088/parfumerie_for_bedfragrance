import { uploadFile, deleteFile, extractKeyFromUrl } from '../../config/s3';
import { AppError } from '../../middleware/errorHandler';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface MulterFile {
  mimetype: string;
  size: number;
  buffer: Buffer;
  originalname: string;
}

export async function uploadImage(file: MulterFile) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new AppError(400, 'Faqat JPEG, PNG, WEBP formatdagi rasmlar qabul qilinadi.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new AppError(400, 'Rasm hajmi 5MB dan oshmasligi kerak.');
  }

  return uploadFile(file.buffer, file.originalname, file.mimetype, 'products');
}

export async function deleteImage(url: string) {
  if (!url) throw new AppError(400, 'URL talab etiladi.');
  const key = extractKeyFromUrl(url);
  await deleteFile(key);
}

/*
import { uploadFile, deleteFile, extractKeyFromUrl } from '../../config/s3';
import { AppError } from '../../middleware/errorHandler';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadImage(file: Express.Multer.File) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new AppError(400, 'Faqat JPEG, PNG, WEBP formatdagi rasmlar qabul qilinadi.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new AppError(400, 'Rasm hajmi 5MB dan oshmasligi kerak.');
  }

  return uploadFile(file.buffer, file.originalname, file.mimetype, 'products');
}

export async function deleteImage(url: string) {
  if (!url) throw new AppError(400, 'URL talab etiladi.');
  const key = extractKeyFromUrl(url);
  await deleteFile(key);
}
*/