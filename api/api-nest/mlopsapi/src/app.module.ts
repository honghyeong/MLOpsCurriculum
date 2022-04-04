import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
import { typeormConfig } from './configs/typeorm.config';
import { User } from './user/user.entity';
import * as cf from 'config';

config();
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
})
export class AppModule {}
