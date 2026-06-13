import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/authenticate';
import { adminOnly } from '../../middleware/adminOnly';
import { uploadRateLimiter } from '../../middleware/rateLimiter';
import * as uploadController from './upload.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.use(authenticate, adminOnly);

router.post('/image', uploadRateLimiter, upload.single('image'), uploadController.uploadImage);
router.delete('/image', uploadController.deleteImage);

export default router;
