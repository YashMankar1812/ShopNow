const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database connection
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware'); // For protected routes

// GET all products
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new product (Admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category_id, image_url, sku, weight, dimensions } = req.body;
        const { rows } = await db.query(
            'INSERT INTO products (name, description, price, stock_quantity, category_id, image_url, sku, weight, dimensions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, description, price, stock_quantity, category_id, image_url, sku, weight, dimensions]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT (update) a product by ID (Admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock_quantity, category_id, image_url, sku, weight, dimensions } = req.body;
        const { rows } = await db.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5, image_url = $6, sku = $7, weight = $8, dimensions = $9, updated_at = CURRENT_TIMESTAMP WHERE product_id = $10 RETURNING *',
            [name, description, price, stock_quantity, category_id, image_url, sku, weight, dimensions, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a product by ID (Admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { rowCount } = await db.query('DELETE FROM products WHERE product_id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;