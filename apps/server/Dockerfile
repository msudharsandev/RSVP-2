FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . . 
RUN pnpm build

FROM node:20-alpine AS runtime

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/prisma/schema.prisma ./src/prisma/schema.prisma
COPY package.json ./
COPY start.sh ./

RUN pnpm install --prod
RUN apk add --no-cache openssl
RUN pnpm generate
RUN chmod +x /app/start.sh

ENV NODE_ENV=production

EXPOSE 8000

ENTRYPOINT ["/app/start.sh"]