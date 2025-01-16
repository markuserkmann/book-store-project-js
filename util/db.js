const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'QWerty56!',
    database: 'webshop_test',
})

module.exports = pool.promise()