import { Request, Response, NextFunction } from 'express';
import * as productsService from './products.service';

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await productsService.getProducts(req.query as any);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await productsService.getProductBySlug(req.params.slug!);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await productsService.createProduct(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await productsService.updateProduct(req.params.id!, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    await productsService.deleteProduct(req.params.id!);
    res.json({ success: true, message: 'Mahsulot o\'chirildi.' });
  } catch (err) { next(err); }
}