
# ** ECS M1 problem **
# M1 자동 빌드 architecture : docker inspect <image_name> : arm64
# docker buildx build --platform=linux/amd64 -t <tag> . 
# amd64 architecture로 build하고 ECR에 push하여 ECS에 사용해야함

FROM node:14-alpine
WORKDIR /usr/src/app

COPY *.json ./
RUN npm install
RUN apk update && apk add bash

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]
