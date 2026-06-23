# @beb/admin — Admin Dashboard

Next.js 14 admin panel for BEB Fragrance. Runs on **port 3001**.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules
- **State:** Zustand
- **Data Fetching:** TanStack React Query
- **Auth:** NextAuth.js v4
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Testing:** Jest + React Testing Library, Vitest
- **Icons:** Lucide React

---

## File Structure

```
apps/admin/
├── app/
│   ├── (dashboard)/                 # Protected dashboard routes
│   │   ├── page.tsx                 # Main dashboard (stats overview)
│   │   ├── layout.tsx               # Dashboard layout with sidebar
│   │   ├── orders/                  # Orders list & detail
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── products/                # Products CRUD
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── users/                   # Users list & detail
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── payments/                # Payments management
│   │   │   └── page.tsx
│   │   ├── analytics/               # Charts & reports
│   │   │   └── page.tsx
│   │   └── settings/                # App settings
│   │       └── page.tsx
│   │
│   ├── login/                       # Admin login page
│   ├── layout.tsx                   # Root layout
│   ├── globals.scss
│   └── error.tsx / not-found.tsx
│
├── components/
│   ├── dashboard/                   # Dashboard widgets
│   │   ├── RevenueChart/            # Revenue line chart
│   │   ├── RecentOrders/            # Recent orders table
│   │   └── TopProducts/             # Top-selling products list
│   │
│   ├── analytics/                   # Analytics charts
│   │   ├── UserGrowthChart/         # User growth chart
│   │   ├── OrdersByStatusChart/     # Orders by status (pie)
│   │   └── PaymentMethodChart/      # Payment method breakdown
│   │
│   ├── orders/                      # Order management components
│   │   ├── OrdersTable/
│   │   ├── OrderDetailCard/
│   │   └── OrderStatusSelect/
│   │
│   ├── products/                    # Product management components
│   │   ├── ProductsTable/
│   │   ├── ProductForm/
│   │   └── ProductImageUpload/
│   │
│   ├── users/                       # User management components
│   │   ├── UsersTable/
│   │   └── UserDetailCard/
│   │
│   ├── payments/                    # Payment components
│   │   ├── PaymentsTable/
│   │   └── RefundModal/
│   │
│   ├── layout/                      # Admin layout components
│   │   ├── AdminLayout/
│   │   ├── AdminHeader/
│   │   └── AdminSidebar/
│   │
│   └── ui/                          # Reusable UI primitives
│       ├── AdminButton/
│       ├── AdminInput/
│       ├── AdminSelect/
│       ├── AdminTable/
│       ├── AdminModal/
│       ├── AdminBadge/
│       ├── AdminPagination/
│       ├── AdminSearchInput/
│       ├── StatCard/
│       └── Spinner/
│
├── hooks/                           # Custom React hooks
├── lib/                             # API client, auth helpers
├── store/                           # Zustand stores
├── providers/                       # React providers
├── styles/                          # Global SCSS
├── types/                           # TypeScript types
├── public/
├── middleware.ts                    # Auth middleware (admin-only guard)
└── package.json
```

---

## NPM Scripts

| Command                | Description                                      |
|------------------------|--------------------------------------------------|
| `npm run dev`          | Start Next.js dev server on port 3001            |
| `npm run build`        | Build production bundle                          |
| `npm run start`        | Start production server on port 3001             |
| `npm run lint`         | Run ESLint                                       |
| `npm run lint:fix`     | Run ESLint with auto-fix                         |
| `npm run format`       | Format all files with Prettier                   |
| `npm run type-check`   | TypeScript check (no emit)                       |
| `npm run test`         | Run Jest tests                                   |
| `npm run test:watch`   | Run Jest in watch mode                           |
| `npm run test:coverage`| Run Jest with coverage report                    |
| `npm run test:vitest`  | Run Vitest tests                                 |

---

## Environment Variables

Create `apps/admin/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# NextAuth
NEXTAUTH_SECRET=your_admin_nextauth_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3001
```

---

## Running Locally

```bash
# From admin directory
cd apps/admin

# Start dev server
npm run dev
# → http://localhost:3001
```

Or from the root to run all apps together:

```bash
npm run dev
```

---

## Dashboard Pages

| Route                        | Description                           |
|------------------------------|---------------------------------------|
| `/`                          | Dashboard overview (stats + charts)   |
| `/orders`                    | All orders list with filters          |
| `/orders/[id]`               | Order detail & status management      |
| `/products`                  | Products list                         |
| `/products/new`              | Create new product                    |
| `/products/[id]/edit`        | Edit product                          |
| `/users`                     | Users list                            |
| `/users/[id]`                | User detail                           |
| `/payments`                  | Payments list & refund management     |
| `/analytics`                 | Charts: revenue, growth, orders       |
| `/settings`                  | Application settings                  |
| `/login`                     | Admin login                           |

---

> Access requires an ADMIN role. The middleware redirects unauthorized users to `/login`.