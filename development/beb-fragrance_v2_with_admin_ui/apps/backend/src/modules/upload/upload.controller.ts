import { Request, Response, NextFunction } from 'express';
import * as uploadService from './upload.service';
import { AppError } from '../../middleware/errorHandler';

export async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new AppError(400, 'Rasm fayli talab etiladi.');
    const data = await uploadService.uploadImage(req.file);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

export async function deleteImage(req: Request, res: Response, next: NextFunction) {
  try {
    await uploadService.deleteImage(req.body.url);
    res.json({ success: true, message: 'Rasm o\'chirildi.' });
  } catch (err) { next(err); }
}
