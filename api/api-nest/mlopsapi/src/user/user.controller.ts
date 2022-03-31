import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('/')
  // findAllUsers(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  // @Get()
}

// imports: [
//   TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
//     database: 'nest-mlops-api',
//     entities: [User],
//     synchronize: true,
//   }),
//   TypeOrmModule.forFeature([User]),
// ],
