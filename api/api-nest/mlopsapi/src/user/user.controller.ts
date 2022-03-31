import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
      console.log(error.stack);
      console.log(error);
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
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
