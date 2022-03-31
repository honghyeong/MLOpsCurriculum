import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

const typeormConfig = {
  url: 'postgres://postgres:postgres@localhost:5432/nest-mlops-api',
  synchronize: true,
  entities: [User],
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[TypeOrmModule.forRoot(typeormConfig),UserService]
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});

// export const createUserFixture = fixtureCreator<User>(
//   User,
//   function (entity, index) {
//     return {
//       name: `user${index}`,
//       age: index,
//       ...entity,
//     };
//   },
// );

// export const userFixture = createUserFixture(mockUsers);

// const typeormConfig = {
//   url: 'postgres://postgres:postgres@localhost:5432/nest-mlops-api',
//   synchronize: true,
//   entities: [User],
// };

// const fixtures = new TypeormFixtures(false, {
//   type: 'postgres',
//   ...typeormConfig,
// }).addFixture(userFixture);

// describe('UserService', () => {
//   let service: UserService;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     await fixtures.loadFixtures();
//   });
