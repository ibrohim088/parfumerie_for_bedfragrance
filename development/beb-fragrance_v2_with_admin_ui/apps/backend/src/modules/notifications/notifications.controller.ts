import { Request, Response, NextFunction } from 'express';
import * as notificationsService from './notifications.service';

export async function getNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await notificationsService.getNotifications(req.user!.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function markAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await notificationsService.markAsRead(req.user!.id, req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function markAllAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    await notificationsService.markAllAsRead(req.user!.id);
    res.json({ success: true, message: 'Barcha bildirishnomalar o\'qildi.' });
  } catch (err) { next(err); }
}

export async function sendNotification(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await notificationsService.sendNotification(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}
