// === routes/adminRoutes.js ===
const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/authMiddleware');
const adminCheck = require('../middleware/adminMiddleware');
const User = require('../models/user');
const Order = require('../models/Order');

router.get('/users', jwtAuth, adminCheck, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', jwtAuth, adminCheck, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

router.put('/users/:id', jwtAuth, adminCheck, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get('/users/:id/orders', jwtAuth, adminCheck, async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  res.json(orders);
});

module.exports = router;
