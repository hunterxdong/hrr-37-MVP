const { Pool, Client } = require('pg');
const config = require('./config');
const pool = new Pool({
	user: config.user,
	host: config.host,
	database: config.database,
	password: config.password,
	port: config.port
});

pool.connect(err => {
	if (err) throw err;
	console.log('connected');
});

var getAllDebt = function(callback) {
	pool.query(`select * from money`, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			callback(null, result);
		}
	});
};

var addDebt = function(data, callback) {
	pool.query(
		`insert into money(name, why, amount) values ('${data.name}','${
			data.why
		}',${data.amount})`,
		function(err, result) {
			if (err) {
				console.log(err);
			} else {
				callback(null, result);
			}
		}
	);
};

var absolveAll = function(data, callback) {
	pool.query(`delete from money`),
		function(err, result) {
			if (err) {
				console.log(err);
			} else {
				callback(null, result);
			}
		};
};

var absolveOne = (data, callback) => {
	pool.query('DELETE FROM money WHERE id = $1', [data.id], function(
		err,
		result
	) {
		if (err) {
			console.log(err);
		} else {
			callback(null, result);
		}
	});
};

module.exports = {
	getAllDebt,
	addDebt,
	absolveAll,
	absolveOne
};
