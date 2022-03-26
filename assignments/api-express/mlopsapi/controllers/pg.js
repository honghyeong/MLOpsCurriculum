var express = require("express");
const { Client } = require("pg");
const Query = require("pg").Query;

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;
/*
DB Connect
*/

const client = new Client({
  // user: USER,
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME, // dbname 환경변수 에러 ? Why?
  password: DB_PASSWORD,
  port: DB_PORT,
});

const initQuery = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,  
      name varchar UNIQUE NOT NULL,
      age int NOT NULL
  );`;

const init = async (query) => {
  try {
    await client.connect();
    await client.query(query);
    return true;
  } catch (error) {
    console.log(error.stack);
    return false;
  }
};

init(initQuery).then((result) => {
  if (result) {
    console.log("Table created");
  }
});
/*
 * 1. GET all users
 */

const getUsers = async function (req, res) {
  const query = new Query("SELECT * FROM users");
  //   console.log(query);
  client.query(query);

  const rows = [];
  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    console.log("query done");
    res.send(rows);
    res.status(200).end();
  });

  query.on("error", (err) => {
    console.error(err.stack);
    res.send({ success: false, error: err.message });
    res.status(404);
  });
};

// /*
//  * 2. GET a user
//  */

const getUser = async function (req, res, next) {
  const userId = parseInt(req.params.id, 10);
  if (Number.isNaN(userId)) {
    return await res.status(400).end();
  }
  const query = new Query("SELECT * FROM users WHERE id=$1", [req.params.id]);
  client.query(query);

  const rows = [];

  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    if (rows.length === 0) {
      return res.status(404).end();
    }
    console.log("query done");
    res.status(200).send(rows[0]);
  });

  query.on("error", (err) => {
    return res.status(500).err(err);
  });
};

// /*
//  * 3. CREATE a user : id 자동 생성 필요
//  */

const createUser = async function (req, res) {
  const rows = [];
  if (!req.body.name || !req.body.age) {
    return await res.status(400).end();
  }

  const query = new Query(
    "insert into users(name,age) values($1,$2) RETURNING *",
    [req.body.name, parseInt(req.body.age)]
  );

  client.query(query);

  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    console.log("query done");
    res.status(201).send(rows[0]);
  });

  query.on("error", (err) => {
    if (err.constraint === "users_name_key") {
      console.log(err.constraint);
      return res.status(409).end();
    }
    return res.status(500).err(err);
  });
};

// /*
//  * 4. Update a users
//  * - id 없을때 에러메시지 필요
//  */

const updateUser = async function (req, res) {
  if (!req.body.name || !req.body.age) {
    return await res.status(400).end();
  }
  const rows = [];

  const query = new Query(
    "UPDATE users SET name=$1,age=$2 WHERE id=$3 RETURNING *",
    [req.body.name, req.body.age, req.params.id]
  );
  client.query(query);

  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    if (rows.length === 0) {
      return res.status(404).end();
    }
    res.status(200).send(rows[0]);
  });

  query.on("error", (err) => {
    if (err.constraint === "users_name_key") {
      return res.status(409).end();
    }
    res.status(500).end();
  });
};

// /*
//  * 5. Delete a users
//  * - id 없을때 에러메시지 필요
//  */

const deleteUser = async function (req, res) {
  const query = new Query("DELETE FROM users where id=$1 RETURNING *", [
    req.params.id,
  ]);

  const rows = [];

  client.query(query);

  query.on("row", (row) => {
    rows.push(row);
  });

  query.on("end", () => {
    if (rows.length === 0) {
      return res.status(404).end();
    } else {
      res.status(200).send(rows[0]);
    }
  });

  query.on("error", (err) => {
    return res.status(500).end();
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
