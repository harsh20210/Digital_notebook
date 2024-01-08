# FROM node:14-alpine as builder

# WORKDIR /

# COPY ./package.json .

# COPY ./package-lock.json .

# COPY . .

# RUN npm cache clean --force

# RUN rm -rf node_modules

# RUN npm i @emotion/react

# RUN npm ci

# CMD ["npm","start"]


FROM node:16-alpine as builder

WORKDIR /

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

CMD ["npm","start"]
