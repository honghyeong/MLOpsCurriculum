var express = require("express");
var router = express.Router();
var fs = require("fs");
// require("dotenv").config();
// const LOCAL_DB = "/../data/user.json";
const { LOCAL_DB } = process.env;
/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
/*
 * 1. GET all users
 */

router.get("/user", function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    if (err) {
      res.status(400);
      res.send(err.message);
    }
    console.log(LOCAL_DB);
    res.status(200).json(JSON.parse(data));
    // res.send(data);
    // res.status(200);
  });
});

/*
 * 2. GET a user
 */

router.get("/user/:id", function (req, res) {
  var result = {};
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    var userid = req.params.id;
    var users = JSON.parse(data);
    if (!users[userid]) {
      // result["success"] = false;
      res.status(404).json({
        success: false,
      });
      return;
    }

    res.status(200).json(users[userid]);
  });
});

/*
 * 3. CREATE a user : id 자동 생성 필요
 */

router.post("/user/:id", function (req, res) {
  var result = {};
  if (!req.body["age"] || !req.body["name"]) {
    res.status(200).json({
      success: false,
    });
    return;
  }

  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    // ADD
    var users = JSON.parse(data);
    users[req.params.id] = req.body;

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(users, null, "\t"),
      "utf8",
      function (err, data) {
        res.status(200).json({
          success: true,
        });
      }
    );
  });
});

/*
 * 4. Update a users
 */

router.put("/user/:id", function (req, res) {
  var result = {};
  if (!req.body["name"] || !req.body["age"]) {
    res.status(400).json({
      success: false,
    });
    return;
  }
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    var users = JSON.parse(data);

    if (!users[req.params.id]) {
      res.status(404).json({
        success: false,
      });
      return;
    }
    users[req.params.id] = req.body;

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(users, null, "\t"),
      "utf8",
      function (err, data) {
        res.status(200).json({
          success: true,
        });
      }
    );
  });
});

/*
 * 5. Delete a users
 */

router.delete("/user/:id", function (req, res) {
  fs.readFile(__dirname + LOCAL_DB, "utf8", function (err, data) {
    var users = JSON.parse(data);

    if (!users[req.params.id]) {
      res.status(404).json({
        success: false,
      });
      return;
    }

    delete users[req.params.id];

    fs.writeFile(
      __dirname + LOCAL_DB,
      JSON.stringify(users, null, "\t"),
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
