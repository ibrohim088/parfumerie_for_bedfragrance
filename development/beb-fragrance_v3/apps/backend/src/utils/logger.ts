import { Response } from 'express';

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
): void {
  res.status(statusCode).json({ success: true, data });
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  code?: string,
): void {
  res.status(statusCode).json({
    success: false,
    message,
    ...(code && { code }),
  });
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  meta: { total: number; page: number; limit: number; totalPages: number },
): void {
  res.json({ success: true, data, meta });
}
