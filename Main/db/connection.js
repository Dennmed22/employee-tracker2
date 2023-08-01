const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "$Bella0924",
  database: "employees"
});

// You don't need to explicitly call connection.connect() with mysql2/promise

module.exports = connection;