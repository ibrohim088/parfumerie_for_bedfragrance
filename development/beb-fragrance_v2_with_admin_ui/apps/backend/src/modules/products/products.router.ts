import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import { validate } from '../../middleware/validate';
import { createProductSchema, updateProductSchema, productListQuerySchema } from './products.validation';
import * as productsController from './products.controller';

const router = Router();

router.get('/', validate(productListQuerySchema, 'query'), productsController.getProducts);
router.get('/:slug', productsController.getProductBySlug);

router.post('/', authenticate, adminOnly, validate(createProductSchema), productsController.createProduct);
router.put('/:id', authenticate, adminOnly, validate(updateProductSchema), productsController.updateProduct);
router.delete('/:id', authenticate, adminOnly, productsController.deleteProduct);

export default router;
