var express = require("express");
var app = express();
var logger = require("morgan");
require("dotenv").config();

const memoryRouter = require("./mem-db/index");
// const postgreRouter = require("/routes/pg-router");

// app.use("/", postgresRouter); // postgres db
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", memoryRouter);

module.exports = app;
