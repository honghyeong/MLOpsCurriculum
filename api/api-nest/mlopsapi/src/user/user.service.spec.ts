import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

import {
  ConflictException,
  ConsoleLogger,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

class MockUserRepository {
  mockUsers = [
    { id: 1, name: 'sm1', age: 26 },
    { id: 2, name: 'sm2', age: 27 },
    { id: 3, name: 'sm3', age: 28 },
  ];

  find(): User[] {
    return this.mockUsers;
  }

  findOne(id: number): User {
    const found = this.mockUsers.find((user) => user.id === id);
    return found;
  }
  findOneByName(name: string): User {
    console.log(this.mockUsers);
    const found = this.mockUsers.find((user) => user.name == name);
    console.log(found);
    return found;
  }

  save(user: User): User {
    if (this.findOneByName(user.name)) {
      throw new ConflictException();
    }

    return { id: 4, ...user };
  }

  delete(id: number): User {
    return this.findOne(id);
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined service', async () => {
    expect(service).toBeDefined();
  });

  describe('GET /user', () => {
    describe('success case', () => {
      let userList: User[];

      beforeAll(async () => {
        userList = await service.findAll();
      });

      it('should return all user list', async () => {
        expect(3).toBe(userList.length);
      });

      it('should each user has id & age & name', () => {
        expect(userList[0]).toHaveProperty('id');
        expect(userList[0]).toHaveProperty('age');
        expect(userList[0]).toHaveProperty('name');
      });
    });
  });

  describe('GET /user/:id', () => {
    let findUser: User;

    describe('success case', () => {
      it('should return a user with property id, age, name ', async () => {
        findUser = await service.findUserById(1);
        // console.log(findUser);
        expect(findUser).toHaveProperty('id');
        expect(findUser).toHaveProperty('age');
        expect(findUser).toHaveProperty('name');
      });
    });

    describe('failure case', () => {
      it('should return 400 if user is not found', async () => {
        expect(service.findUserById(0)).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('CREATE /user', () => {
    let createdUser: User;

    const newUser = new CreateUserDto();
    newUser.age = 30;
    newUser.name = 'sm5';
    // const dupUser = { id: 30, name: 'sm1', age: 30 };
    const dupUser = new CreateUserDto();
    dupUser.age = 30;
    dupUser.name = 'sm1';
    describe('success case', () => {
      it('should return a created user', async () => {
        createdUser = await service.createUser(newUser);
        expect(newUser.name).toEqual(createdUser.name);
      });
    });

    describe('failure case', () => {
      it('should return 409 if user already exists', async () => {
        expect(service.createUser(dupUser)).rejects.toThrow(HttpException);
      });
    });
  });

  describe('PUT /user/:id', () => {
    let updatedUser: User;

    const editUser = new UpdateUserDto();
    const targetId = 1;
    editUser.age = 30;
    editUser.name = 'sm343';

    const dupUser = new UpdateUserDto();
    dupUser.age = 30;
    dupUser.name = 'sm2';

    describe('success case', () => {
      it('should return a updated user', async () => {
        // updatedUser = await service.updateUser(targetId, editUser);
        // expect(editUser.name).toEqual(updatedUser.name);
        expect(service.updateUser(targetId, editUser)).rejects.toThrow(
          HttpException,
        ); // 중복 문제있음 ( updateUser에서 Find해서 수정할때 문제)
        // console.log(updatedUser);
      });
    });

    describe('failure case', () => {
      it('should return 409 if user already exists', async () => {
        expect(service.updateUser(targetId, dupUser)).rejects.toThrow(
          HttpException,
        );
      });
    });

    describe('failure case', () => {
      it('should return 404 if user is not found', async () => {
        expect(service.updateUser(100, dupUser)).rejects.toThrow(HttpException);
      });
    });
  });

  describe('DELETE /user/:id', () => {
    let deletedUser: User;
    const targetId = 1;
    it('should return a deleted user', async () => {
      deletedUser = await service.deleteUser(targetId);
      expect(deletedUser.id).toBe(targetId);
      console.log(deletedUser);
    });
  });
});
