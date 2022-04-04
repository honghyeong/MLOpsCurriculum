import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import * as request from 'supertest';
import { fixtureCreator, TypeormFixtures } from 'typeorm-fixtures';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import {
  Connection,
  Entity,
  EntityManager,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { clear } from 'console';

//  임시로 Entity PrimaryGeneratedColumn() => PrimaryColumn()
//  drop fixture해도 id값은 증가하는 문제가 있음 -> typeormConfig.dropSchema=true로 해결

/**
 * test data
 */

const mockUsers = [
  {
    // id: 1,
    name: 'sm1',
    age: 20,
  },
  {
    // id: 2,
    name: 'sm2',
    age: 21,
  },
  {
    // id: 3,
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

describe('E2E testing', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          ...typeormConfig,
          dropSchema: true,
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();

    app = module.createNestApplication();

    await fixtures.loadFixtures();
    await app.init();
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
      it('should return all users', () => {
        return request(app.getHttpServer())
          .get('/user')
          .expect(200)
          .expect(mockUserRes);
        // return request(app.getHttpServer()).get('/user').expect(200);
      });
    });
  });

  describe('GET /user/:id', () => {
    describe('success case', () => {
      it('should return a user with id, age, name property', () => {
        return request(app.getHttpServer())
          .get('/user/1')
          .expect(200)
          .expect(mockUserRes[0]); // db 환경 의존적
        // .expect(mockUsers[0].id!==undefined)
      });
    });

    describe('failure case', () => {
      it('should return 400 if id is not number', () => {
        return request(app.getHttpServer()).get('/user/one').expect(400);
      });
      it('should return 404 if user not found', () => {
        return request(app.getHttpServer()).get('/user/100').expect(404); // db 환경 의존적
      });
    });
  });

  describe('CREATE /user', () => {
    describe('success case', () => {
      it('should return a created user info with id, age, name property', () => {
        return request(app.getHttpServer())
          .post('/user')
          .send({ name: 'ba3o', age: 30 }) // db 환경 의존적임
          .expect(201)
          .expect({ id: 4, name: 'ba3o', age: 30 });
      });
    });

    describe('failure case', () => {
      it('should return 400 if name paramter is empty', () => {
        return request(app.getHttpServer())
          .post('/user')
          .send({ age: 30 })
          .expect(400);
      });
      it('should return 400 if age is not integer', () => {
        return request(app.getHttpServer())
          .post('/user')
          .send({ age: 'one' })
          .expect(400);
      });
      it('should return 409 if user already exists', () => {
        return request(app.getHttpServer())
          .post('/user')
          .send({ name: 'sm1', age: 30 })
          .expect(409);
      });
    });
  });

  describe('PUT /user/:id', () => {
    describe('success case', () => {
      it('should return 200 if update success', () => {
        return request(app.getHttpServer())
          .put('/user/1')
          .send({ name: 'babo', age: 30 })
          .expect(200)
          .expect({ id: 1, name: 'babo', age: 30 });
      });
    });

    describe('failure case', () => {
      it('should return 400 if name paramter is empty', () => {
        return request(app.getHttpServer())
          .put('/user/1')
          .send({ age: 34 })
          .expect(400);
      });
      it('should return 400 if invalid age', () => {
        return request(app.getHttpServer())
          .put('/user/1')
          .send({ age: 'one' })
          .expect(400);
      });
      // 🚨
      it('should return 409 if user already exists', () => {
        return request(app.getHttpServer())
          .put('/user/1')
          .send({ name: 'sm2', age: 30 })
          .expect(409);
      });
      it('should return 404 if user is not found', () => {
        return request(app.getHttpServer())
          .put('/user/300')
          .send({ name: 'sm300', age: 30 })
          .expect(404);
      });
    });
  });

  describe('DELETE /user/:id', () => {
    describe('success case', () => {
      it('should return a deleted user info with id, age, name property', () => {
        return request(app.getHttpServer())
          .delete('/user/3')
          .expect(200)
          .expect(mockUserRes[2]);
      });
    });

    describe('failure case', () => {
      it('should return 400 if name paramter is not number', () => {
        return request(app.getHttpServer()).delete('/user/one').expect(400);
      });
      it('should return 404 if user is not found', () => {
        return request(app.getHttpServer()).delete('/user/999').expect(404);
      });
    });
  });
});
