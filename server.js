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

// // var connection = mysql.createConnection({
// //   host: "localhost",
// //   user: "",
// //   password: "",
// //   database: "burgers_db"
// // });

// // connection.connect(function(err) {
// //   if (err) {
// //     console.error("error connecting: " + err.stack);
// //     return;
// //   }
// //   console.log("connected as id " + connection.threadId);
// // });


var uneatenBurgers = 
[
  {
      name: "Big one",
      isConsumed: false
  }, 
  {
      name: "Lots of pickles one",
      isConsumed: false
  }, 
  {
      name: "Small one",
      isConsumed: false
  }
];

var eatenBurgers = 
[
  {
      name: "Lettuce one",
      isConsumed: true
  }, 
  {
      name: "Lots of mustard one",
      isConsumed: true
  }, 
  {
      name: "Ketchup one",
      isConsumed: true
  }
];

app.get("/index", function(req, res) {
  res.render("index", {
    uneatenBurgers: uneatenBurgers,
    eatenBurgers: eatenBurgers
  });
});

app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});
