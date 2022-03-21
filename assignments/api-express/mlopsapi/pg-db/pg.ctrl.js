var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

// var memoryRouter = require("./routes/memory");
// app.use("/", memoryRouter); // local memory db

var postgresRouter = require("./model/pg"); // var UserHandler = require("./handler/UserHandler");
app.use("/", postgresRouter); // postgres db
