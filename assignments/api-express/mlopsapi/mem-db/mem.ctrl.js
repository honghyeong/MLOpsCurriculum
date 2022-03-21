var express = require("express");
var router = express.Router();
var fs = require("fs");
const LOCAL_DB = "/../data/user.json";
/*
 * 1. GET all users
 */

router.get("/user", function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    if (err) {
      res.status(400);
      res.send(err.message);
    }
    res.status(200).send(JSON.parse(data));
  });
});

/*
 * 2. GET a user
 */

router.get("/user/:id", function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    const userId = req.params.id;
    const users = JSON.parse(data);
    const findUser = users.find((u) => u.id == userId);
    if (!findUser) {
      res.status(404).send({
        success: false,
        message: userId + " does not exist",
      });
      return;
    }
    if (err) {
      res.status(400).send(err.message);
    }

    res.status(200).send(findUser);
  });
});

/*
 * 3. CREATE a user
 */

router.post("/user/", function (req, res) {
  const result = {};
  if (!req.body["age"] || !req.body["name"]) {
    res.status(400).json({
      success: false,
    });
    return;
  }

  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    // ADD
    const users = JSON.parse(data);
    console.log(users.length);
    const count = users[users.length - 1].id + 1;
    const newUser = { id: count, ...req.body };
    const newUserList = users.concat(newUser);
    const empty = [];
    console.log(typeof empty);
    const nameDupCheck = users.find((u) => u.name == req.body["name"]);
    if (nameDupCheck) {
      res.status(400).json({
        success: false,
        error: req.body["name"] + " name already exists",
      });
      return;
    }

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      function (err, data) {
        res.status(200).json({
          success: true,
        });
        return;
      }
    );
  });
});

/*
 * 4. Update a users
 */

router.put("/user/:id", function (req, res) {
  if (!req.body["name"] || !req.body["age"]) {
    res.status(400).json({
      success: false,
    });
    return;
  }
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    const users = JSON.parse(data);
    const findUser = users.find((u) => u.id == req.params.id);
    if (!findUser) {
      res.status(404).json({
        success: false,
      });
      return;
    }
    const newUserList = Object.values(users).map((u) => {
      if (u.id == req.params.id) {
        u.name = req.body["name"];
        u.age = req.body["age"];
      }
      return u;
    });

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      function (err, data) {
        res.status(200).json({
          success: true,
        });
      }
    );
    return;
  });
});

/*
 * 5. Delete a users
 */

router.delete("/user/:id", function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    const users = JSON.parse(data);
    const newUserList = users.filter((u) => u.id != req.params.id);
    const findUSer = users.find((u) => u.id == req.params.id);
    if (!findUSer) {
      res.status(404).json({
        success: false,
      });
      return;
    }

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(newUserList, null, "\t"),
      "utf8",
      function (err, data) {
        res.status(200).json({
          success: true,
        });
      }
    );
  });
});

module.exports = router;
