import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cf from 'config';
import { config } from 'dotenv';
const port = cf.get('service').port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
