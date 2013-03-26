module.exports = function (config) {

	var mongo = require('mongodb');

	var Server = mongo.Server
		, Db = mongo.Db
		, BSON = mongo.BSONPure;

	var server = new Server(config.host, config.port, {auto_reconnect: true})
		, db = new Db(config.database, server, {safe: true});

	db.open(function(err, db) {
		if (err) throw err;
	});

	this.insert = function (item, callback) {
		db.collection(config.collection, function(err, collection) {
			if (!item.length) return callback(null, []);
			collection.insert(item, {safe: true}, function(err, result) {
				return callback && callback(err, result);
			});
		});
	}

	this.close = function() {
		db.close();
	}
}