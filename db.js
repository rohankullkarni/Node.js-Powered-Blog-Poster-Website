const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DiluteNest1667",
  database: "blog_db",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();
