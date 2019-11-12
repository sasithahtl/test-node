var mysql = require('mysql');

const isProduction = true;
const ipaddress = '0.0.0.0'
var user = "root";
var password = "password";
var database = "checkdate";

if (isProduction) {
    user = "quickche";
    password = "Uo#nKm$3@am+";
    database = "quickche_checkdate";
}

var pool = mysql.createPool({
    connectionLimit: 10,
    host: ipaddress,
    user: user,
    password: password,
    database: database
});
pool.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        console.error(err);
    }
    if (conn) conn.release()
    return
});

module.exports = pool