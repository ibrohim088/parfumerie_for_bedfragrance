// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        phone: string;
        firstName: string;
        lastName: string;
        email?: string;
        role: 'user' | 'admin';
        isActive: boolean;
      };
      startTime?: number;
    }
  }
}

export { };