FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git

RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build

FROM nginx:1.27.0-alpine

COPY --from=builder /app/_site /usr/share/nginx/html
