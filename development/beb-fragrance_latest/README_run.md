# BEB Fragrance — Loyihani Ishga Tushirish (Root)

Bu fayl butun `beb-fragrance` monorepo'sini (Turborepo + npm workspaces) ishga
tushirish bo'yicha qisqa va amaliy yo'riqnoma. Har bir app uchun batafsil
qo'llanma alohida fayllarda:

- [`apps/backend/README_RUN.md`](apps/backend/README_RUN.md)
- [`apps/frontend/README_RUN.md`](apps/frontend/README_RUN.md)
- [`apps/admin/README_RUN.md`](apps/admin/README_RUN.md)
- [`apps/bot/README_RUN.md`](apps/bot/README_RUN.md)

---

## Talablar (Prerequisites)

| Talab | Versiya |
|---|---|
| Node.js | **20.x** (root `package.json`'dagi `engines.node` shart qiladi) |
| npm | >= 10.0.0 |
| PostgreSQL | ishlab turgan bo'lishi kerak (lokal yoki masofaviy) |
| Redis | ishlab turgan bo'lishi kerak (lokal yoki masofaviy) |
| ngrok / Cloudflare Tunnel | faqat bot'ning Telegram Web App tugmasini lokalda sinash uchun kerak |

> ⚠️ **Node versiyasi haqida eslatma:** Render'da frontend build'i bir marta
> Node'ning eng yangi versiyasini (26) avtomatik tanlab olgani sababli
> webpack xatosi bilan ishlamay qolgan edi (Next.js 14.2.5 bilan mos kelmadi).
> Lokal mashinada ham aniq **Node 20.x** ishlatish tavsiya etiladi
> (`nvm install 20 && nvm use 20`). Productionga deploy qilishda root yoki
> har bir app papkasiga `.node-version` fayli qo'shib, ichiga `20` deb
> yozib qo'ying.

---

## 1. Bog'liqliklarni o'rnatish

Root'dan bitta marta ishga tushirish kifoya — npm workspaces orqali
`apps/*` va `packages/*` ichidagi barcha paketlar ham o'rnatiladi:

```bash
npm install
```

## 2. Environment fayllarini sozlash

Har bir app o'z `.env` faylini talab qiladi:

| App | Fayl |
|---|---|
| backend | `apps/backend/.env` |
| frontend | `apps/frontend/.env.local` |
| admin | `apps/admin/.env.local` |
| bot | `apps/bot/.env` |

Umumiy ko'rinish uchun root'dagi `.env.example` faylga qarang. Har bir
o'zgaruvchining nima uchun kerakligi va majburiy/ixtiyoriy ekanligi tegishli
app papkasidagi `README_RUN.md`'da yozilgan.

## 3. Ma'lumotlar bazasini tayyorlash

Bazaga oid hamma narsa backend orqali boshqariladi:

```bash
cd apps/backend
npm run db:generate   # Prisma Client generatsiya qilish
npm run db:migrate    # migratsiyalarni qo'llash
npm run db:seed       # ixtiyoriy — boshlang'ich data
cd ../..
```

> ⚠️ `apps/backend/src/prisma/migrations/` papkasi `.gitignore`'da
> ko'rsatilgan. Bu degani — agar uni alohida productionga (masalan Render)
> ko'chirmasangiz, deploy qilingan serverda jadvallar yaratilmaydi. Deploy
> qilishdan oldin bu papkani git'ga qo'shish (yoki CI bosqichida
> `prisma migrate deploy` ishlatish) kerak.

## 4. Barcha appni birga ishga tushirish

```bash
npm run dev
```

Turborepo `apps/*` ichidagi har bir `dev` skriptini parallel ishga
tushiradi:

| App | URL | Port |
|---|---|---|
| Backend | http://localhost:4000 | 4000 |
| Frontend | http://localhost:3000 | 3000 |
| Admin | http://localhost:3001 | 3001 |
| Bot | — (long polling, port yo'q) | — |

## 5. Yoki har birini alohida ishga tushirish

Har biri uchun alohida terminal oynasi oching:

```bash
# Terminal 1
cd apps/backend && npm run dev

# Terminal 2
cd apps/frontend && npm run dev

# Terminal 3
cd apps/admin && npm run dev

# Terminal 4
cd apps/bot && npm run dev
```

---

## Production build (lokal sinov uchun)

```bash
npm run build   # turbo run build — barcha appni build qiladi
npm run start   # turbo run start — barcha appni production rejimida ishga tushiradi
```

Real productionda (Render kabi) har bir app **alohida Web Service**
sifatida deploy qilinadi — root `npm run start` faqat lokal tekshirish
uchun.

## Boshqa foydali root buyruqlari

| Buyruq | Vazifasi |
|---|---|
| `npm run lint` | Barcha appda ESLint |
| `npm run type-check` | Barcha appda `tsc --noEmit` |
| `npm run format` | Prettier bilan formatlash |
| `npm run clean` | Build natijalari + `node_modules`ni o'chirish |

---

## Loyiha tarixidan chiqqan boshqa eslatmalar

- **`apps/frontend/Dockerfile`** hozircha `node:18-alpine` ishlatadi, holbuki
  boshqa uchta app (`backend`, `admin`, `bot`) `node:20-alpine` ishlatadi va
  root `package.json` `engines.node >= 20.0.0` deb talab qiladi. Agar
  frontend'ni Docker orqali deploy qilsangiz, bu nomuvofiqlikni `20-alpine`
  ga moslab tuzatish tavsiya etiladi.
- **Bot** lokalda webhook talab qilmaydi — long polling orqali ishlaydi.
  Lekin Telegram Web App tugmasi ishlashi uchun `WEBAPP_URL` doim **HTTPS**
  bo'lishi shart — shuning uchun lokal frontendni ngrok/Cloudflare Tunnel
  orqali oching (batafsil: `apps/bot/README_RUN.md`).