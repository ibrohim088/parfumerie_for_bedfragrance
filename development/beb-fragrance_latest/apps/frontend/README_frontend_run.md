# @beb/frontend — Ishga Tushirish

Next.js 14 (App Router) — foydalanuvchiga ko'rinadigan do'kon sayti.
**Port: 3000**

---

## Talablar

- Node.js 20+ tavsiya etiladi.
  > ⚠️ `apps/frontend/Dockerfile` hozircha `node:18-alpine` ishlatadi, bu
  > boshqa appdan (hammasi `20-alpine`) va root `package.json`dagi
  > `engines.node >= 20.0.0` talabidan farq qiladi. Docker orqali deploy
  > qilsangiz, bu faylni `20-alpine`ga moslab tuzatish tavsiya etiladi.
- **Backend ishlab turishi shart** (`http://localhost:4000`) — bo'lmasa
  catalog, savatcha, buyurtma kabi barcha API chaqiruvlari xato qaytaradi.

## 1-qadam — `.env.local` faylini sozlash

`apps/frontend/.env.local`:

| O'zgaruvchi | Izoh |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | sayt nomi |
| `NEXT_PUBLIC_APP_URL` | frontend'ning o'z manzili |
| `NEXT_PUBLIC_API_URL` | backend manzili, masalan `http://localhost:4000` |
| `NEXTAUTH_SECRET` | kamida 32 belgi |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXT_PUBLIC_PAYME_MERCHANT_ID` | Payme — UI uchun public ID |
| `NEXT_PUBLIC_CLICK_MERCHANT_ID` / `NEXT_PUBLIC_CLICK_SERVICE_ID` | Click — UI uchun public ID |
| `NEXT_PUBLIC_CLICK_RETURN_URL` | Click to'lovdan keyin qaytish manzili |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | masalan `uz` |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | masalan `uz,ru` |
| `NEXT_PUBLIC_FEATURE_PAYME` / `_CLICK` / `_CASH` | `true`/`false` — to'lov usullarini yoqish/o'chirish |

## 2-qadam — bog'liqliklar

```bash
cd apps/frontend
npm install
```

## 3-qadam — ishga tushirish

```bash
npm run dev
```

→ http://localhost:3000

**Production:**

```bash
npm run build
npm run start
```

## Foydali buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run lint` | ESLint (`next lint`) |
| `npm run type-check` | `tsc --noEmit` |

## Tuzilish bo'yicha eslatmalar

- `middleware.ts` bir vaqtning o'zida ham NextAuth, ham `next-intl` (i18n)
  middleware'larini ishlatadi. Agar kutilmagan redirect bo'lsa — birinchi
  shu faylni tekshiring.
- Sahifalar `[locale]` dinamik segmenti ichida (`/uz/...`, `/ru/...`).
  To'g'ridan-to'g'ri `/` ga kirish avtomatik default locale'ga
  yo'naltiriladi.

## Tez-tez chiqadigan muammolar

- **Ma'lumotlar yuklanmaydi / "Network Error"** — eng avval backend
  http://localhost:4000'da ishlab turganini va `NEXT_PUBLIC_API_URL`
  to'g'ri ekanligini tekshiring.
- **`Module not found` build paytida** — odatda Node versiyasi
  nomuvofiqligidan kelib chiqadi (Next.js 14.2.5 webpack resolver'i yangi
  Node versiyalari bilan muammo qilgan holatlar bo'lgan). Node 20.x
  ishlatilayotganiga ishonch hosil qiling.