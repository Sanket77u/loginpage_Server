const express = require('express');
const router = express.Router();
const pool = require('../Configurations/connectDB');

router.post('/create-table', async (req, res) => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS Users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(query);
        return res.json({ success: true, message: "Users table created" });
    } catch (error) {
        console.error("Error creating table:", error);
        return res.status(500).json({ success: false, message: "Error creating table" });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        if (result.rows.length > 0) {
            return res.json({ success: true, Users: result.rows });
        } else {
            return res.status(404).json({ success: false, message: 'No data found' });
        }
    } catch (error) {
        console.error("Error in GET /:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/add-user', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password required" });
        }

        const query = `
            INSERT INTO Users (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [username, password];

        const result = await pool.query(query, values);

        return res.json({
            success: true,
            message: "User added successfully",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ success: false, message: "Error adding user" });
    }
});

router.get('/test', (req, res) => {
    return res.send('Server is running fine..!');
});

module.exports = router;
