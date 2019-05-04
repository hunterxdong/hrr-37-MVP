const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
//const db = require("../database/index.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`listening on port ${port}!`));
