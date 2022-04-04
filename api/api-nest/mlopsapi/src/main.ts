import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cf from 'config';

const port = cf.get('service').port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
