import { Request, Response, NextFunction } from 'express';
import * as analyticsService from './analytics.service';

export async function getOverview(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await analyticsService.getOverview();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getRevenue(req: Request, res: Response, next: NextFunction) {
  try {
    const period = (req.query.period as any) || 'daily';
    const days = parseInt(req.query.days as string) || 30;
    const data = await analyticsService.getRevenue(period, days);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getOrderStats(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await analyticsService.getOrderStats();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getTopProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await analyticsService.getTopProducts(limit);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getUserStats(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await analyticsService.getUserStats();
    res.json({ success: true, data });
  } catch (err) { next(err); }
}
