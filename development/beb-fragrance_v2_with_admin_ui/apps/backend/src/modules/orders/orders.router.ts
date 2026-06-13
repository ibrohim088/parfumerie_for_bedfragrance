import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import { validate } from '../../middleware/validate';
import { createOrderSchema, updateStatusSchema, orderListQuerySchema } from './orders.validation';
import * as ordersController from './orders.controller';

const router = Router();

router.use(authenticate);

router.get('/', validate(orderListQuerySchema, 'query'), ordersController.getMyOrders);
router.post('/', validate(createOrderSchema), ordersController.createOrder);
router.get('/admin/all', adminOnly, validate(orderListQuerySchema, 'query'), ordersController.getAllOrders);
router.get('/:id', ordersController.getMyOrderById);
router.patch('/:id/cancel', ordersController.cancelOrder);
router.patch('/:id/status', adminOnly, validate(updateStatusSchema), ordersController.updateOrderStatus);

export default router;
