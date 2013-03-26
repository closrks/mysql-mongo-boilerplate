module.exports = function (config) {

	var mysql = require('mysql')
		, squel = require('squel')

	var connection = mysql.createConnection({
			host: config.host
		, port: config.port
		, database: config.database
		, user: config.user
		, password: config.password
	});

	this.select = function(callback) {

		var sql = squel.select().toString()

		connection.query(sql, function (err, result) {
			return callback && callback(err, result);
		});
	}; 

	this.close = function() {
		connection.end();
	}

}