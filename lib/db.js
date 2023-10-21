var mysql = require('mysql');
var dbInfo = require('./dbInfo');

var db = mysql.createConnection(dbInfo);
db.connect();

module.exports = db;