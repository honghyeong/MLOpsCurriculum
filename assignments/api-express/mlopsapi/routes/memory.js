var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
var fs = require("fs");
// var fs = require("fs");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

/*
 * 1. GET all users
 */

router.get("/user", function (req, res) {
  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
    res.status(200).json(JSON.parse(data));
  });
});

/*
 * 2. GET a user
 */

router.get("/user/:id", function (req, res) {
  var result = {};
  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
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

res.send();

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

  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
    // ADD
    var users = JSON.parse(data);
    users[req.params.id] = req.body;

    fs.writeFile(
      __dirname + "/../data/user.json",
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
  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
    var users = JSON.parse(data);

    if (!users[req.params.id]) {
      res.status(404).json({
        success: false,
      });
      return;
    }
    users[req.params.id] = req.body;

    fs.writeFile(
      __dirname + "/../data/user.json",
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
  fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
    var users = JSON.parse(data);

    if (!users[req.params.id]) {
      res.status(404).json({
        success: false,
      });
      return;
    }

    delete users[req.params.id];

    fs.writeFile(
      __dirname + "/../data/user.json",
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
