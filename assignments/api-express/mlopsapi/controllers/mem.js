const { resolveSoa } = require("dns");
var express = require("express");
var router = express.Router();
var fs = require("fs");
const LOCAL_DB = "/user.json";

/*
 * 1. GET all users
 */

const getUsers = function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", async function (err, data) {
    if (err) {
      return await res.status(400).end();
    }
    res.status(200).json(JSON.parse(data));
  });
};

/*
 * 2. GET a user
 */

const getUser = function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", async function (err, data) {
    const userId = parseInt(req.params.id);
    if (Number.isNaN(userId)) {
      return await res.status(400).end();
    }
    const users = JSON.parse(data);
    const findUser = users.find((u) => u.id === userId);
    if (!findUser) {
      return await res.status(404).end();
    }
    res.status(200).send(findUser);
  });
};

/*
 * 3. CREATE a user
 */

const createUser = function (req, res) {
  if (!req.body["age"] || !req.body["name"]) {
    return res.status(400).end();
  }

  fs.readFile(__dirname + LOCAL_DB, "utf8", async function (err, data) {
    const users = JSON.parse(data);
    // auto increment id
    const count = users[users.length - 1].id + 1;
    const newUser = { id: count, ...req.body };
    const newUserList = users.concat(newUser);

    const nameDupCheck = users.find((u) => u.name == req.body["name"]);
    if (nameDupCheck) {
      return res.status(409).end();
    }

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      async function (err, data) {
        if (err) {
          return await res.status(500).end();
        }
        res.send(newUser);
      }
    );
  });
};

/*
 * 4. Update a users
 */

const updateUser = function (req, res) {
  if (!req.body["name"] || !req.body["age"]) {
    return res.status(400).end();
  }
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(400).end();
    }
    let findUser = users.find((u) => u.id === userId);
    if (!findUser) {
      return res.status(404).end();
    }

    const nameDupCheck = users.find((u) => u.name === req.body["name"]);
    if (nameDupCheck) {
      return res.status(409).end();
    }

    findUser.name = req.body["name"];
    findUser.age = req.body["age"];

    const newUserList = users.map((u) => {
      if (u.id === userId) {
        return findUser;
      }
      return u;
    });

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      async function (err, data) {
        if (err) {
          return await res.status(500).end();
        }

        return res.status(200).json(findUser);
      }
    );
  });
};

/*
 * 5. Delete a users
 */

const deleteUser = function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(400).end();
    }
    const findUser = users.find((u) => u.id === userId);
    if (!findUser) {
      return res.status(404).end();
    }
    console.log(findUser);
    const newUserList = users.filter((u) => u.id !== userId);

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      async function (err, data) {
        if (err) {
          return await res.status(500).end();
        }

        res.status(200).json(findUser);
      }
    );
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
