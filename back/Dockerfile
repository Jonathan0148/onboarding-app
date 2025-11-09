# 🧱 Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiamos los archivos base y las dependencias
COPY package*.json ./
RUN npm ci

# Copiamos todo el código fuente
COPY . .

# Compilamos NestJS (esto genera la carpeta dist/)
RUN npm run build

# 🧩 Etapa 2: Producción
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copiamos solo los archivos necesarios desde la etapa builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Instalamos solo las dependencias de producción
RUN npm ci --omit=dev

EXPOSE 3000

# Comando final — ejecutar la app ya compilada
CMD ["node", "dist/src/main.js"]
