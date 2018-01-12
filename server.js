var express = require("express");
var app = express();
var pg = require("pg");
var Insert = require("./config/dbconfig.js");

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
  Insert.findAll().then(function(res) {
    response.render("home", {
      res
    });
  });
});

//Bulletin board insert data form
app.get("/addmessage", function(request, response) {
  response.render("messageform");
});
//Bulletin board insert data form
app.post("/post", function(request, response) {
  request.checkBody("title", "Title cannot be empty.").notEmpty();
  request.checkBody("bodymessage", "Body cannot be empty").notEmpty();
  const errors = request.validationErrors();
  if (errors) {
    response.render("errors", {
      errors
    });
  } else {
    Insert.sync().then(function() {
      Insert.create({
        title: request.body.title,
        body: request.body.bodymessage
      });
      response.redirect("/");
    });
  }
});

app.listen(port, function() {
  console.log("Listening on port", port);
});
