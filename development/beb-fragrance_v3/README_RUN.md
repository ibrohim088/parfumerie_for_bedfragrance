# BEB Fragrance — Loyihani Ishga Tushirish

## Talablar
- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL 16
- Redis

## Redis o'rnatish (Windows)

### Variant 1 — WSL (tavsiya etiladi)
PowerShell ni Administrator sifatida oching:
```
wsl --install
```
Restart keyin Ubuntu terminalida:
```
sudo apt update
sudo apt install redis-server -y
sudo service redis-server start
redis-cli ping   # → PONG
```

### Variant 2 — Docker
```
docker run -d --name redis -p 6379:6379 redis:alpine
```

---

## 1. Dependencies o'rnatish
```bash
cd beb-fragrance_v2_with_admin_ui
npm install
```

## 2. PostgreSQL — Database yaratish
```bash
psql -U postgres -c "CREATE DATABASE beb_fragrance;"
```

## 3. Backend — Prisma setup
```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
```

## 4. Loyihani ishga tushirish

### Hammasi bir vaqtda (root papkadan):
```bash
npm run dev
```

### Alohida-alohida (har biri yangi terminal):
```bash
# Terminal 1 — Backend
cd apps/backend && npm run dev
# → http://localhost:4000

# Terminal 2 — Frontend
cd apps/frontend && npm run dev
# → http://localhost:3000

# Terminal 3 — Admin
cd apps/admin && npm run dev
# → http://localhost:3001

# Terminal 4 — Bot (ixtiyoriy, haqiqiy token kerak)
cd apps/bot && npm run dev
```

## URLs
| App      | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000      |
| Admin    | http://localhost:3001      |
| Backend  | http://localhost:4000      |
| Health   | http://localhost:4000/health |

## .env fayllari
Barcha .env fayllar tayyor. Faqat quyidagilarni haqiqiy qiymatlarga almashtiring:
- `apps/backend/.env` → DATABASE_URL (PostgreSQL username/password)
- `apps/backend/.env` → TELEGRAM_BOT_TOKEN (haqiqiy bot uchun)
- `apps/backend/.env` → SMS_EMAIL, SMS_SECRET (Eskiz.uz)
- `apps/backend/.env` → PAYME_*, CLICK_* (to'lov uchun)
