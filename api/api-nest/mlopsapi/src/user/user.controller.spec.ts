import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe.only('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined controller', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /user', () => {
    describe('success case', () => {
      it.todo('should return all users');
    });
  });

  describe('GET /user/:id', () => {
    describe('success case', () => {
      it.todo('should return a user with id, age, name property');
    });

    describe('failure case', () => {
      it.todo('should return 400 if id is not number');
      it.todo('should return 404 if user not found');
    });
  });

  describe('CREATE /user', () => {
    describe('success case', () => {
      it.todo('should return a created user info with id, age, name property');
    });

    describe('failure case', () => {
      it.todo('should return 400 if name paramter is empty');
      it.todo('should return 400 if age is not integer');
      it.todo('should return 409 if user already exists');
    });
  });

  describe('PUT /user/:id', () => {
    describe('success case', () => {
      it.todo('should return a updated user info with id, age, name property');
    });

    describe('failure case', () => {
      it.todo('should return 400 if name paramter is empty');
      it.todo('should return 400 if invalid age');
      it.todo('should return 409 if user already exists');
      it.todo('should return 404 if user is not found');
    });
  });

  describe('DELETE /user/:id', () => {
    describe('success case', () => {
      it.todo('should return a deleted user info with id, age, name property');
    });

    describe('failure case', () => {
      it.todo('should return 400 if name paramter is not number');
      it.todo('should return 404 if user is not found');
    });
  });
});
