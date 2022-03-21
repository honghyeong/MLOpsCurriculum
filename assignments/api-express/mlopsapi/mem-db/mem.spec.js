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
          res.body.should.have.property("id", 1);
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
