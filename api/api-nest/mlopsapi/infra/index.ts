// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

// Get the password to use for Redis from config.
const config = new pulumi.Config();
// const pgPassword = config.require("redisPassword");
const pgPassword = config.require('pgPassword');
// const pgPassword = 1234;
const pgPort = 5432;

const cluster = new awsx.ecs.Cluster('mlops');
// The data layer for the application
// Use the 'image' property to point to a pre-built Docker image.
const pgListener = new awsx.elasticloadbalancingv2.NetworkListener('db', {
  port: pgPort,
});
const pgCache = new awsx.ecs.FargateService('db', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      db: {
        image: 'postgres',
        memory: 512,
        // portMappings: [pgListener],
        portMappings: [pgListener],
        environment: [
          {
            name: 'POSTGRES_DB',
            value: 'mlops',
          },
          {
            name: 'POSTGRES_PASSWORD',
            value: pgPassword,
          },
          {
            name: 'POSTGRES_USER',
            value: 'seokmin',
          },
        ],
      },
    },
  },
});

const pgEndpoint = pgListener.endpoint;

// A custom container for the frontend, which is a Python Flask app
// Use the 'build' property to specify a folder that contains a Dockerfile.
// Pulumi builds the container for you and pushes to an ECR registry
const backendListener = new awsx.elasticloadbalancingv2.NetworkListener(
  'backend',
  { port: 3000 },
);
const backEnd = new awsx.ecs.FargateService('backend', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      backend: {
        image:
          '499340242396.dkr.ecr.ap-northeast-2.amazonaws.com/nest-mlops-server', // path to the folder containing the Dockerfile
        cpu: 256,
        memory: 512,
        portMappings: [backendListener],
        // environment: redisEndpoint.apply((e) => [
        //   { name: "REDIS", value: e.hostname },
        //   { name: "REDIS_PORT", value: e.port.toString() },
        //   { name: "REDIS_PWD", value: redisPassword },
        // ]),
        environment: pgEndpoint.apply((e) => [
          {
            name: 'DB_HOST',
            // value: "db",
            value: e.hostname,
          },
          {
            name: 'DB_NAME',
            value: 'mlops',
          },
          {
            name: 'DB_PASSWORD',
            value: pgPassword,
          },
          {
            name: 'DB_PORT',
            value: e.port.toString(),
          },
          {
            name: 'DB_USERNAME',
            value: 'seokmin',
          },
        ]),
      },
    },
  },
});

// Export a variable that will be displayed during 'pulumi up'
export let backendURL = backendListener.endpoint;
