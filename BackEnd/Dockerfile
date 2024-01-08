FROM node:alpine

WORKDIR /

COPY package-lock.json .

COPY package.json .

COPY . .

RUN npm ci

CMD ["node" , "./app.js"]