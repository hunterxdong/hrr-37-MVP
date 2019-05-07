const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/debts', (req, res) => {
	db.getAllDebt(function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(result.rows);
		}
	});
});

app.post('/api/add', (req, res) => {
	db.addDebt(req.body, function(err, result) {
		console.log(res.body);
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(result);
		}
	});
	// console.log(req.body);
});

app.delete('/api/absolve', (req, res) => {
	db.absolveAll(function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send('Got a DELETE request at /api/absolve');
		}
	});
});

app.post(`/api/delete`, (req, res) => {
	console.log(req.body);
	db.absolveOne(req.body, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send(`deleted`);
		}
	});
});

app.listen(port, () => console.log(`listening on port ${port}!`));
