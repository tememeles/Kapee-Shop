import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import models
import Product from "./models/Product.js";
import productsRouter from './routes/products.js';
import uploadRouter from './routes/upload.js';
import Order from "./models/Order.js";
import User from "./models/User.js";
import Blog from "./models/Blog.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User model is imported from models/User.js

// ------------------- Routes ------------------- //
// Products API
app.use('/api/products', productsRouter);
// Image upload API
app.use('/api/upload', uploadRouter);

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed products (run once to populate database)
app.post("/api/products/seed", async (req, res) => {
  try {
    const existingProducts = await Product.find();
    if (existingProducts.length > 0) {
      return res.status(400).json({ error: "Products already exist" });
    }
    
    const sampleProducts = [
      {
        productname: "iPhone 16",
        productdescrib: "Latest iPhone with advanced features",
        productprice: 999,
        productquantity: 50,
        category: "Electronics",
        image: "/src/assets/2.jpeg"
      },
      {
        productname: "Apple Watch",
        productdescrib: "Smart watch with health tracking",
        productprice: 399,
        productquantity: 30,
        category: "Electronics",
        image: "/src/assets/3.jpeg"
      },
      {
        productname: "AirPods Pro",
        productdescrib: "Wireless earbuds with noise cancellation",
        productprice: 249,
        productquantity: 75,
        category: "Electronics",
        image: "/src/assets/4.jpeg"
      },
      {
        productname: "MacBook Pro",
        productdescrib: "High-performance laptop for professionals",
        productprice: 1999,
        productquantity: 20,
        category: "Electronics",
        image: "/src/assets/5.jpeg"
      },
      {
        productname: "Samsung Galaxy S24",
        productdescrib: "Android smartphone with excellent camera",
        productprice: 899,
        productquantity: 40,
        category: "Electronics",
        image: "/src/assets/6.jpeg"
      }
    ];
    
    const products = await Product.insertMany(sampleProducts);
    res.status(201).json({ message: "Products seeded successfully", products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Orders API
// Create order
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create multiple orders (batch checkout)
app.post("/api/orders/batch", async (req, res) => {
  try {
    const { orders } = req.body;
    
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Orders array is required and cannot be empty" });
    }

    // Validate each order
    for (const orderData of orders) {
      if (!orderData.product || !orderData.quantity || !orderData.price) {
        return res.status(400).json({ error: "Each order must have product, quantity, and price" });
      }
    }

    // Check for recent duplicate orders (within last 30 seconds) to prevent accidental duplicates
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
    const userId = orders[0].userId;
    
    if (userId) {
      const recentOrders = await Order.find({
        userId: userId,
        createdAt: { $gte: thirtySecondsAgo }
      });

      // Check if we have similar orders recently
      const hasRecentSimilarOrder = recentOrders.some(recentOrder => 
        orders.some(newOrder => 
          newOrder.product === recentOrder.product && 
          newOrder.quantity === recentOrder.quantity &&
          newOrder.price === recentOrder.price
        )
      );

      if (hasRecentSimilarOrder && recentOrders.length >= orders.length) {
        return res.status(409).json({ 
          error: "Similar orders were recently placed. Please wait a few minutes before placing the same order again." 
        });
      }
    }

    // Create all orders
    const createdOrders = await Order.insertMany(orders);
    res.status(201).json({ 
      message: `Successfully created ${createdOrders.length} orders`,
      orders: createdOrders 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order
app.put("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    
    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    res.status(201).json({
      message: "User registered successfully",
      user: userData
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    
    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    res.json({ 
      message: "Login successful",
      user: userData
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- Blog Routes ------------------- //
// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update blog
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
