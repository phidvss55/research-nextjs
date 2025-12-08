FROM node:24-alpine AS base

WORKDIR /build/app

ENV NODE_ENV=production

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn install  --frozen-lockfile

FROM base AS builder

COPY . .

RUN yarn run build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

ENV PORT=3000

COPY --from=builder /build/app/public ./public
COPY --from=builder /build/app/.next/standalone ./
COPY --from=builder /build/app/.next/static ./.next/static

CMD ["node", "server.js"]