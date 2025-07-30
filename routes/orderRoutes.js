// === routes/orderRoutes.js ===
const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// POST /api/orders
router.post('/', jwtAuth, async (req, res) => {
  try {
    const order = new Order({ ...req.body, userId: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// GET /api/orders/my
router.get('/my', jwtAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error loading orders' });
  }
});

module.exports = router;

