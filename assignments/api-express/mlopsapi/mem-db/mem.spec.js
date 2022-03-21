const request = require("supertest");
const should = require("should");
const app = require("../app");

/*
1. GET all users
*/

describe("GET /user", () => {
  describe("success case", () => {
    it("should return all the users", (done) => {
      request(app)
        .get("/user")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
});

/*
2. GET a user
*/

describe("GET /user/:id", () => {
  describe("success case", () => {
    it("should return a user", (done) => {
      request(app)
        .get("/user/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1); // hard
          done();
        });
    });
  });

  describe("failure case", () => {
    it("should return 400 if id is not Number", (done) => {
      request(app).get("/user/one").expect(400).end(done);
    });
    it("should return 404 if id not found ", (done) => {
      request(app).get("/user/5").expect(404).end(done);
    });
  });
});

/*
3. Create a User
*/

describe("POST /user", () => {
  describe("success case", () => {
    const name = "seokmin";
    const age = 26;
    let body;
    before((done) => {
      request(app)
        .post("/user")
        .send({ name, age })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("should return created user id", () => {
      body.should.have.property("id"); // hard
    });
    it("should return created user name", () => {
      body.should.have.property("name", name);
    });
    it("should return created user age", () => {
      body.should.have.property("age", age);
    });
  });

  describe.only("failure case", () => {
    it("should return 409 if name already exists", (done) => {
      request(app)
        .post("/user")
        .send({ name: "sm", age: 26 })
        .expect(409)
        .end(done);
    });
    it("should return 400 if name not in req ", (done) => {
      request(app).post("/user").send({ age: 27 }).expect(400).end(done);
    });
    it("should return 400 if age not in req ", (done) => {
      request(app)
        .post("/user")
        .send({ name: "seokmin" })
        .expect(400)
        .end(done);
    });
  });
});
