import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { scentProfileSchema } from './scent-profile.validation';
import * as scentProfileController from './scent-profile.controller';

const router = Router();

router.use(authenticate);

router.get('/', scentProfileController.getScentProfile);
router.post('/', validate(scentProfileSchema), scentProfileController.upsertScentProfile);
router.put('/', validate(scentProfileSchema), scentProfileController.upsertScentProfile);

export default router;
