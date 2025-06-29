// routes/orderRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // ✅ Make sure this exists

// 🔒 Protect this route
router.post('/', authenticate, async (req, res) => {
  const {
    firstName,
    companyName,
    streetAddress,
    apartment,
    city,
    phone,
    email,
    items,
    total,
    paymentMethod,
  } = req.body;

  try {
    // ✅ 1. Save order to MongoDB
    const newOrder = new Order({
      user: req.user.id, // 👈 link order to user
      firstName,
      companyName,
      streetAddress,
      apartment,
      city,
      phone,
      email,
      items,
      total,
      paymentMethod,
    });

    await newOrder.save();

    // ✅ 2. Save to user.cartHistory
    const user = await User.findById(req.user.id);
    if (user) {
      user.cartHistory.push({
        items: items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
      });
      await user.save();
    }

    // ✅ 3. Email to admin
    const htmlContent = `
      <h3>🛒 New Order Received</h3>
      <p><strong>Name:</strong> ${firstName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${streetAddress}, ${apartment || ''}, ${city}</p>
      <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Total:</strong> $${total}</p>
      <h4>🛍️ Products:</h4>
      <ul>
        ${items.map(item => `<li>${item.name} - $${item.price} × ${item.quantity}</li>`).join('')}
      </ul>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS, // 🔐 Use .env instead of hardcoding!
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: 'mukamraatt@gmail.com',
      subject: '🛒 New Order Received',
      html: htmlContent,
    });

    res.status(200).json({ message: 'Order placed and email sent!' });
  } catch (err) {
    console.error('❌ Order error:', err);
    res.status(500).json({ message: 'Order placement failed' });
  }
});

module.exports = router;
