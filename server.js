var express = require("express");
var app = express();
var pg = require("pg");
var bodyParser = require("body-parser");
var validator = require("express-validator");
var port = 5000;
var pug = require("pug");
app.set("view engine", "pug");
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(validator());

//Bulletin board home page
app.get("/", function(request, response) {
  response.render("home");
});

//Bulletin board form
app.get("/addmessage", function(request, response) {
  response.render("messageform");
});

app.listen(port, function() {
  console.log("Listening on port", port);
});
