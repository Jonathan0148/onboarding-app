FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Instala TypeScript (para compilar next.config.ts)
RUN npm install typescript --save-dev

# Copia el código fuente
COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

RUN npm install --omit=dev

USER app

EXPOSE 3000
CMD ["npm", "start"]
