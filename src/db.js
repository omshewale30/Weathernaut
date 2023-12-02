
const Pool = require('pg').Pool

const pool = new Pool({
        host: 'localhost',
        user:'postgres',
        port: 5432,
        password: '3001',
        database: 'postgres'
});
//testing merge conflict
module.exports = pool;