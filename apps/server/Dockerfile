FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm i

COPY . . 
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json ./
RUN npm i --omit=dev

ENV NODE_ENV=production

EXPOSE 8000

CMD ["node", "dist/app.js"]
