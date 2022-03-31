import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { fixtureCreator, TypeormFixtures } from 'typeorm-fixtures';
import { getRepository, Repository } from 'typeorm';
import exp from 'constants';

const mockUsers = [{ name: 'sm1' }, { name: 'sm2' }, { name: 'sm3' }];

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
  let repository: Repository<User>;
  let user: User;

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
    user = fixtures.entities.User.find((e) => true);
  });

  afterAll(async () => {
    await fixtures.dropFixtures();
  });

  it('should be defined service', async () => {
    expect(UserService).toBeDefined();
    // console.log(fixtures.entities.User);
    // console.log(fixtures.entities.User[1].name);
    // console.log(fixtures.entities.User[1].age);
  });

  // it('should be defined repository', async () => {
  //   let repository = await getRepository(User);
  //   expect(repository).toBeDefined();
  // });

  describe('GET /user', () => {
    it('should return all user list', () => {
      expect(3).toBe(fixtures.entities.User.length);
    });

    it('should each user has id & age', () => {
      expect(fixtures.entities.User[0]).toHaveProperty('id');
      expect(fixtures.entities.User[0]).toHaveProperty('age');
    });
  });
});
