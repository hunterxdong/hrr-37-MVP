const express = require('express');
const app = express();
const port = 5000;
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
	db.addDebt(res.body, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(result);
		}
	});
});

app.listen(port, () => console.log(`listening on port ${port}!`));
