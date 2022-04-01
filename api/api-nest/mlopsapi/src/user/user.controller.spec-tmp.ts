// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserController } from './user.controller';
// import { User } from './user.entity';
// import { UserService } from './user.service';

// export const createUserFixture = fixtureCreator<User>(
//   User,
//   function (entity, index) {
//     return {
//       age: index + 20,
//       ...entity,
//     };
//   },
// );

// const typeormConfig = {
//   url: 'postgres://postgres:postgres@localhost:5432/nest-mlops-api',
//   synchronize: true,
//   entities: [User],
// };

// const userFixture = createUserFixture([
//   {
//     name: 'sm1',
//   },
//   { name: 'sm2' },
//   {
//     name: 'sm3',
//   },
// ]);

// const fixtures = new TypeormFixtures(false, {
//   type: 'postgres',
//   ...typeormConfig,
// }).addFixture(userFixture);

// describe.only('UserController & E2E testing', () => {
//   let controller: UserController;
//   let service: UserService;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forRoot({ type: 'postgres', ...typeormConfig }),
//         UserModule,
//       ],
//       providers: [UserService],
//       controllers: [UserController],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined controller', () => {
//     expect(controller).toBeDefined();
//   });

//   // describe('GET /user', () => {
//   //   describe('success case', () => {
//   //     it.todo('should return all users');
//   //   });
//   // });

//   // describe('GET /user/:id', () => {
//   //   describe('success case', () => {
//   //     it.todo('should return a user with id, age, name property');
//   //   });

//   //   describe('failure case', () => {
//   //     it.todo('should return 400 if id is not number');
//   //     it.todo('should return 404 if user not found');
//   //   });
//   // });

//   // describe('CREATE /user', () => {
//   //   describe('success case', () => {
//   //     it.todo('should return a created user info with id, age, name property');
//   //   });

//   //   describe('failure case', () => {
//   //     it.todo('should return 400 if name paramter is empty');
//   //     it.todo('should return 400 if age is not integer');
//   //     it.todo('should return 409 if user already exists');
//   //   });
//   // });

//   // describe('PUT /user/:id', () => {
//   //   describe('success case', () => {
//   //     it.todo('should return a updated user info with id, age, name property');
//   //   });

//   //   describe('failure case', () => {
//   //     it.todo('should return 400 if name paramter is empty');
//   //     it.todo('should return 400 if invalid age');
//   //     it.todo('should return 409 if user already exists');
//   //     it.todo('should return 404 if user is not found');
//   //   });
//   // });

//   // describe('DELETE /user/:id', () => {
//   //   describe('success case', () => {
//   //     it.todo('should return a deleted user info with id, age, name property');
//   //   });

//   //   describe('failure case', () => {
//   //     it.todo('should return 400 if name paramter is not number');
//   //     it.todo('should return 404 if user is not found');
//   //   });
//   // });
// });
