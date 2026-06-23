# @beb/frontend — User-Facing Website

Next.js 14 e-commerce storefront for BEB Fragrance. Runs on **port 3000**.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules
- **State:** Zustand
- **Data Fetching:** TanStack React Query
- **Auth:** NextAuth.js v4
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl (uz / ru)
- **HTTP:** Axios
- **Icons:** Lucide React

---

## File Structure

```
apps/frontend/
├── app/
│   ├── [locale]/                    # i18n root — all pages under locale
│   │   ├── (public)/                # Public pages (no auth required)
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── catalog/             # Product catalog & detail
│   │   │   ├── cart/                # Shopping cart
│   │   │   ├── checkout/            # Checkout + payment result
│   │   │   ├── about/               # About page
│   │   │   ├── blog/                # Blog / journal
│   │   │   ├── brands/              # Brands listing
│   │   │   ├── decant/              # Decant page
│   │   │   └── gift-box/            # Gift box page
│   │   │
│   │   ├── (account)/               # Protected user account pages
│   │   │   └── account/
│   │   │       ├── page.tsx         # Account overview
│   │   │       ├── orders/          # Order history
│   │   │       ├── addresses/       # Saved addresses
│   │   │       ├── personal-info/   # Profile edit
│   │   │       ├── payment/         # Payment methods
│   │   │       ├── notifications/   # Notification settings
│   │   │       └── scent-profile/   # Fragrance quiz
│   │   │
│   │   ├── (auth)/                  # Auth pages (login / register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   └── auth/                    # NextAuth callback routes
│   │       ├── login/
│   │       ├── register/
│   │       └── password-reset/
│   │
│   ├── api/auth/[...nextauth]/      # NextAuth API route
│   ├── layout.tsx                   # Root layout
│   ├── globals.scss                 # Global styles
│   └── error.tsx / not-found.tsx
│
├── components/
│   ├── home/                # Home page sections
│   │   ├── HeroSection/
│   │   ├── FeaturedProducts/
│   │   ├── ProductSection/
│   │   ├── FraganceBrands/
│   │   ├── GiftBoxSection/
│   │   ├── BrandStory/
│   │   ├── JournalSection/
│   │   └── InstagramSection/
│   │
│   ├── catalog/             # Catalog & product components
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   ├── CatalogGrid/
│   │   ├── CatalogSidebar/
│   │   ├── FilterPanel/
│   │   └── ProductGallery/
│   │
│   ├── cart/                # Cart components
│   │   ├── CartItem/
│   │   └── CartSummary/
│   │
│   ├── account/             # Account section components
│   │   ├── ProfileForm/
│   │   ├── OrderCard/
│   │   ├── OrderTabs/
│   │   ├── AddressCard/
│   │   ├── AccountSidebar/
│   │   └── AccountLayout/
│   │
│   ├── payment/             # Payment UI components
│   │   ├── PaymeButton/
│   │   ├── ClickButton/
│   │   ├── CashInfo/
│   │   ├── PaymentMethodSelector/
│   │   └── PaymentStatus/
│   │
│   ├── productDetail/       # Product detail page components
│   │   └── ProductImages/
│   │
│   └── layout/              # Global layout components
│       ├── Navbar/
│       ├── Footer/
│       ├── MobileMenu/
│       └── AccountSidebar/
│
├── hooks/                   # Custom React hooks
├── lib/                     # API client, helpers
├── store/                   # Zustand stores (cart, user, etc.)
├── providers/               # React context providers
├── styles/                  # Global SCSS variables / mixins
├── types/                   # TypeScript type definitions
├── i18n/                    # Locale message files (uz/ru)
├── public/                  # Static assets
├── middleware.ts             # NextAuth + i18n middleware
└── package.json
```

---

## NPM Scripts

| Command              | Description                                    |
|----------------------|------------------------------------------------|
| `npm run dev`        | Start Next.js dev server on port 3000          |
| `npm run build`      | Build production bundle                        |
| `npm run start`      | Start production server on port 3000           |
| `npm run lint`       | Run ESLint                                     |
| `npm run type-check` | TypeScript check (no emit)                     |

---

## Environment Variables

Create `apps/frontend/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# NextAuth
NEXTAUTH_SECRET=your_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3000

# Payments (public keys for UI)
NEXT_PUBLIC_PAYME_MERCHANT_ID=your_payme_merchant_id
NEXT_PUBLIC_CLICK_MERCHANT_ID=your_click_merchant_id
NEXT_PUBLIC_CLICK_SERVICE_ID=your_click_service_id
```

---

## Running Locally

```bash
# From frontend directory
cd apps/frontend

# Start dev server
npm run dev
# → http://localhost:3000
```

Or from the root to run all apps together:

```bash
npm run dev
```

---

## Pages Overview

| Route                        | Description                    |
|------------------------------|--------------------------------|
| `/[locale]`                  | Home page                      |
| `/[locale]/catalog`          | Product listing with filters   |
| `/[locale]/catalog/[slug]`   | Product detail page            |
| `/[locale]/cart`             | Shopping cart                  |
| `/[locale]/checkout`         | Checkout flow                  |
| `/[locale]/checkout/result`  | Payment result page            |
| `/[locale]/account`          | User account dashboard         |
| `/[locale]/account/orders`   | Order history                  |
| `/[locale]/auth/login`       | Login page                     |
| `/[locale]/auth/register`    | Registration page              |
| `/[locale]/about`            | About page                     |
| `/[locale]/brands`           | Brands page                    |
| `/[locale]/decant`           | Decant service page            |
| `/[locale]/gift-box`         | Gift box page                  |

Supported locales: `uz`, `ru`