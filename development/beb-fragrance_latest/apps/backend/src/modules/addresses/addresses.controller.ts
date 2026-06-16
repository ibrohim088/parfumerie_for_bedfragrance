import { Request, Response, NextFunction } from 'express';
import * as addressesService from './addresses.service';

export async function getAddresses(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await addressesService.getAddresses(req.user!.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function createAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await addressesService.createAddress(req.user!.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

export async function updateAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await addressesService.updateAddress(req.user!.id, req.params.id!, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function deleteAddress(req: Request, res: Response, next: NextFunction) {
  try {
    await addressesService.deleteAddress(req.user!.id, req.params.id!);
    res.json({ success: true, message: 'Manzil o\'chirildi.' });
  } catch (err) { next(err); }
}