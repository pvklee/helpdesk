const mysql = require('mysql2');
const config = require('./config');

const {db: {host, user, password, database, port}} = config;

module.exports = mysql.createPool({
  host,
  user,
  password,
  database,
  port
}).promise();

