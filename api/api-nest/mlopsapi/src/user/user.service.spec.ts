import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { fixtureCreator, TypeormFixtures } from 'typeorm-fixtures';
import { getRepository, Repository } from 'typeorm';
import exp from 'constants';
import { NotFoundError } from 'rxjs';
import { createCipheriv } from 'crypto';

const mockUsers = [
  { id: 1, name: 'sm1' },
  { id: 2, name: 'sm2' },
  { id: 3, name: 'sm3' },
];

export const createUserFixture = fixtureCreator<User>(
  User,
  function (entity, index) {
    return {
      name: `user${index}`,
      age: index,
      ...entity,
    };
  },
);

export const userFixture = createUserFixture(mockUsers);

const typeormConfig = {
  url: 'postgres://postgres:postgres@localhost:5432/nest-mlops-api',
  synchronize: true,
  entities: [User],
};

const fixtures = new TypeormFixtures(false, {
  type: 'postgres',
  ...typeormConfig,
}).addFixture(userFixture);

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'nest-mlops-api',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    await fixtures.loadFixtures();
  });

  // afterAll(async () => {
  //   await fixtures.dropFixtures();
  // });

  it('should be defined service', async () => {
    expect(service).toBeDefined();
    service.findAll().then(console.log);
    // console.log(userService.findAll().then((user) => console.log(user)));
    // console.log(fixtures.entities.User);
    // console.log(fixtures.entities.User[1].name);
    // console.log(fixtures.entities.User[1].age);
  });

  describe('GET /user', () => {
    describe('success case', () => {
      let userList: User[];

      beforeAll(async () => {
        userList = await service.findAll();
      });

      it('should return all user list', async () => {
        expect(mockUsers.length).toBe(userList.length);
      });

      it('should each user has id & age & name', () => {
        expect(userList[0]).toHaveProperty('id');
        expect(userList[0]).toHaveProperty('age');
        expect(userList[0]).toHaveProperty('name');
      });
    });
  });

  describe.only('GET /user/:id', () => {
    let findUser: User;

    describe('success case', () => {
      it('should return a user with property id, age, name ', async () => {
        findUser = await service.findOneById(1);
        console.log(findUser);
        expect(findUser).toHaveProperty('id');
        expect(findUser).toHaveProperty('age');
        expect(findUser).toHaveProperty('name');
      });
    });
  });
});
