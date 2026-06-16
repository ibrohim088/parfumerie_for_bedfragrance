import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import { validate } from '../../middleware/validate';
import { updateProfileSchema, adminUpdateUserSchema, userListQuerySchema } from './users.validation';
import * as usersController from './users.controller';

const router = Router();

router.use(authenticate);

router.get('/me', usersController.getMe);
router.put('/me', validate(updateProfileSchema), usersController.updateMe);
router.delete('/me', usersController.deleteMe);

router.get('/', adminOnly, validate(userListQuerySchema, 'query'), usersController.getAllUsers);
router.get('/:id', adminOnly, usersController.getUserById);
router.put('/:id', adminOnly, validate(adminUpdateUserSchema), usersController.adminUpdateUser);
router.delete('/:id', adminOnly, usersController.adminDeleteUser);

export default router;
