import mysql from 'request-promise';

pool = mysql.createPool({
    host: 'localhost',
    user: 'sauron',
    password: 'theonetruering',
    database: 'mordor',
    connectionLimit: 5
});

function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;