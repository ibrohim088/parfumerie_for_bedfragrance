# BEB Fragrance — E-Commerce Platform

**@bebfragrance** | Original & Exclusive Perfumes | Toshkent, O'zbekiston

---

## Loyiha haqida

BEB Fragrance — original va eksklyuziv atirlar savdosi uchun to'liq e-commerce platformasi.
776K+ Instagram follower bilan O'zbekistondagi yetakchi parfyumeriya brendining onlayn savdo tizimi.

---

## Arxitektura

```
beb-fragrance/              ← Turborepo Monorepo
├── apps/
│   ├── backend/            ← Express + TypeScript + Prisma
│   ├── frontend/           ← Next.js 14 + TypeScript + SCSS
│   ├── admin/              ← Next.js 14 (Admin Dashboard)
│   └── bot/                ← Telegram Bot (Telegraf)
└── packages/
    └── shared/             ← Umumiy TypeScript tiplar
```

---

## Texnologiyalar

| Qatlam     | Stack                                              |
|------------|----------------------------------------------------|
| Backend    | Express, TypeScript, Prisma, PostgreSQL, Redis     |
| Frontend   | Next.js 14, SCSS Modules, TanStack Query, Zustand  |
| Admin      | Next.js 14, SCSS Modules, Recharts, TanStack Query |
| Bot        | Telegraf, Telegram WebApp API                      |
| To'lov     | Payme, Click, Naqt pul                             |
| Infra      | Docker, Turborepo, AWS S3                          |

---

## Ishga tushirish

### 1. Talablar

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL
- Redis

### 2. O'rnatish

```bash
git clone https://github.com/your-org/beb-fragrance.git
cd beb-fragrance
npm install
```

### 3. Environment o'zgaruvchilar

```bash
# Har bir app uchun .env.example dan nusxa oling
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/bot/.env.example apps/bot/.env
```

### 4. Database

```bash
cd apps/backend
npx prisma migrate dev
npx prisma db seed
```

### 5. Development

```bash
# Barcha applarni bir vaqtda ishga tushirish
npm run dev

# Alohida ishga tushirish
cd apps/backend  && npm run dev   # → http://localhost:4000
cd apps/frontend && npm run dev   # → http://localhost:3000
cd apps/admin    && npm run dev   # → http://localhost:3001
cd apps/bot      && npm run dev   # → Telegram bot
```

---

## URLs

| App      | Development              | Production                        |
|----------|--------------------------|-----------------------------------|
| Frontend | http://localhost:3000    | https://bebfragrance.uz           |
| Admin    | http://localhost:3001    | https://admin.bebfragrance.uz     |
| Backend  | http://localhost:4000    | https://api.bebfragrance.uz       |

---

## To'lov tizimlari

- **Payme** — JSON-RPC 2.0 + Basic Auth webhook
- **Click** — REST API + MD5 imzo (prepare/complete)
- **Naqt pul** — Telegram bot orqali admin tasdiqlaydi

---

## Loyiha strukturasi

Batafsil: `MVP/file structure/Beb_file_structure_v5.txt`

---

## Litsenziya

Xususiy. Barcha huquqlar himoyalangan © 2026 Parfum Exclusive Limited.