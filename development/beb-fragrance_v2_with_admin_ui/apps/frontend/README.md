# BEB Fragrance - Frontend Application

Premium fragrance e-commerce platform for Uzbekistan market.

## Overview

Modern Next.js 14 frontend application with:
- **TypeScript** - Full type safety
- **React 18** - Latest React features
- **App Router** - Next.js 14 routing
- **Tailwind CSS & SCSS** - Styling
- **NextAuth.js** - Authentication
- **React Query** - Data fetching
- **Zustand** - State management
- **Internationalization** - Uzbek & Russian support
- **Dark Mode** - Theme support

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Setup

Create `.env.local` with required variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
# ... see .env.example for complete list
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── hooks/                  # Custom hooks
├── lib/                    # Utilities & helpers
├── store/                  # Zustand stores
├── styles/                 # Global & component styles
├── types/                  # TypeScript definitions
├── i18n/                   # Internationalization
├── providers/              # Context providers
└── public/                 # Static assets
```

## Available Scripts

### Development
```bash
pnpm dev          # Start dev server
pnpm dev:debug    # Debug mode
```

### Building
```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking
```

### Testing
```bash
pnpm test         # Run Jest tests
pnpm test:watch   # Watch mode
pnpm test:cov     # Coverage report
pnpm test:vitest  # Run Vitest
```

## Technology Stack

### Frontend Framework
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling
- **SCSS Modules** - Component styles
- **CSS Variables** - Theme system
- **Tailwind CSS** - Utility styles (optional)

### State Management
- **Zustand** - Global state
- **React Context** - App-level state
- **React Query** - Server state

### Authentication
- **NextAuth.js** - Session management
- **JWT** - Token-based auth

### Internationalization
- **next-intl** - Multi-language support
- **Uzbek & Russian** - Supported locales

### API Communication
- **Axios** - HTTP client
- **Interceptors** - Auto token injection

### Form Handling
- **Zod** - Schema validation
- **React Hook Form** - Form state (optional)

### Testing
- **Jest** - Unit testing
- **Vitest** - Fast unit testing
- **React Testing Library** - Component testing

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## Key Features

### ✨ User Features
- Product catalog with advanced filtering
- Shopping cart functionality
- Order management
- Payment integration (Payme, Click)
- User accounts & profiles
- Wishlist/favorites
- Notifications
- Scent profile personalization
- Multi-language support

### 🔐 Security
- NextAuth.js authentication
- JWT token management
- CSRF protection
- Secure cookie handling
- Role-based access control

### 📱 Responsive Design
- Mobile-first approach
- Tablet & desktop views
- Touch-friendly interface
- Performance optimized

### 🌍 Internationalization
- Uzbek (uz) language
- Russian (ru) language
- Dynamic locale switching
- Locale-aware formatting

### 🎨 Theming
- Light & Dark modes
- CSS Variables for theming
- System preference detection
- Persistent theme storage

## Component Architecture

### Layout Components
- `Navbar` - Header with navigation
- `Footer` - Footer with links
- `MobileMenu` - Mobile navigation
- `AccountSidebar` - Account navigation

### UI Components
- `Button` - Primary, secondary, danger variants
- `Input` - Text input with validation
- `Select` - Dropdown selection
- `Modal` - Dialog boxes
- `Toast` - Notifications
- `Badge` - Status indicators

### Feature Components
- `ProductCard` - Product display
- `ProductGallery` - Image carousel
- `FilterPanel` - Advanced filtering
- `CartItem` - Shopping cart item
- `OrderCard` - Order display
- `AddressCard` - Address display

## Hooks

### Data Fetching
- `useProducts` - Get products list
- `useProduct` - Get single product
- `useOrders` - Get user orders
- `useAddresses` - Manage addresses

### State Management
- `useAuth` - Authentication state
- `useCart` - Shopping cart state
- `useTheme` - Theme management

### Utilities
- `useLocalStorage` - Local storage hook
- `useMediaQuery` - Media query detection
- `useDebounce` - Debounce values

## API Integration

Base URL: `http://localhost:5000/api`

Authentication: Bearer token in headers

Example:
```typescript
const response = await api.get('/products', {
  params: { page: 1, limit: 20 }
});
```

## Development Tips

### Hot Module Replacement
Changes are automatically reflected without full reload

### TypeScript Support
Full IntelliSense for all APIs and components

### Performance
- Image optimization with Next.js Image
- Code splitting with dynamic imports
- CSS optimization with SCSS modules
- Bundle analysis available

### Debugging
```bash
NODE_OPTIONS='--inspect' pnpm dev
```

Visit chrome://inspect for DevTools

## Best Practices

1. **Use TypeScript** - Type all components and functions
2. **Component Isolation** - Self-contained components
3. **SCSS Modules** - Scoped component styles
4. **Custom Hooks** - Reusable logic
5. **Error Handling** - Proper error boundaries
6. **Loading States** - Always show loading UI
7. **Accessibility** - ARIA labels, semantic HTML
8. **Performance** - Lazy loading, memoization

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t beb-frontend .
docker run -p 3000:3000 beb-frontend
```

### Self-Hosted
```bash
npm run build
npm start
```

## Troubleshooting

### Port 3000 already in use
```bash
pnpm dev -p 3001
```

### Clear cache
```bash
rm -rf .next
pnpm dev
```

### Module not found errors
```bash
rm -rf node_modules
pnpm install
```

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/name`
4. Create Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, contact: support@bebfragrance.uz

## Team

- Frontend: React/Next.js developers
- Backend: Node.js/Express developers
- Design: UI/UX designers

## Changelog

### Version 1.0.0 (2026-06-13)
- Initial release
- Product catalog
- Shopping cart
- Authentication
- Payment integration
- Order management
- User profiles
- Multi-language support
- Dark mode support
