import { Request, Response, NextFunction } from 'express';
import { ROLES } from '../constants/roles';

export function adminOnly(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Avval tizimga kiring.',
    });
    return;
  }

  if (req.user.role !== ROLES.ADMIN) {
    res.status(403).json({
      success: false,
      message: 'Bu sahifaga kirish uchun admin huquqi talab etiladi.',
    });
    return;
  }

  next();
}