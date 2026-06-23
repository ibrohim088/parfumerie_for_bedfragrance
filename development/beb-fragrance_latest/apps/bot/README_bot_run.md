# @beb/bot — Ishga Tushirish

Telegraf asosidagi Telegram bot. **Port yo'q** — long polling orqali ishlaydi
(lokalda webhook shart emas).

---

## Talablar

- Node.js 20+
- **Backend ishlab turishi shart** (`API_BASE_URL` orqali so'rov yuboradi)
- Telegram bot token (@BotFather'dan olinadi)

## 1-qadam — `.env` faylini sozlash

`apps/bot/.env` (`src/config/env.ts`dagi Zod sxemasi tekshiradi):

| O'zgaruvchi | Majburiy? | Izoh |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ✅ ha | @BotFather'dan olingan token |
| `ADMIN_CHAT_ID` | ✅ ha | admin Telegram chat ID |
| `WEBAPP_URL` | yo'q (default `http://localhost:3000`) | **HTTPS bo'lishi shart** — pastga qarang |
| `API_BASE_URL` | yo'q (default `http://localhost:4000/api`) | backend API manzili |
| `BACKEND_URL` | — | qo'shimcha, backend asosiy manzili |
| `DATABASE_URL`, `REDIS_URL` | — | agar bot bazaga to'g'ridan-to'g'ri ulansa |
| `NODE_ENV` | — | `development` / `production` |

### Bot tokenini olish

1. Telegram'da [@BotFather](https://t.me/BotFather)ga `/newbot` yuboring va
   ko'rsatmalarga amal qiling.
2. Olingan tokenni `TELEGRAM_BOT_TOKEN`ga qo'ying.
3. [@userinfobot](https://t.me/userinfobot) orqali o'z chat ID'ingizni
   oling va `ADMIN_CHAT_ID`ga qo'ying.

### Lokalda HTTPS (Web App tugmasi uchun)

Telegram Web App tugmalari **faqat HTTPS** manzillarda ishlaydi. Lokal
frontend (`localhost:3000`)ni tashqariga HTTPS orqali chiqarish uchun:

```bash
ngrok http 3000
```

Olingan `https://...ngrok-free.app` manzilini `WEBAPP_URL`ga qo'ying.

## 2-qadam — bog'liqliklar

```bash
cd apps/bot
npm install
```

## 3-qadam — ishga tushirish

```bash
npm run dev
```

`nodemon` `src/`ni kuzatib, har bir o'zgarishda `ts-node` orqali botni
qayta ishga tushiradi. Bot long polling orqali ishlaydi — alohida server
yoki port ochilmaydi.

**Production:**

```bash
npm run build   # tsc — dist/ ga compile qiladi
npm run start   # node dist/index.js
```

## Foydali buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run type-check` | `tsc --noEmit` |

## Xavfsizlik bo'yicha umumiy tavsiya

Bot tokeni sizib chiqishi yoki bot kutilmagan/zararli xabarlar yuborib
qolishi mumkin bo'lgan holatlar uchun umumiy tartib:

1. Botni darhol to'xtatib, @BotFather orqali tokenni yangilang
   (`/revoke` yoki yangi token).
2. Muammo davom etsa, **toza muhitda** (yangi Docker konteyner yoki virtual
   muhit) `npm install` va `npm run start` qilib qayta tekshiring — bu
   muammo mahalliy `node_modules`dagi buzilgan paketdan emasligini
   tasdiqlashga yordam beradi.
3. Toza muhitda ham muammo takrorlansa, bu tarmoq/DNS darajasidagi
   muammo ekanini ko'rsatadi va tarmoq sozlamalarini tekshirish kerak.

## Tez-tez chiqadigan muammolar

- **Bot javob bermaydi** — `TELEGRAM_BOT_TOKEN` to'g'riligini va Telegram
  API'ga internet orqali ulanish bor-yo'qligini tekshiring (ba'zi
  tarmoqlarda Telegram bloklangan bo'lishi mumkin — VPN/proxy kerak
  bo'lishi mumkin).
- **Web App tugmasi ochilmaydi** — `WEBAPP_URL` `http://` bilan emas,
  `https://` bilan boshlanishi shart.
- **`❌ Bot — Invalid environment variables`** — `TELEGRAM_BOT_TOKEN` yoki
  `ADMIN_CHAT_ID` `.env`'da yo'q.