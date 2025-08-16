FROM node:24-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

RUN yarn global add typescript

COPY . .

RUN tsc

EXPOSE 4000

CMD ["node", "dist/src/server.js"]