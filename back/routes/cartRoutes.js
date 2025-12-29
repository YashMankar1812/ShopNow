const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({ msg: 'Invalid product_id or quantity' });
        }

        // Find or create a cart for the user
        let cart_id;
        const { rows: cartRows } = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [user_id]);
        if (cartRows.length > 0) {
            cart_id = cartRows[0].cart_id;
        } else {
            const { rows: newCartRows } = await db.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING cart_id', [user_id]);
            cart_id = newCartRows[0].cart_id;
        }

        // Check if product already in cart
        const { rows: itemRows } = await db.query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);

        if (itemRows.length > 0) {
            // Update quantity if item exists
            const newQuantity = itemRows[0].quantity + quantity;
            await db.query('UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *', [newQuantity, itemRows[0].cart_item_id]);
        } else {
            // Add new item
            await db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cart_id, product_id, quantity]);
        }

        res.status(200).json({ msg: 'Item added to cart successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const { rows: cartRows } = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [user_id]);
        if (cartRows.length === 0) {
            return res.status(200).json({ items: [] }); // Empty cart
        }
        const cart_id = cartRows[0].cart_id;

        const { rows: cartItems } = await db.query(
            `SELECT ci.product_id, p.name, p.price, ci.quantity, p.image_url
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.product_id
             WHERE ci.cart_id = $1`,
            [cart_id]
        );

        res.json({ items: cartItems });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update item quantity in cart
router.put('/update', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const { product_id, quantity } = req.body;

        if (!product_id || quantity === undefined || quantity < 0) {
            return res.status(400).json({ msg: 'Invalid product_id or quantity' });
        }

        const { rows: cartRows } = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [user_id]);
        if (cartRows.length === 0) {
            return res.status(404).json({ msg: 'Cart not found for this user' });
        }
        const cart_id = cartRows[0].cart_id;

        if (quantity === 0) {
            // Remove item if quantity is 0
            await db.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);
            return res.json({ msg: 'Item removed from cart' });
        } else {
            // Update quantity
            const { rowCount } = await db.query('UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3', [quantity, cart_id, product_id]);
            if (rowCount === 0) {
                return res.status(404).json({ msg: 'Product not found in cart' });
            }
            return res.json({ msg: 'Cart item quantity updated' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const { productId } = req.params;

        const { rows: cartRows } = await db.query('SELECT cart_id FROM carts WHERE user_id = $1', [user_id]);
        if (cartRows.length === 0) {
            return res.status(404).json({ msg: 'Cart not found for this user' });
        }
        const cart_id = cartRows[0].cart_id;

        const { rowCount } = await db.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart_id, productId]);
        if (rowCount === 0) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
        res.json({ msg: 'Item removed from cart successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;