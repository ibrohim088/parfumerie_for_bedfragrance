# @beb/backend — REST API

Express.js REST API server for BEB Fragrance. Runs on **port 4000**.

---

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma (PostgreSQL)
- **Cache:** Redis (ioredis)
- **Auth:** JWT (access + refresh tokens)
- **Storage:** AWS S3 (multer upload)
- **Payments:** Payme, Click
- **SMS:** Eskiz.uz
- **Logging:** Winston
- **Validation:** Zod

---

## File Structure

```
apps/backend/
├── src/
│   ├── config/             # Service configurations
│   │   ├── database.ts     # Prisma client instance
│   │   ├── redis.ts        # Redis connection
│   │   ├── s3.ts           # AWS S3 client
│   │   ├── payment.ts      # Payme / Click config
│   │   ├── sms.ts          # Eskiz.uz SMS config
│   │   ├── email.ts        # Nodemailer SMTP config
│   │   ├── telegram.ts     # Telegram notification config
│   │   └── env.ts          # Env validation (Zod)
│   │
│   ├── constants/
│   │   ├── orderStatus.ts  # Order status enum
│   │   ├── paymentStatus.ts
│   │   └── roles.ts        # USER / ADMIN roles
│   │
│   ├── middleware/
│   │   ├── authenticate.ts  # JWT auth middleware
│   │   ├── adminOnly.ts     # Admin role guard
│   │   ├── validate.ts      # Zod request validation
│   │   ├── rateLimiter.ts   # Express rate limiter
│   │   ├── errorHandler.ts  # Global error handler
│   │   ├── notFound.ts      # 404 handler
│   │   └── requestLogger.ts # HTTP request logger
│   │
│   ├── modules/             # Feature modules (controller + service + routes)
│   │   ├── auth/            # Register, login, OTP, refresh token
│   │   ├── users/           # User CRUD
│   │   ├── products/        # Product catalog, brands, categories
│   │   ├── orders/          # Order management
│   │   ├── payments/        # Payme & Click payment flow
│   │   ├── addresses/       # User delivery addresses
│   │   ├── analytics/       # Admin analytics & stats
│   │   ├── notifications/   # Push / SMS notifications
│   │   ├── scent-profile/   # User fragrance profile quiz
│   │   └── upload/          # File upload to S3
│   │
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   ├── seed.ts          # DB seed data
│   │   └── migrations/      # Prisma migration files
│   │
│   ├── types/
│   │   ├── env.d.ts         # Env variable type declarations
│   │   └── express.d.ts     # Extended Express request types
│   │
│   ├── utils/
│   │   ├── apiResponse.ts   # Standardized API response helper
│   │   ├── jwt.ts           # JWT sign/verify helpers
│   │   ├── hash.ts          # bcrypt password hashing
│   │   ├── otp.ts           # OTP generation
│   │   ├── pagination.ts    # Pagination helper
│   │   ├── slugify.ts       # Slug generator
│   │   └── logger.ts        # Winston logger instance
│   │
│   └── server.ts            # App entry point
│
├── nodemon.json             # Nodemon config (watches src/)
├── kill-port.js             # Kills port 4000 before dev start
├── Dockerfile
├── .env                     # Local environment variables
└── package.json
```

---

## NPM Scripts

| Command               | Description                                         |
|-----------------------|-----------------------------------------------------|
| `npm run dev`         | Start in watch mode (nodemon) — auto-restart on save |
| `npm run build`       | Compile TypeScript → `dist/`                        |
| `npm run start`       | Run compiled production build (`dist/server.js`)    |
| `npm run lint`        | ESLint check on `src/`                              |
| `npm run type-check`  | TypeScript type check (no emit)                     |
| `npm run clean`       | Remove `dist/` folder                               |
| `npm run db:generate` | Generate Prisma Client from schema                  |
| `npm run db:migrate`  | Apply Prisma migrations (dev)                       |
| `npm run db:seed`     | Seed the database with initial data                 |
| `npm run db:studio`   | Open Prisma Studio (visual DB browser)              |

---

## Environment Variables

Create `apps/backend/.env`:

```env
# Server
NODE_ENV=development
PORT=4000

# PostgreSQL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/beb_fragrance

# JWT
JWT_SECRET=your_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=beb-fragrance
AWS_REGION=us-east-1

# Payments
PAYME_MERCHANT_ID=...
PAYME_SECRET_KEY=...
PAYME_TEST_MODE=true
CLICK_MERCHANT_ID=...
CLICK_SERVICE_ID=...
CLICK_SECRET_KEY=...
PAYMENT_CALLBACK_BASE_URL=http://localhost:4000/api

# Telegram
TELEGRAM_BOT_TOKEN=...
ADMIN_CHAT_ID=...

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password

# OTP delivery: sms | email | console
OTP_DELIVERY=email
```

---

## Running Locally

```bash
# From backend directory
cd apps/backend

# 1. Install deps (if not done from root)
npm install

# 2. Setup DB
npm run db:generate
npm run db:migrate
npm run db:seed    # optional

# 3. Start dev server
npm run dev
# → http://localhost:4000
```

---

## API Base URL

```
http://localhost:4000/api
```

Modules expose routes like:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/products`
- `GET  /api/orders`
- `POST /api/payments/payme/callback`
- `POST /api/payments/click/prepare`