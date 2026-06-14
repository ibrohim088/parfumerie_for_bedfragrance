FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json ./
COPY ../../package.json ../../tsconfig.base.json ../../
COPY ../../packages/shared ./packages/shared
RUN npm install

# Build
FROM deps AS builder
COPY . .
RUN npm run db:generate
RUN npm run build

# Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/prisma ./src/prisma

EXPOSE 4000

CMD ["node", "dist/server.js"]
