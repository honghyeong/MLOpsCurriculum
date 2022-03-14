var express = require("express");
var router = express.Router();
const { Client } = require("pg");
const Query = require("pg").Query;

/*
 * .git ignore
 */
var client = new Client({
  user: "mlopscur",
  host: "localhost",
  database: "mlopscur",
  password: "mlopscur",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("success!");
  }
});

/*
 * 1. GET all users
 */

router.get("/user", function (req, res, next) {
  const query = new Query("SELECT * FROM users");
  //   console.log(query);
  client.query(query);

  var rows = [];
  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    if (rows.length === 0) {
      res.send({ success: false, error: "No Users" });
      res.status(404);
      return;
    }

    console.log("query done");
    res.send(rows);
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err.stack);
    res.send({ success: false, error: err.message });
    res.status(404);
  });
  // fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
  //   res.status(200).json(JSON.parse(data));
  // });
});

/*
 * 2. GET a user
 */

router.get("/user/:id", function (req, res, next) {
  const query = new Query("SELECT * FROM users WHERE id=$1", [req.params.id]);
  client.query(query);

  var rows = [];

  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    if (rows.length === 0) {
      res.send({ success: false, error: req.params.id + " does not exist" });
      res.status(404);
      return;
    }
    console.log("query done");
    res.send(rows[0]);
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err.stack);
    res.send({ success: false, error: err.message });
    res.status(404);
  });
});

/*
 * 3. CREATE a user : id 자동 생성 필요
 */

router.post("/user", function (req, res) {
  if (!req.body.name || !req.body.age) {
    res.send({ success: false, error: "wrong body" });
    res.status(400);
    return;
  }

  const query = new Query(
    "insert into users(name,age) values($1,$2) RETURNING *",
    [req.body.name, req.body.age]
  );

  client.query(query);

  query.on("row", (row) => {
    // rows.push(row);
  });

  query.on("end", () => {
    // console.log(rows);
    console.log("query done");
    res.send({ success: true });
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err.stack);
    res.send({ success: false, error: err.message });
    res.status(404).end();
  });
});

/*
 * 4. Update a users
 * - id 없을때 에러메시지 필요
 */

router.put("/user/:id", function (req, res) {
  if (!req.body.name || !req.body.age) {
    res.send({ success: false, error: "wrong body" });
    res.status(400);
    return;
  }

  const query = new Query(
    "UPDATE users SET name=$1,age=$2 WHERE id=$3 RETURNING id",
    [req.body.name, req.body.age, req.params.id]
  );

  console.log(result);
  query.on("row", (row) => {
    console.log(row);
  });

  query.on("end", () => {
    // console.log(rows);
    console.log("query done");
    res.send({ success: true });
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err.stack);
    res.send({ success: false, error: err.message });
    res.status(404).end();
  });
});

/*
 * 5. Delete a users
 * - id 없을때 에러메시지 필요
 */

router.delete("/user/:id", function (req, res) {
  const query = new Query("DELETE FROM users where id=$1", [req.params.id]);

  client.query(query);

  query.on("row", (row) => {});

  query.on("end", () => {
    console.log("query done");
    res.send({ success: true });
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err);
    res.send({ success: false, error: err.message });
    res.status(404).end();
  });
});

module.exports = router;