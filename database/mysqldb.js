var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'ArticlesData'
  });
con.connect();
module.exports =con;