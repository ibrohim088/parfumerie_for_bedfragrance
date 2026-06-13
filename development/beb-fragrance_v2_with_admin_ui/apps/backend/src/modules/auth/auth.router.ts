import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { otpRateLimiter, authRateLimiter } from '../../middleware/rateLimiter';
import { sendOtpSchema, verifyOtpSchema, refreshTokenSchema } from './auth.validation';
import * as authController from './auth.controller';

const router = Router();

router.post('/send-otp', otpRateLimiter, validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', authRateLimiter, validate(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);
router.post('/logout', authenticate, authController.logout);

export default router;
