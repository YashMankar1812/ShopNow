const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

// ---------------------
// AUTHENTICATE TOKEN
// ---------------------
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid token" });
        }

        req.user = user; // JWT payload (user_id, email, role)
        next();
    });
};

// ---------------------
// AUTHORIZE ROLE (MYSQL VERSION)
// ---------------------
const authorizeRole = (roles) => {
    return async (req, res, next) => {
        try {
            // MySQL returns rows in first index: [rows]
            const [rows] = await db.query(
                "SELECT role FROM users WHERE user_id = ?",
                [req.user.user_id]
            );

            if (rows.length === 0) {
                return res.status(403).json({ msg: "User not found" });
            }

            const userRole = rows[0].role;

            if (!roles.includes(userRole)) {
                return res.status(403).json({
                    msg: "Access denied: You do not have the required role",
                });
            }

            next();
        } catch (err) {
            console.error("Role Authorization Error:", err);
            res.status(500).json({ msg: "Server error during role authorization" });
        }
    };
};

module.exports = { authenticateToken, authorizeRole };


// const jwt = require('jsonwebtoken');
// const db = require('../db');
// require('dotenv').config();

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ msg: 'Token is not valid' });
//         req.user = user; // user payload from the JWT
//         next();
//     });
// };

// const authorizeRole = (roles) => {
//     return async (req, res, next) => {
//         // Assuming your 'users' table has a 'role' column (e.g., 'user', 'admin')
//         // You might need to fetch the user's role from the database based on req.user.user_id
//         try {
//             const { rows } = await db.query('SELECT role FROM users WHERE user_id = $1', [req.user.user_id]);
//             if (rows.length === 0 || !roles.includes(rows[0].role)) {
//                 return res.status(403).json({ msg: 'Access denied: You do not have the required role' });
//             }
//             next();
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server Error during role authorization');
//         }
//     };
// };

// module.exports = { authenticateToken, authorizeRole };