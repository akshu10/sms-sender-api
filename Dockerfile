FROM node:16-alpine

WORKDIR /usr/app

COPY ./src ./src
COPY tsconfig.json ./
COPY yarn.lock ./
COPY package.json ./

RUN yarn install
RUN yarn build

WORKDIR /usr/app/build

EXPOSE 5000
CMD node server.js
