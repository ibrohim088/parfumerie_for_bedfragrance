# @beb/bot — Telegram Bot

Telegram bot for BEB Fragrance built with **Telegraf**. Serves as an alternative storefront via Telegram Web App and handles order notifications.

---

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript
- **Framework:** Telegraf v4
- **Validation:** Zod
- **HTTP:** Axios (communicates with backend API)
- **i18n:** Built-in uz / ru locale files

---

## File Structure

```
apps/bot/
├── src/
│   ├── index.ts                  # Bot entry point — registers all handlers
│   │
│   ├── config/
│   │   ├── bot.ts                # Telegraf bot instance + session setup
│   │   └── env.ts                # Env variable validation (Zod)
│   │
│   ├── handlers/                 # Telegram command & event handlers
│   │   ├── startHandler.ts       # /start command
│   │   ├── menuHandler.ts        # Main menu navigation
│   │   ├── catalogHandler.ts     # Product catalog browsing
│   │   ├── ordersHandler.ts      # User orders list
│   │   ├── paymentHandler.ts     # Payment flow
│   │   ├── contactHandler.ts     # Phone number / contact sharing
│   │   └── webAppHandler.ts      # Telegram Web App open/close events
│   │
│   ├── keyboards/                # Inline & reply keyboard builders
│   │   ├── mainKeyboard.ts       # Main menu keyboard
│   │   ├── authKeyboard.ts       # Login / register keyboard
│   │   ├── paymentKeyboard.ts    # Payment options keyboard
│   │   └── webAppKeyboard.ts     # Web App launch button
│   │
│   ├── middleware/               # Telegraf middleware
│   │   ├── authMiddleware.ts     # Check if user is registered in backend
│   │   ├── adminMiddleware.ts    # Restrict admin-only commands
│   │   └── languageMiddleware.ts # Detect and apply user language (uz/ru)
│   │
│   ├── scenes/                   # Telegraf Scenes (multi-step flows)
│   │   ├── authScene.ts          # OTP-based authentication scene
│   │   └── profileScene.ts       # Profile update scene
│   │
│   ├── services/                 # Business logic / API calls
│   │   ├── apiService.ts         # Axios wrapper for backend API
│   │   ├── notifyService.ts      # Send notifications to admin/users
│   │   └── sessionService.ts     # Session state management
│   │
│   ├── i18n/
│   │   ├── uz.ts                 # Uzbek translations
│   │   └── ru.ts                 # Russian translations
│   │
│   ├── types/
│   │   ├── context.ts            # Extended Telegraf context type
│   │   └── session.ts            # Session data interface
│   │
│   └── utils/
│       ├── format.ts             # Text formatting helpers
│       └── logger.ts             # Logger instance
│
├── Dockerfile
├── .env
└── package.json
```

---

## NPM Scripts

| Command              | Description                                              |
|----------------------|----------------------------------------------------------|
| `npm run dev`        | Start bot in watch mode (nodemon + ts-node, auto-restart)|
| `npm run build`      | Compile TypeScript → `dist/`                             |
| `npm run start`      | Run compiled production build (`dist/index.js`)          |
| `npm run type-check` | TypeScript check (no emit)                               |

---

## Environment Variables

Create `apps/bot/.env`:

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
ADMIN_CHAT_ID=your_telegram_chat_id

# Frontend URL (must be HTTPS for Telegram Web App buttons in production)
WEBAPP_URL=http://localhost:3000

# Backend API
API_BASE_URL=http://localhost:4000/api
BACKEND_URL=http://localhost:4000

# Database & Redis (if bot accesses them directly)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/beb_fragrance
REDIS_URL=redis://localhost:6379

NODE_ENV=development
```

> **Important:** `WEBAPP_URL` must be a valid **HTTPS** URL for Telegram Web App buttons to work. Use [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to expose `localhost:3000` over HTTPS during development.

---

## Running Locally

```bash
# From bot directory
cd apps/bot

# Start in development (watch mode)
npm run dev
```

Or from the root to run all apps together:

```bash
npm run dev
```

The bot uses **long polling** by default — no webhook setup needed for local development.

---

## Bot Features

| Feature              | Description                                              |
|----------------------|----------------------------------------------------------|
| `/start`             | Welcome message + language selection                     |
| Main menu            | Navigate catalog, orders, profile                        |
| Auth scene           | OTP-based phone number verification                      |
| Catalog              | Browse products via backend API                          |
| Orders               | View user's order history                                |
| Web App              | Open the full storefront as a Telegram Mini App          |
| Payments             | Initiate Payme / Click payment from bot                  |
| Notifications        | Admin receives new order alerts via `ADMIN_CHAT_ID`      |
| i18n                 | Uzbek and Russian language support                       |

---

## Setting up the Bot Token

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Run `/newbot` and follow the prompts
3. Copy the token and set `TELEGRAM_BOT_TOKEN` in `.env`
4. Set your Telegram user ID as `ADMIN_CHAT_ID` (get it from [@userinfobot](https://t.me/userinfobot))