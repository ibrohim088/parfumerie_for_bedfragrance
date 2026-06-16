import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export async function sendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.sendOtp(req.body.phone, req.body.telegramId);
    res.json({ success: true, message: 'OTP kodi yuborildi.' });
  } catch (err) { next(err); }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { phone, otp, firstName, lastName } = req.body;
    const data = await authService.verifyOtp(phone, otp, firstName, lastName);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await authService.refreshTokens(req.body.refreshToken);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.logout(req.user!.id);
    res.json({ success: true, message: 'Tizimdan chiqildi.' });
  } catch (err) { next(err); }
}
