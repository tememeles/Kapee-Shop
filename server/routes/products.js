import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// POST /api/products - create a new product
// POST /api/products - create one or many products
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert
      const products = await Product.insertMany(req.body);
      res.status(201).json(products);
    } else {
      // Single insert
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
