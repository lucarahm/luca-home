FROM node:22-alpine
LABEL authors="luca"

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "build"]