FROM node:22-alpine AS builder
LABEL authors="luca"

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .
COPY ./prisma/ ./prisma/
COPY ./.env ./.env

RUN npx prisma generate

EXPOSE 3000

ENV NODE_ENV=production

ENTRYPOINT ["node", "build"]
