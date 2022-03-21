var express = require("express");
var app = express();
var logger = require("morgan");
require("dotenv").config();

// const memoryRouter = require("./mem-db/mem-router");
// const postgreRouter = require("/routes/pg-router");

// app.use("/", postgresRouter); // postgres db

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", memoryRouter);

module.exports = app;
