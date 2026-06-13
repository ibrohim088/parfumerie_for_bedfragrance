import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import * as notificationsController from './notifications.controller';

const router = Router();

router.use(authenticate);

router.get('/', notificationsController.getNotifications);
router.patch('/read-all', notificationsController.markAllAsRead);
router.patch('/:id/read', notificationsController.markAsRead);
router.post('/send', adminOnly, notificationsController.sendNotification);

export default router;
