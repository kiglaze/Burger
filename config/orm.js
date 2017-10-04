var connection = require("./connection.js");

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

var Orm = function() {
	this.selectAll = function(res) {
	    var dbQuery = "SELECT * FROM burgers";
	    connection.query(dbQuery, function(err, result) {
	      res.json(result);
	    });
	}

	this.insertOne = function(req, res) {
	    var dbQuery = "INSERT INTO burgers (burger_name) VALUES (?)";
	    connection.query(dbQuery, [req.body.burger_name], function(err, result) {
	      if(err) {
	      	console.log(err);
	      	throw err;
	      }
	      res.end();
	    });
	}

	this.updateOne = function(req, res) {
	    var dbQuery = "UPDATE burgers SET burger_name = ?, devoured = ? WHERE id = ?";
	    connection.query(dbQuery, [req.body.burger_name, req.body.devoured, req.body.id], function(err, result) {
	      if(err) {
	      	console.log(err);
	      	throw err;
	      }
	      res.end();
	    });
	}
}

module.exports = Orm;
