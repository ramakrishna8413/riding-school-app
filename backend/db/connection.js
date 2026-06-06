const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456789",
  database: "horse_riding_school"
});

connection.connect((err) => {
  if (err) {
    console.error("Connection Error:", err);
    return;
  }

  console.log("MySQL Connected");
});

module.exports = connection;