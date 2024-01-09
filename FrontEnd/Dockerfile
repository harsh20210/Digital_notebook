FROM node:16-alpine as builder

WORKDIR /

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

CMD ["npm","start"]
