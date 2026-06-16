import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Zod validation xatosi
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: 'Ma\'lumotlar noto\'g\'ri kiritilgan.',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  // AppError — biz o'zimiz tashlagan xato
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.code && { code: err.code }),
    });
    return;
  }

  // Prisma xatolari
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;

    if (prismaError.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Bu ma\'lumot allaqachon mavjud.',
        code: 'DUPLICATE_ENTRY',
      });
      return;
    }

    if (prismaError.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Ma\'lumot topilmadi.',
        code: 'NOT_FOUND',
      });
      return;
    }
  }

  // Kutilmagan xato — log qilish
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });

  res.status(500).json({
    success: false,
    message: 'Server xatosi yuz berdi. Iltimos, keyinroq urinib ko\'ring.',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}