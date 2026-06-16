import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import { createAddressSchema, updateAddressSchema } from './addresses.validation';
import * as addressesController from './addresses.controller';

const router = Router();

router.use(authenticate);

router.get('/', addressesController.getAddresses);
router.post('/', validate(createAddressSchema), addressesController.createAddress);
router.put('/:id', validate(updateAddressSchema), addressesController.updateAddress);
router.delete('/:id', addressesController.deleteAddress);

export default router;
