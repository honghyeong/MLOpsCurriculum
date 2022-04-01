import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import * as request from 'supertest';
import { fixtureCreator, TypeormFixtures } from 'typeorm-fixtures';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
// import { AppModule } from 'src/app.module';

//  임시로 Entity PrimaryGeneratedColumn() => PrimaryColumn()
//  drop fixture해도 id값은 증가하는 문제가 있음
const mockUsers = [
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

export const createUserFixture = fixtureCreator<User>(
  User,
  function (entity, index) {
    return {
      age: index + 20,
      ...entity,
    };
  },
);

const typeormConfig = {
  url: 'postgres://postgres:postgres@localhost:5432/nest-mlops-api',
  synchronize: true,
  entities: [User],
};

const userFixture = createUserFixture(mockUsers);

const fixtures = new TypeormFixtures(false, {
  type: 'postgres',
  ...typeormConfig,
}).addFixture(userFixture);

describe('UserController & E2E testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ type: 'postgres', ...typeormConfig }),
        UserModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    await fixtures.loadFixtures();
  });

  afterAll(async () => {
    await fixtures.dropFixtures();
    await app.close();
  });

  it('should be defined controller', () => {
    expect(app).toBeDefined();
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
