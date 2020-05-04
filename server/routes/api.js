var express = require("express");
var locationRouter = require("./location");

var app = express();

app.use("/location/", locationRouter);

module.exports = app;