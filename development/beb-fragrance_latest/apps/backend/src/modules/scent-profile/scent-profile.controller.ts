import { Request, Response, NextFunction } from 'express';
import * as scentProfileService from './scent-profile.service';

export async function getScentProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await scentProfileService.getScentProfile(req.user!.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function upsertScentProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await scentProfileService.upsertScentProfile(req.user!.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}
