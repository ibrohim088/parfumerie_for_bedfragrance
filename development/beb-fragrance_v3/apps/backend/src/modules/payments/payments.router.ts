import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import { validate } from '../../middleware/validate';
import { createPaymePaymentSchema, cashConfirmSchema } from './payments.validation';
import { verifyPaymeAuth, verifyClickPrepare, verifyClickComplete } from './payments.webhook';
import * as paymentsController from './payments.controller';

const router = Router();

// Public — webhook callbacklar (Payme/Click o'zi chaqiradi)
router.post('/payme/callback', verifyPaymeAuth, paymentsController.paymeCallback);
router.post('/click/prepare', verifyClickPrepare, paymentsController.clickPrepare);
router.post('/click/complete', verifyClickComplete, paymentsController.clickComplete);

// Autentifikatsiya talab etiladi
router.use(authenticate);

router.post('/payme/create', validate(createPaymePaymentSchema), paymentsController.createPaymePayment);
router.get('/:orderId/status', paymentsController.getPaymentStatus);

// Faqat admin
router.post('/cash/confirm', adminOnly, validate(cashConfirmSchema), paymentsController.confirmCash);
router.post('/cash/reject', adminOnly, validate(cashConfirmSchema), paymentsController.rejectCash);
router.get('/history', adminOnly, paymentsController.getPaymentHistory);
router.post('/:id/refund', adminOnly, paymentsController.refundPayment);

export default router;
