import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { paymeConfig, clickConfig, createClickSignature } from '../../config/payment';
import { AppError } from '../../middleware/errorHandler';

// ── Payme basic auth tekshirish ────────────────────────────────

export function verifyPaymeAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization ?? '';

  if (!authHeader.startsWith('Basic ')) {
    res.status(401).json({ error: { code: -32504, message: 'Unauthorized' } });
    return;
  }

  const expected = paymeConfig.basicAuthHeader();
  if (authHeader !== expected) {
    res.status(401).json({ error: { code: -32504, message: 'Unauthorized' } });
    return;
  }

  next();
}

// ── Click imzo tekshirish (prepare) ───────────────────────────

export function verifyClickPrepare(req: Request, res: Response, next: NextFunction): void {
  const {
    click_trans_id,
    service_id,
    merchant_trans_id,
    amount,
    action,
    sign_time,
    sign_string,
  } = req.body;

  const expected = createClickSignature({
    clickTransId: click_trans_id,
    serviceId: service_id,
    secretKey: clickConfig.secretKey,
    merchantTransId: merchant_trans_id,
    amount,
    action,
    signTime: sign_time,
  });

  if (sign_string !== expected) {
    res.status(400).json({ error: -1, error_note: 'SIGN CHECK FAILED!' });
    return;
  }

  next();
}

// ── Click imzo tekshirish (complete) ──────────────────────────

export function verifyClickComplete(req: Request, res: Response, next: NextFunction): void {
  const {
    click_trans_id,
    service_id,
    merchant_trans_id,
    merchant_prepare_id,
    amount,
    action,
    sign_time,
    sign_string,
  } = req.body;

  const raw =
    click_trans_id +
    service_id +
    clickConfig.secretKey +
    merchant_trans_id +
    merchant_prepare_id +
    amount +
    action +
    sign_time;

  const expected = crypto.createHash('md5').update(raw).digest('hex');

  if (sign_string !== expected) {
    res.status(400).json({ error: -1, error_note: 'SIGN CHECK FAILED!' });
    return;
  }

  next();
}
