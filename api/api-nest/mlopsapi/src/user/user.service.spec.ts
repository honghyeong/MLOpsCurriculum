import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { fixtureCreator, TypeormFixtures } from 'typeorm-fixtures';
// class MockRepository {
//   async findAll(): Promise<User[]> {
//     const user1: User = new User();
//     user1.name = 'sm1';
//     user1.age = 30;
//     const user2: User = new User();
//     user2.name = 'sm1';
//     user2.age = 30;
//     const userList = [];
//     userList.push(user2);
//     userList.push(user1);
//     return userList;
//   }
// }

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

export const userFixture = createUserFixture([
  {
    id: 1,
  },
  {
    id: 2,
  },
]);

//
// const typeormConfig = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'nest-mlops-api',
//   entities: [User],
//   synchronize: true,
// };

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
  });

  describe('GET /user', () => {
    it('should return all users', async () => {});
  });
});
