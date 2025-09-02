require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
    rejectUnauthorized: false,
    require: true
  },
  statement_timeout: 10000, 
  idle_in_transaction_session_timeout: 10000
})

pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL connected successfully...");
        client.release();
    })
    .catch(err => {
        console.error("❌ PostgreSQL connection error:", err.message);
    });

module.exports = pool;
