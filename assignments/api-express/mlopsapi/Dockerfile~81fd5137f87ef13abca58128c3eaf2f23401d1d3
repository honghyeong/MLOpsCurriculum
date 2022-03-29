# express server dockerfile
FROM node:14-alpine

# workdir
WORKDIR /app

# package config
COPY *.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]