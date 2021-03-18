const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Macleod2321!",
    database: "employeetrackerDB"
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;