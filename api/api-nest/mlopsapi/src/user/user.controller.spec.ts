import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

class MockService {
  mockUsers = [];
}

describe('UserController', () => {
  let controller: UserController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  describe('GET /user', () => {
    it.todo('should return userService findAll()');
  });

  describe('GET /user/:id', () => {
    it.todo('should go to userService findAll()');
  });
});
