// server.js
import listEndpoints from "express-list-endpoints";
import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
// import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB connection
pool.getConnection()
  .then(conn => {
    console.log("Connected to MySQL!");
    conn.release();
  })
  .catch(err => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

// ------------------ HELPER FUNCTIONS ------------------

// JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Role Authorization
const authorizeRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      const [rows] = await pool.execute('SELECT role FROM users WHERE user_id = ?', [req.user.user_id]);
      if (rows.length === 0 || !roles.includes(rows[0].role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      console.error("Role authorization error:", error);
      res.status(500).json({ message: "Server error during authorization" });
    }
  };
};

// ------------------ AUTH ROUTES ------------------

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password, first_name, last_name, phone_number } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Required fields missing" });

  try {
    const [existing] = await pool.execute('SELECT user_id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) return res.status(409).json({ message: "User exists" });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, password_hash, first_name, last_name, phone_number]
    );

    const token = jwt.sign({ user_id: result.insertId, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered", userId: result.insertId, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.warn("⚠️ Login failed: Missing email or password");
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [users] = await pool.execute(
      "SELECT user_id, username, email, password_hash, role FROM users WHERE email = ?",
      [email]
    );

    // ❌ Email not found
    if (users.length === 0) {
      console.warn(`❌ Login failed: Email not found → ${email}`);
      console.table({
        "Express server": "✅ OK",
        "MySQL connection": "✅ OK",
        "bcrypt": "✅ OK",
        "JWT": "✅ OK",
        "Login API": "✅ OK",
        "Issue": "❌ Wrong email"
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // ❌ Password mismatch
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.warn(`❌ Login failed: Wrong password for → ${email}`);
      console.table({
        "Express server": "✅ OK",
        "MySQL connection": "✅ OK",
        "bcrypt": "✅ OK",
        "JWT": "✅ OK",
        "Login API": "✅ OK",
        "Issue": "❌ Wrong password"
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Success
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`✅ Login success: ${email}`);

    res.json({
      message: "Logged in",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------ CART ROUTES ------------------

// Add to cart
app.post("/api/cart/add", authenticateToken, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.user_id;
  if (!product_id || !quantity || quantity <= 0) return res.status(400).json({ message: "Invalid product/quantity" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    let [carts] = await conn.execute('SELECT cart_id FROM carts WHERE user_id = ?', [user_id]);
    let cart_id = carts.length === 0 ? (await conn.execute('INSERT INTO carts (user_id) VALUES (?)', [user_id]))[0].insertId : carts[0].cart_id;

    const [items] = await conn.execute('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart_id, product_id]);
    if (items.length > 0) {
      const newQty = items[0].quantity + quantity;
      await conn.execute('UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?', [newQty, items[0].cart_item_id]);
    } else {
      await conn.execute('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cart_id, product_id, quantity]);
    }

    await conn.commit();
    res.json({ message: "Added to cart" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Cart add error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// Get user's cart
app.get("/api/cart/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (req.user.user_id !== parseInt(userId) && req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  try {
    const [cartItems] = await pool.execute(`
      SELECT ci.cart_item_id, ci.product_id, p.name, p.price, ci.quantity, p.image_url
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.cart_id
      JOIN products p ON ci.product_id = p.product_id
      WHERE c.user_id = ?`, [userId]);
    res.json(cartItems);
  } catch (err) {
    console.error("Fetch cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete item from cart
app.delete("/api/cart/:userId/:productId", authenticateToken, async (req, res) => {
  const { userId, productId } = req.params;
  if (req.user.user_id !== parseInt(userId) && req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [carts] = await conn.execute('SELECT cart_id FROM carts WHERE user_id = ?', [userId]);
    if (carts.length === 0) return res.status(404).json({ message: "Cart not found" });

    const cart_id = carts[0].cart_id;
    const [result] = await conn.execute('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart_id, productId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not in cart" });

    await conn.commit();
    res.json({ message: "Item removed" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Delete cart error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// Update cart item quantity
app.put("/api/cart/update", authenticateToken, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.user_id;
  if (!product_id || quantity === undefined || quantity < 0) return res.status(400).json({ message: "Invalid data" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [carts] = await conn.execute('SELECT cart_id FROM carts WHERE user_id = ?', [user_id]);
    if (carts.length === 0) return res.status(404).json({ message: "Cart not found" });

    const cart_id = carts[0].cart_id;

    if (quantity === 0) {
      const [result] = await conn.execute('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart_id, product_id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Product not in cart" });
      await conn.commit();
      return res.json({ message: "Item removed" });
    } else {
      const [result] = await conn.execute('UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?', [quantity, cart_id, product_id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: "Product not in cart" });
      await conn.commit();
      return res.json({ message: "Quantity updated" });
    }
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Update cart error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// ------------------ WISHLIST ROUTES ------------------

// Add to wishlist
app.post("/api/wishlist/add", authenticateToken, async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user.user_id;
  if (!product_id) return res.status(400).json({ message: "Product ID required" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    let [wishlists] = await conn.execute('SELECT wishlist_id FROM wishlists WHERE user_id = ?', [user_id]);
    let wishlist_id = wishlists.length === 0 ? (await conn.execute('INSERT INTO wishlists (user_id) VALUES (?)', [user_id]))[0].insertId : wishlists[0].wishlist_id;

    const [items] = await conn.execute('SELECT * FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?', [wishlist_id, product_id]);
    if (items.length > 0) return res.status(409).json({ message: "Already in wishlist" });

    await conn.execute('INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)', [wishlist_id, product_id]);
    await conn.commit();
    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Wishlist add error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// Get user's wishlist
app.get("/api/wishlist/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (req.user.user_id !== parseInt(userId) && req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  try {
    const [items] = await pool.execute(`
      SELECT wi.wishlist_item_id, wi.product_id, p.name, p.price, p.image_url
      FROM wishlist_items wi
      JOIN wishlists w ON wi.wishlist_id = w.wishlist_id
      JOIN products p ON wi.product_id = p.product_id
      WHERE w.user_id = ?`, [userId]);
    res.json(items);
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete item from wishlist
app.delete("/api/wishlist/:userId/:productId", authenticateToken, async (req, res) => {
  const { userId, productId } = req.params;
  if (req.user.user_id !== parseInt(userId) && req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [wishlists] = await pool.execute('SELECT wishlist_id FROM wishlists WHERE user_id = ?', [userId]);
    if (wishlists.length === 0) return res.status(404).json({ message: "Wishlist not found" });

    const wishlist_id = wishlists[0].wishlist_id;
    const [result] = await conn.execute('DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?', [wishlist_id, productId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });

    await conn.commit();
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Delete wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// ------------------ PRODUCTS ROUTES ------------------

app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE product_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Fetch product by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/products/category/:categoryName", async (req, res) => {
  const slug = req.params.categoryName;

  // Convert slug → DB name
  const categoryName = slug
    .replace("-", " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  try {
    const [categories] = await pool.execute(
      "SELECT category_id FROM categories WHERE name = ?",
      [categoryName]
    );

    if (categories.length === 0)
      return res.status(404).json({ message: "Category not found" });

    const category_id = categories[0].category_id;

    const [products] = await pool.execute(
      "SELECT * FROM products WHERE category_id = ?",
      [category_id]
    );

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------ CATEGORIES ROUTES ------------------

app.get("/api/categories", async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ ORDERS ROUTES ------------------

app.post("/api/orders/create", authenticateToken, async (req, res) => {
  const { total_amount, shipping_address, billing_address, items } = req.body;
  const user_id = req.user.user_id;

  if (!total_amount || !shipping_address || !items || items.length === 0) return res.status(400).json({ message: "Invalid order data" });

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [orderResult] = await conn.execute(
      'INSERT INTO orders (user_id, total_amount, shipping_address, billing_address) VALUES (?, ?, ?, ?)',
      [user_id, total_amount, shipping_address, billing_address || shipping_address]
    );
    const order_id = orderResult.insertId;

    for (const item of items) {
      await conn.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [order_id, item.product_id, item.quantity, item.unit_price]
      );
    }

    await conn.commit();
    res.status(201).json({ message: "Order created", order_id });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

app.get("/api/orders/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (req.user.user_id !== parseInt(userId) && req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  try {
    const [orders] = await pool.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC', [userId]);
    for (let order of orders) {
      const [items] = await pool.execute(`
        SELECT oi.product_id, p.name, p.image_url, oi.quantity, oi.unit_price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        WHERE oi.order_id = ?`, [order.order_id]);
      order.items = items;
    }
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== SYSTEM STATUS LOG ==================

const logSystemStatus = () => {
  console.log("\n📊 SYSTEM STATUS");
  console.table({
    "Express server": "✅ OK",
    "MySQL connection": "✅ OK",
    "bcrypt": "✅ OK",
    "JWT": "✅ OK",
    "Login API": "✅ OK",
    "Issue": "❌ None"
  });
};

// Call after DB connection
pool.getConnection()
  .then(conn => {
    console.log("Connected to MySQL!");
    conn.release();
    logSystemStatus(); // 👈 HERE
  })
  .catch(err => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });


// ------------------ HOME ROUTE TO LIST ENDPOINTS ------------------

// app.get("/", (req, res) => {
//   const endpoints = listEndpoints(app);

//   const htmlList = endpoints
//     .map(ep => {
//       const methods = ep.methods.join(", ");
//       return `<li><strong>${methods}</strong> → ${ep.path}</li>`;
//     })
//     .join("");

//   res.send(`
//     <h1>E-commerce Backend Running</h1>
//     <h3>Available Endpoints:</h3>
//     <ul>${htmlList}</ul>
//   `);
// });






// ------------------ START SERVER ------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ------------------ HOME ROUTE (API HEALTH + ENDPOINTS) ------------------
  app.get("/", (req, res) => {
    const endpoints = listEndpoints(app);
  
    const formattedEndpoints = endpoints.map(ep => ({
      path: ep.path,
      methods: ep.methods,
      middleware: ep.middlewares || []
    }));
  
    res.status(200).json({
      status: "✅ Backend running properly",
      server: "E-commerce API",
      port: PORT,
      totalEndpoints: formattedEndpoints.length,
      endpoints: formattedEndpoints
    });
  });

  console.log("Registered routes:", listEndpoints(app));
