# ** ECS M1 problem **
# M1 자동 빌드 architecture : docker inspect <image_name> : arm64
# docker buildx build --platform=linux/amd64 -t <tag> . 
# amd64 architecture로 build하고 ECR에 push하여 ECS에 사용해야함.

FROM postgres

EXPOSE 5432

COPY ./init.sql /docker-entrypoint-initdb.d/
