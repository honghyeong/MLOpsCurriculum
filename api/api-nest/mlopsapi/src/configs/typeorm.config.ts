import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as cf from 'config';
import { User } from 'src/user/user.entity';

config();

const dbConfig = cf.get('db');

export const typeormConfig: TypeOrmModule = {
  type: dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [User],
  synchronize: true,
};
