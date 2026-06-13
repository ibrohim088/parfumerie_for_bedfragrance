import { Request, Response } from 'express';

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `${req.method} ${req.originalUrl} — bu yo'nalish mavjud emas.`,
    code: 'NOT_FOUND',
  });
}