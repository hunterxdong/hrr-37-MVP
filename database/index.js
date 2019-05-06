const { Pool, Client } = require("pg");
const config = require("./config");
const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port
});

pool.connect(err => {
    if (err) throw err;
    console.log("connected");
});


module.exports = {

};
