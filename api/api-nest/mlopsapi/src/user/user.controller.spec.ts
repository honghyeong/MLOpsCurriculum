import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

const mockUsers = [
  {
    name: 'sm1',
    age: 20,
  },
  {
    name: 'sm2',
    age: 21,
  },
  {
    name: 'sm3',
    age: 22,
  },
];

const mockUserRes = [
  {
    id: 1,
    name: 'sm1',
    age: 20,
  },
  {
    id: 2,
    name: 'sm2',
    age: 21,
  },
  {
    id: 3,
    name: 'sm3',
    age: 22,
  },
];

const userService = {
  findAll: jest.fn(),
  findUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};
describe('UserController', () => {
  let controller: UserController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /user', () => {
    it('should return all users', async () => {
      jest.spyOn(userService, 'findAll').mockImplementation(() => mockUserRes);

      const res = await controller.findAllUsers();

      expect(res).toEqual(mockUserRes);
    });
  });

  describe('GET /user/:id', () => {
    describe('success case', () => {
      it('should return a user with id, name, age', async () => {
        jest
          .spyOn(userService, 'findUserById')
          .mockImplementation(() => mockUserRes[0]);

        const res = await controller.findUser(1);
        expect(res).toEqual(mockUserRes[0]);
      });
    });

    describe('failure case', () => {
      it('should return 400 if id is not integer', async () => {
        jest
          .spyOn(userService, 'findUserById')
          .mockRejectedValue(new BadRequestException());

        expect(controller.findUser(parseInt('werew'))).rejects.toThrow(
          BadRequestException,
        );
      });
    });
  });

  describe('POST /user', () => {
    const user = { name: 'seokmin', age: 26 };
    const createdUser = { ...user, id: 4 };

    it('should return created user info with id, name, age', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);
      expect(await controller.createUser(user)).toEqual(createdUser);
    });

    it('should return 400 if name parameter is empty', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new BadRequestException());

      expect(controller.createUser({ name: '', age: 26 })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return 400 if age is not integer', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new BadRequestException());

      expect(controller.createUser({ name: 'sofef', age: 3 })).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
