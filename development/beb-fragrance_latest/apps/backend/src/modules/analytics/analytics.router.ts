import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import * as analyticsController from './analytics.controller';

const router = Router();

router.use(authenticate, adminOnly);

router.get('/overview', analyticsController.getOverview);
router.get('/revenue', analyticsController.getRevenue);
router.get('/orders', analyticsController.getOrderStats);
router.get('/products', analyticsController.getTopProducts);
router.get('/payment-methods', analyticsController.getPaymentMethods);
router.get('/users', analyticsController.getUserStats);

export default router;