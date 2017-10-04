var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var Orm = require("./config/orm.js");
var orm = new Orm();

app.get("/api/burger", function(req, res) {
    orm.selectAll(function(result) {res.json(result);});
});

app.get("/api/burger/isEaten/:isDevoured", function(req, res) {
    var isDevoured = req.params.isDevoured;
    if(isDevoured == 1) {
        orm.selectEaten(function(result) {res.json(result);});
    } else if (isDevoured == 0) {
        orm.selectUneaten(function(result) {res.json(result);});
    }
});

app.post("/api/burger", function(req, res) {
    orm.insertOne(req, res);
});

app.put("/api/burger", function(req, res) {
    orm.updateOne(req, res);
});

app.get("/index", function(req, res) {
  orm.selectAll(function(result) {
    var uneatenBurgers = [];
    var eatenBurgers = [];
    result.forEach(function(row) {
      if(row.devoured == 0) {
        uneatenBurgers.push(row);
      } else {
        eatenBurgers.push(row);
      };
    })
    res.render("index", {
      uneatenBurgers: uneatenBurgers,
      eatenBurgers: eatenBurgers
    });
  });
});

app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});
