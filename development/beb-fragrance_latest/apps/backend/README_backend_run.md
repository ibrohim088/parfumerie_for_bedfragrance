# @beb/backend — Ishga Tushirish

Express + Prisma + TypeScript REST API. **Port: 4000**

---

## Talablar

- Node.js 20+
- PostgreSQL ishlab turishi kerak (`DATABASE_URL` orqali ulanadi)
- Redis ishlab turishi kerak (`REDIS_URL`, default `redis://localhost:6379`)

## 1-qadam — `.env` faylini sozlash

`apps/backend/.env` faylida quyidagi o'zgaruvchilar **majburiy**
(`src/config/env.ts`dagi Zod sxemasi tekshiradi — bittasi yo'q bo'lsa server
ishga tushmay, konsolga aniq xato chiqaradi va to'xtaydi):

| O'zgaruvchi | Izoh |
|---|---|
| `DATABASE_URL` | PostgreSQL ulanish satri |
| `JWT_SECRET` | kamida 32 belgi |
| `JWT_REFRESH_SECRET` | kamida 32 belgi |
| `PAYME_MERCHANT_ID` | Payme.uz |
| `PAYME_SECRET_KEY` | Payme.uz |
| `CLICK_MERCHANT_ID` | Click.uz |
| `CLICK_SERVICE_ID` | Click.uz |
| `CLICK_SECRET_KEY` | Click.uz |
| `PAYMENT_CALLBACK_BASE_URL` | to'liq URL bo'lishi shart, masalan `http://localhost:4000/api` |
| `TELEGRAM_BOT_TOKEN` | buyurtma bildirishnomalari uchun |
| `ADMIN_CHAT_ID` | admin Telegram chat ID |

Quyidagilar **ixtiyoriy** (yo'q bo'lsa default qiymat yoki `undefined` bilan
ishlaydi):

| O'zgaruvchi | Default / izoh |
|---|---|
| `PORT` | `4000` |
| `JWT_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | `15m` / `7d` |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`, `AWS_REGION` | S3 — hozircha optional |
| `SMS_EMAIL`, `SMS_SECRET` | Eskiz.uz — `OTP_DELIVERY=email` bo'lganda kerak emas |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | email orqali OTP yuborish uchun |
| `OTP_DELIVERY` | `sms` \| `email` \| `console` |
| `CASH_MIN_AMOUNT` / `CASH_MAX_AMOUNT` | `10000` / `10000000` |

## 2-qadam — bog'liqliklar

Agar root'dan `npm install` qilingan bo'lsa, bu qadam shart emas:

```bash
cd apps/backend
npm install
```

## 3-qadam — Prisma / ma'lumotlar bazasi

```bash
npm run db:generate    # Prisma Client generatsiya qiladi (schema: src/prisma/schema.prisma)
npm run db:migrate     # migratsiyalarni bazaga qo'llaydi (dev rejim)
npm run db:seed        # ixtiyoriy — boshlang'ich data
```

> ⚠️ **Muhim:** `src/prisma/migrations/` papkasi `.gitignore`'da. Productionga
> (Render va h.k.) deploy qilishdan oldin bu papka u yerda ham mavjud
> bo'lishini ta'minlang — aks holda jadvallar yaratilmaydi va backend 500
> xato beradi.

Bazani vizual ko'rish uchun:

```bash
npm run db:studio
```

## 4-qadam — serverni ishga tushirish

**Development** (kuzatuv rejimi, fayl o'zgarganda avtomatik qayta yuklanadi):

```bash
npm run dev
```

→ http://localhost:4000

Bu buyruq avval `kill-port.js` skriptini ishlatadi (4000-portni bo'shatadi),
keyin `nodemon` orqali serverni ishga tushiradi.

**Production:**

```bash
npm run build   # tsc — src/ ni dist/ ga compile qiladi
npm run start   # node dist/server.js
```

## Foydali buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run lint` | ESLint (`src/`) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run clean` | `dist/` papkasini o'chiradi |

## API bazaviy manzili

```
http://localhost:4000/api
```

## Tez-tez chiqadigan xatolar

- **`❌ Invalid environment variables`** — yuqoridagi majburiy
  o'zgaruvchilardan biri `.env`'da yo'q yoki noto'g'ri formatda. Konsolda
  qaysi o'zgaruvchi va nima sababdan xato ekanligi aniq ko'rsatiladi.
- **Port 4000 band** — `npm run dev` avtomatik bo'shatadi, lekin agar
  baribir xato chiqsa: `npx kill-port 4000` yoki `lsof -ti:4000 | xargs kill -9`.
- **Prisma Client eski/mos kelmaydi** — `schema.prisma`ni o'zgartirgandan
  keyin har doim `npm run db:generate`ni qaytadan ishga tushiring.
- **`PAYMENT_CALLBACK_BASE_URL must be a valid URL`** — bu o'zgaruvchi
  `http://` yoki `https://` bilan boshlanishi shart, oddiy domен emas.