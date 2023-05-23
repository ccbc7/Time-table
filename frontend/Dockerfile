# FROM node:16-alpine
# WORKDIR /usr/src/app

FROM node:16-alpine
WORKDIR /usr/src/app

COPY frontend/app/package*.json ./

RUN yarn install

COPY frontend/app .
