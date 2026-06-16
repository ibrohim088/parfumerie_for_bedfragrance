import { Response } from 'express';
import winston from 'winston';
import { env } from '../config/env';

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


const { combine, timestamp, colorize, printf, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  printf(({ level, message, timestamp, ...meta }) => {
    const extras = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
    return `${timestamp} [${level}] ${message}${extras}`;
  }),
);

const prodFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: env.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    ...(env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});