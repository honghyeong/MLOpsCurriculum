const pgp = require("pg-promise");

class UserModel {
  constructor() {
    this.db = pgp("postgres://mlopscur:mlopscur@localhost:5432/mlopscur");
  }
  create(user) {
    let name = user.name;
    let age = user.age;

    return this.db.any(
      "INSERT INTO user(name,age) VALUES($1,$2) RETURNING id",
      [name, age]
    );
  }

  readAll() {
    return this.db.any("SELECT * FROM user");
  }

  read(id) {
    return this.db.any("SELECT * FROM user WHERE id=$1", [id]);
  }

  update(id, user) {
    let name = user.name;
    let age = user.age;

    return this.db.any(
      "UPDATE user SET name=$1, age=$2 WHERE id=$3 RETURNING id",
      [name, age, id]
    );
  }

  delete(id) {
    return this.db.any("DELETE FROM user WHERE id=$1 RETURNING id", [id]);
  }
}

module.exports = UserModel;
