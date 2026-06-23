# @beb/admin — Ishga Tushirish

Next.js 14 (App Router) — admin dashboard. **Port: 3001**

---

## Talablar

- Node.js 20+
- **Backend ishlab turishi shart** (`http://localhost:4000`)
- Bazada `ADMIN` rolidagi foydalanuvchi bo'lishi kerak — aks holda
  `/login`'dan keyin `middleware.ts` sizni qaytarib yuboradi.

## 1-qadam — `.env.local` faylini sozlash

`apps/admin/.env.local`:

| O'zgaruvchi | Izoh |
|---|---|
| `NEXT_PUBLIC_APP_NAME` / `NEXT_PUBLIC_APP_URL` | admin paneli nomi/manzili |
| `NEXT_PUBLIC_API_URL` | backend manzili, masalan `http://localhost:4000` |
| `NEXTAUTH_SECRET` | kamida 32 belgi — frontend'dan **farqli** qiymat tavsiya etiladi |
| `NEXTAUTH_URL` | `http://localhost:3001` |
| `NEXT_PUBLIC_PAYME_MERCHANT_ID` / `NEXT_PUBLIC_CLICK_MERCHANT_ID` / `NEXT_PUBLIC_CLICK_SERVICE_ID` / `NEXT_PUBLIC_CLICK_RETURN_URL` | to'lov tizimlari uchun public ID'lar |
| `NEXT_PUBLIC_DEFAULT_LOCALE` / `NEXT_PUBLIC_SUPPORTED_LOCALES` | tillar |
| `NEXT_PUBLIC_FEATURE_PAYME` / `_CLICK` / `_CASH` | to'lov usullarini yoqish/o'chirish |

## 2-qadam — bog'liqliklar

```bash
cd apps/admin
npm install
```

## 3-qadam — ishga tushirish

```bash
npm run dev
```

→ http://localhost:3001 (kirish uchun `/login`)

**Production:**

```bash
npm run build
npm run start
```

## Testlar

```bash
npm run test           # Jest
npm run test:watch
npm run test:coverage
npm run test:vitest    # Vitest
```

## TypeScript build haqida eslatma

Root `tsconfig.base.json`da `noUncheckedIndexedAccess: true` yoqilgan — bu
degani massiv/obyektdan index orqali olingan har bir qiymat
`T | undefined` deb hisoblanadi. `npm run build` yoki
`npx tsc --noEmit` paytida chiqadigan ko'pchilik "possibly undefined" xatolari
shu sozlamadan kelib chiqadi (ayniqsa chart va upload komponentlarida) —
ularni optional chaining (`?.`) yoki aniq null/undefined tekshiruvi bilan
tuzatish kerak bo'ladi.

> 💡 Tavsiya: Render'ga deploy qilishdan oldin lokalda
> `npx tsc --noEmit` ishlatib, build xatolarini oldindan ko'rib olish —
> Render build loglarini kutib o'tirishdan ko'ra tezroq.

## Foydali buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run format` | Prettier |
| `npm run type-check` | `tsc --noEmit` |

## Tez-tez chiqadigan muammolar

- **`/login`'dan keyin asosiy sahifaga qaytarib yuborilmaydi yoki doim
  `/login`ga tashlaydi** — `NEXTAUTH_URL` portga (`3001`) to'g'ri
  sozlanganini va foydalanuvchi rolining aniq `ADMIN` ekanligini tekshiring.
- **Analytics sahifasida chart ishlamaydi** — bu sahifa backend'dagi
  analytics endpoint'larga bog'liq; backend ishlab turganini va tegishli
  route'lar mavjudligini tekshiring.