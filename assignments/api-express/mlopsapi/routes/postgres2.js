var express = require("express");
var router = express.Router();
const { Client } = require("pg");
const Query = require("pg").Query;

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

module.exports = router;
