import { Request, Response, NextFunction } from 'express';
import * as ordersService from './orders.service';

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ordersService.createOrder(req.user!.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ordersService.getMyOrders(req.user!.id, req.query as any);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function getMyOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ordersService.getMyOrderById(req.user!.id, req.params.id!);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function cancelOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ordersService.cancelOrder(req.user!.id, req.params.id!);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function getAllOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ordersService.getAllOrders(req.query as any);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ordersService.updateOrderStatus(req.params.id!, req.body.status);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}