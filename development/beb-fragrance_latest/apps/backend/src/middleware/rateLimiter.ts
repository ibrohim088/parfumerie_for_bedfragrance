import rateLimit from 'express-rate-limit';

// OTP so'rash limiti — 1 daqiqada max 3 ta
export const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body?.phone || req.ip || 'unknown',
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov. 1 daqiqadan so\'ng qayta urinib ko\'ring.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login/OTP verify limiti — 5 daqiqada max 10 ta
export const authRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.body?.phone || req.ip || 'unknown',
  message: {
    success: false,
    message: 'Juda ko\'p urinish. 5 daqiqadan so\'ng qayta urinib ko\'ring.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Umumiy API limiti — 1 daqiqada max 100 ta
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov yuborildi. Iltimos, keyinroq urinib ko\'ring.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Upload limiti — 1 daqiqada max 10 ta
export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Juda ko\'p fayl yuklash urinishi. Biroz kuting.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});