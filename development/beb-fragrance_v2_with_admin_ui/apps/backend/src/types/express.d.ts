import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        phone: string;
        role: 'user' | 'admin';
        email?: string;
        createdAt: Date;
      };
      startTime?: number;
    }
  }
}

export { };
