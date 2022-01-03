FROM node:14.17.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY .eslintrc.js /app

RUN npm install

COPY . /app

CMD ["npm", "start"]