var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "testuser",
  password: "1234",
  connectionLimit:1000

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});