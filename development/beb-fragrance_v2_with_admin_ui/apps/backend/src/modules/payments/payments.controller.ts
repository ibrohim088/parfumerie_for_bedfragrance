import { Request, Response, NextFunction } from 'express';
import * as paymentsService from './payments.service';

export async function createPaymePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.createPaymePayment(req.body.orderId);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function paymeCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await paymentsService.handlePaymeCallback(req.body);
    res.json({ result, id: req.body.id });
  } catch (err: any) {
    res.json({ error: err, id: req.body?.id });
  }
}

export async function clickPrepare(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.handleClickPrepare(req.body);
    res.json(data);
  } catch (err) { next(err); }
}

export async function clickComplete(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.handleClickComplete(req.body);
    res.json(data);
  } catch (err) { next(err); }
}

export async function confirmCash(req: Request, res: Response, next: NextFunction) {
  try {
    await paymentsService.confirmCash(req.body.orderId, req.user!.id);
    res.json({ success: true, message: 'Naqt to\'lov tasdiqlandi.' });
  } catch (err) { next(err); }
}

export async function rejectCash(req: Request, res: Response, next: NextFunction) {
  try {
    await paymentsService.rejectCash(req.body.orderId, req.user!.id);
    res.json({ success: true, message: 'Naqt to\'lov rad etildi.' });
  } catch (err) { next(err); }
}

export async function getPaymentStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentsService.getPaymentStatus(req.params.orderId);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getPaymentHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await paymentsService.getPaymentHistory(page, limit);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function refundPayment(req: Request, res: Response, next: NextFunction) {
  try {
    await paymentsService.refundPayment(req.params.id);
    res.json({ success: true, message: 'To\'lov qaytarildi.' });
  } catch (err) { next(err); }
}
