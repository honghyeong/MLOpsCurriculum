import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cf from 'config';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
const port = cf.get('service').port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
