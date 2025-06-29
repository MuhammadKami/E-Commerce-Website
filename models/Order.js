const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: String,
  companyName: String,
  streetAddress: String,
  apartment: String,
  city: String,
  phone: String,
  email: String,
  paymentMethod: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      _id: String,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
