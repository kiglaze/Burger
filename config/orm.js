var connection = require("./connection.js");

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

var Orm = function() {
	this.selectAll = function(callback) {
	    var dbQuery = "SELECT * FROM burgers";
	    connection.query(dbQuery, function(err, result) {
	      callback(result);
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
		var burgerName = req.body.burger_name;
		var isDevoured = req.body.devoured;
		var burgerId = req.body.id;
	    var dbQuery = "UPDATE burgers SET burger_name = ?, devoured = ? WHERE id = ?";
	    var queryDataArr = [burgerName, isDevoured, burgerId];
	    if(burgerName == null) {
	    	dbQuery = "UPDATE burgers SET devoured = ? WHERE id = ?";
	    	queryDataArr = [isDevoured, burgerId];
	    } else if (isDevoured === null) {
	    	dbQuery = "UPDATE burgers SET burger_name = ? WHERE id = ?";
	    	queryDataArr = [burgerName, burgerId];
	    }
	    connection.query(dbQuery, queryDataArr, function(err, result) {
	      if(err) {
	      	console.log(err);
	      	throw err;
	      }
	      res.end();
	    });
	}
}

module.exports = Orm;
