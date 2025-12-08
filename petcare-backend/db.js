const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "petcare"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL холбогдлоо!");
});

module.exports = db;