var program = require('commander')
	, MySQLDB = require('./libs/mysqldb')
	, MySQLConfig = require('./dbconfig').sql
	, MongoDB = require('./libs/mongodb')
	, MongoConfig = require('./dbconfig').mongo
	, transform = require('./libs/transform');

program
	.version('0.0.1')
	.option('-o, --option <value>', 'option description')
	.parse(process.argv);

if (program) {

	console.log('\nStart Program\n')

	if (program.option) {

		var mysqldb = new MySQLDB(MySQLConfig)
			, mongodb = new MongoDB(MongoConfig);

		mysqldb.select(function(err, result) {

			var item = transform.result(result);

			mongodb.insert(item, function(err, result) {

				mysqldb.close();
				mongodb.close();
			});
		});

		
	} else {

		program.help();

	}
}
