# Frontend Ishga Tushirish (Updated)

## ✅ Nima Qilindi?

Frontend tolik wireframe ga mos ravishda qayta yozildi:

### Core Features
- ✅ **Dark/Light Theme** - Zustand store + SCSS variables
- ✅ **Multi-language (uz, ru)** - next-intl integration
- ✅ **Navbar** - Lucide icons, theme toggle, user menu
- ✅ **API Client** - Backend (localhost:4000) bilan connection
- ✅ **React Query** - Products fetching with caching
- ✅ **Zustand Stores** - Auth, UI, Cart state management

---

## 🚀 Ishga Tushirish

### 1. Dependencies O'rnatish
```bash
cd development/beb-fragrance_latest
npm install
```

### 2. Environment Variables
```bash
# Frontend .env.local already configured
# API_URL: http://localhost:4000/api
# Languages: uz, ru
# Themes: light, dark
```

### 3. Frontend Ishga Tushirish
```bash
cd apps/frontend
npm run dev
# → http://localhost:3000
```

### 4. Backend Ishga Tushirish (kerak bo'lsa)
```bash
cd apps/backend
npm run dev
# → http://localhost:4000
```

---

## 📂 Wireframe mos Pages

**Level 1 (Main Pages):**
- ✅ Home → `/` (Hero + Featured Products)
- ⏳ Catalog → `/catalog`
- ⏳ Product Detail → `/catalog/[slug]`
- ⏳ Gift Box → `/gift-box`
- ⏳ About → `/about`

**Level 2 (Account Pages - Logged in):**
- ⏳ Login → `/auth/login`
- ⏳ Account Profile → `/account/profile`
- ⏳ Personal Info → `/account/personal-info`
- ⏳ Order History → `/account/orders` (with tabs)
- ⏳ Addresses → `/account/addresses`
- ⏳ Payment Methods → `/account/payments`
- ⏳ Notifications → `/account/notifications`
- ⏳ Scent Profile → `/account/scent-profile`

**Legend:** ✅ = Tayyor, ⏳ = Ifodalash kerak

---

## 🎨 Theme & Language

### Theme Toggling
```typescript
import { useUIStore } from '@/store/uiStore';

const theme = useUIStore(state => state.theme); // 'light' | 'dark'
const toggleTheme = useUIStore(state => state.toggleTheme);
```

### Language Switching
```typescript
import { useRouter } from 'next/navigation';

router.push('/uz/catalog'); // Uzbek
router.push('/ru/catalog'); // Russian
```

---

## 🔌 Backend Connection

### API Client Usage
```typescript
import { api } from '@/lib/api';

// Products
const products = await api.products.getAll();
const product = await api.products.getOne('slug');

// Orders
const orders = await api.orders.getAll();

// Auth
await api.auth.verifyOtp({ phone, code });
```

### React Query Hook Usage
```typescript
import { useProducts } from '@/hooks/useProducts';

const { data, isLoading } = useProducts({ limit: 4 });
```

---

## 📝 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 + TypeScript |
| State | Zustand (auth, ui, cart) |
| Data Fetching | React Query + Axios |
| Styling | SCSS Modules + CSS Variables |
| Icons | Lucide React |
| i18n | next-intl |
| Forms | react-hook-form + Zod |

---

## 🐛 Development Checklist

- [ ] Backend running (localhost:4000)
- [ ] Frontend running (localhost:3000)
- [ ] Theme toggle working
- [ ] Language switcher working
- [ ] Mock products displaying
- [ ] Navbar responsive

---

## 📞 Contacts

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:4000/api  
**Navbar:** Home | Catalog | Gift Box | About | Account

---

## ⚠️ Muqim Issues

Agar API connection xatosi bo'lsa:
1. Backend ishga tushganligini tekshiring (localhost:4000)
2. `.env.local` ni check qiling: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`
3. CORS xatolari bo'lsa, backend CORS sozlamalarini check qiling
