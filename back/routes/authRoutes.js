const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, first_name, last_name, phone_number } = req.body;

        // Check if user already exists
        const { rows: existingUser } = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: 'User with this email or username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert new user into database
        const { rows } = await db.query(
            'INSERT INTO users (username, email, password_hash, first_name, last_name, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, username, email, role',
            [username, email, password_hash, first_name, last_name, phone_number, 'user'] // Default role 'user'
        );

        const newUser = rows[0];

        // Generate JWT
        const token = jwt.sign(
            { user_id: newUser.user_id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ msg: 'User registered successfully', token, user: { id: newUser.user_id, username: newUser.username, email: newUser.email, role: newUser.role } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Logged in successfully', token, user: { id: user.user_id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;