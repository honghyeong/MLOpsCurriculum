import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as cf from 'config';
import { User } from 'src/user/user.entity';

config();

const dbConfig = cf.get('db');

// console.log('dbConfig', dbConfig);
// console.log('env', process.env);

export const typeormConfig: TypeOrmModule = {
  type: 'postgres',
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  //   dropSchema: process.env.NODE_ENV === 'test',
  //   synchronize: process.env.NODE_ENV === 'test',
  synchronize: true,
  entities: [User],
};
