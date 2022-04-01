import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

import { NotFoundException } from '@nestjs/common';
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
    try {
      const found = this.mockUsers.find((user) => user.id === id);
      return found;
    } catch (error) {
      throw new NotFoundException('The user is not found'); // 😅  맞는 위치일까요 ?
    }
  }

  save(user: User): User {
    return user;
  }

  delete(id: number): void {}
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
  });

  describe('CREATE /user', () => {
    let createdUser: User;

    const newUser = new CreateUserDto();
    newUser.age = 30;
    newUser.name = 'sm5';
    // const dupUser = { id: 30, name: 'sm1', age: 30 };

    describe('success case', () => {
      it('should return a created user', async () => {
        createdUser = await service.createUser(newUser);
        // console.log(createdUser);
        expect(newUser.name).toEqual(createdUser.name);
      });
    });
  });

  describe('PUT /user/:id', () => {
    let updatedUser: User;

    const editUser = new UpdateUserDto();
    const targetId = 1;
    editUser.age = 30;
    editUser.name = 'sm6';
    // const dupUser = { id: 30, name: 'sm1', age: 30 };

    describe('success case', () => {
      it('should return a updated user', async () => {
        updatedUser = await service.updateUser(targetId, editUser);
        expect(editUser.name).toEqual(updatedUser.name);
        // console.log(updatedUser);
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
