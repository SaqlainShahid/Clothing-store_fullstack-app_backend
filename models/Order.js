const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  address: String,
  email: String,
  paymentMethod: String,
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  shipping: Number,
  grandTotal: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);


