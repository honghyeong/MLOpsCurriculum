import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, age } = createUserDto;
    const newUser = new User();
    newUser.age = age;
    newUser.name = name;
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('The user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const target = await this.userRepository.findOne(id);
    if (!target) {
      throw new NotFoundException('The user is not found');
    }
    const { name, age } = updateUserDto;
    target.age = age;
    target.name = name;
    try {
      return await this.userRepository.save(target);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('The user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUser(id: number): Promise<User> {
    const target = await this.userRepository.findOne(id);
    if (!target) {
      throw new NotFoundException('The user is not found');
    }
    await this.userRepository.delete(id);
    return target;
  }
}
