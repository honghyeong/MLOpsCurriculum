FROM node:14-alpine
WORKDIR /app

COPY *.json ./

RUN npm install
RUN apk update && apk add bash

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]