import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.getMe(req.user!.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.updateMe(req.user!.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function deleteMe(req: Request, res: Response, next: NextFunction) {
  try {
    await usersService.deleteMe(req.user!.id);
    res.json({ success: true, message: 'Hisob o\'chirildi.' });
  } catch (err) { next(err); }
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.getAllUsers(req.query as any);
    res.json({ success: true, ...data });
  } catch (err) { next(err); }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.getUserById(req.params.id!);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function adminUpdateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await usersService.adminUpdateUser(req.params.id!, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function adminDeleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await usersService.adminDeleteUser(req.params.id!);
    res.json({ success: true, message: 'Foydalanuvchi o\'chirildi.' });
  } catch (err) { next(err); }
}