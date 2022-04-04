import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
import { typeormConfig } from './configs/typeorm.config';

console.log(process.env);
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
})
export class AppModule {}
