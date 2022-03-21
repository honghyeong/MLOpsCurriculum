const request = require("supertest");
const should = require("should");
const app = require("../app");

describe("GET /user", () => {
  describe("success case", () => {
    it("should return all the users", (done) => {
      request(app)
        .get("/user")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          res.body.should.have.lengthOf(4);
          done();
        });
    });
  });
});
