var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "burgers_db"
});

module.exports = connection;
