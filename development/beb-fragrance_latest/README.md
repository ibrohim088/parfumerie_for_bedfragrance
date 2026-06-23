# BEB Fragrance — Monorepo

Full-stack e-commerce platform for BEB Fragrance. Built with **Turborepo** monorepo architecture.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Monorepo   | Turborepo + npm workspaces              |
| Backend    | Node.js, Express, TypeScript, Prisma    |
| Frontend   | Next.js 14, TypeScript, SCSS, Zustand   |
| Admin      | Next.js 14, TypeScript, Recharts        |
| Bot        | Telegraf (Telegram Bot), TypeScript     |
| Database   | PostgreSQL (via Prisma ORM)             |
| Cache      | Redis                                   |
| Storage    | AWS S3                                  |
| Payments   | Payme, Click                            |

---

## Project Structure

```
beb-fragrance/
├── apps/
│   ├── backend/        # Express REST API (port 4000)
│   ├── frontend/       # Next.js user-facing site (port 3000)
│   ├── admin/          # Next.js admin dashboard (port 3001)
│   └── bot/            # Telegram bot (Telegraf)
├── packages/
│   └── shared/         # Shared TypeScript types
├── package.json        # Root workspace config
├── turbo.json          # Turborepo pipeline config
├── tsconfig.base.json  # Base TypeScript config
└── .env.example        # Environment variables reference
```

---

## Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **PostgreSQL** running locally (port 5432)
- **Redis** running locally (port 6379)

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Each app has its own `.env` file. Copy and fill them in:

```bash
# Backend
cp .env.example apps/backend/.env

# Frontend
cp .env.example apps/frontend/.env.local

# Admin
cp .env.example apps/admin/.env.local

# Bot
cp .env.example apps/bot/.env
```

See `.env.example` for all required variables.

### 3. Set up the database

```bash
cd apps/backend
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Run migrations
npm run db:seed       # (Optional) Seed initial data
```

### 4. Run all apps in development

```bash
npm run dev
```

This starts all apps simultaneously via Turborepo:

| App      | URL                        |
|----------|----------------------------|
| Backend  | http://localhost:4000      |
| Frontend | http://localhost:3000      |
| Admin    | http://localhost:3001      |
| Bot      | (polling mode, no port)    |

---

## NPM Scripts (Root)

| Command              | Description                                      |
|----------------------|--------------------------------------------------|
| `npm run dev`        | Start all apps in development mode (parallel)    |
| `npm run build`      | Build all apps for production                    |
| `npm run start`      | Start all built apps in production mode          |
| `npm run lint`       | Lint all apps                                    |
| `npm run type-check` | TypeScript type check across all apps            |
| `npm run format`     | Format all files with Prettier                   |
| `npm run clean`      | Remove all build artifacts and node_modules      |

---

## Environment Variables Overview

Key variables from `.env.example`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/beb_fragrance

# JWT
JWT_SECRET=...
JWT_REFRESH_SECRET=...

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3 (image storage)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=beb-fragrance
AWS_REGION=us-east-1

# Payments
PAYME_MERCHANT_ID=...
PAYME_SECRET_KEY=...
CLICK_MERCHANT_ID=...
CLICK_SERVICE_ID=...
CLICK_SECRET_KEY=...

# Telegram Bot
TELEGRAM_BOT_TOKEN=...
ADMIN_CHAT_ID=...

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_SECRET=...
```

---

## Shared Package

`packages/shared` — shared TypeScript types used across backend, frontend, admin, and bot. Referenced as `@beb/shared` in each app.

---

## 🚀 Production Deployment — Render

The project is deployed on **[Render](https://render.com)** under the `Parfumerie` workspace.

### Live Services

| Service                  | Type            | Runtime      | Region  | Status     |
|--------------------------|-----------------|--------------|---------|------------|
| `beb-fragrance-admin`    | Web Service     | Node         | Oregon  | ✅ Deployed |
| `beb-fragrance-frontend` | Web Service     | Node         | Oregon  | ✅ Deployed |
| `beb-fragrance-backend`  | Web Service     | Node         | Oregon  | ✅ Deployed |
| `beb-fragrance-db`       | PostgreSQL 18   | —            | Oregon  | ✅ Available |

> Render Dashboard: [dashboard.render.com/project/prj-d8s3lo6q1p3s738lt7v0](https://dashboard.render.com/project/prj-d8s3lo6q1p3s738lt7v0)

---

### Deploying to Render

Each app has its own **Web Service** on Render. Below are the recommended settings per service.

#### `beb-fragrance-backend`

| Setting          | Value                                 |
|------------------|---------------------------------------|
| Root Directory   | `apps/backend`                        |
| Build Command    | `npm install && npm run build`        |
| Start Command    | `npm run start`                       |
| Environment      | Node                                  |
| Port             | `4000`                                |

#### `beb-fragrance-frontend`

| Setting          | Value                                 |
|------------------|---------------------------------------|
| Root Directory   | `apps/frontend`                       |
| Build Command    | `npm install && npm run build`        |
| Start Command    | `npm run start`                       |
| Environment      | Node                                  |
| Port             | `3000`                                |

#### `beb-fragrance-admin`

| Setting          | Value                                 |
|------------------|---------------------------------------|
| Root Directory   | `apps/admin`                          |
| Build Command    | `npm install && npm run build`        |
| Start Command    | `npm run start`                       |
| Environment      | Node                                  |
| Port             | `3001`                                |

#### `beb-fragrance-db`

Managed **PostgreSQL 18** database on Render. After creation, copy the **Internal Database URL** and set it as `DATABASE_URL` in the backend service's environment variables.

---

### Environment Variables on Render

Set these in each service's **Environment** tab on the Render dashboard.

**Backend service** — all variables from `apps/backend/.env` (use production values):

```env
NODE_ENV=production
DATABASE_URL=<Render Internal DB URL>
REDIS_URL=<Redis URL if used>
JWT_SECRET=...
JWT_REFRESH_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
PAYME_MERCHANT_ID=...
PAYME_SECRET_KEY=...
CLICK_MERCHANT_ID=...
CLICK_SERVICE_ID=...
CLICK_SECRET_KEY=...
PAYMENT_CALLBACK_BASE_URL=https://your-backend.onrender.com/api
TELEGRAM_BOT_TOKEN=...
ADMIN_CHAT_ID=...
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
```

**Frontend service:**

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-frontend.onrender.com
NEXT_PUBLIC_PAYME_MERCHANT_ID=...
NEXT_PUBLIC_CLICK_MERCHANT_ID=...
NEXT_PUBLIC_CLICK_SERVICE_ID=...
```

**Admin service:**

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-admin.onrender.com
```

---

### After First Deploy — Run Migrations

After the backend service is deployed for the first time, run database migrations via Render's **Shell** tab:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed   # optional
```