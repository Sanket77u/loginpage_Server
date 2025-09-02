require('dotenv').config();
const { Pool } = require('pg');
const dns = require('dns');

// Force IPv4 (avoid ENETUNREACH on Render)
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL connected successfully...");
        client.release();
    })
    .catch(err => {
        console.error("❌ PostgreSQL connection error:", err.message);
    });

module.exports = pool;
