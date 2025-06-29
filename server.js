const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cookieParser = require('cookie-parser');


const path=require("path")
dotenv.config();
connectDB();

const app = express();

// ✅ Correct CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Needed for reading JSON request body
app.use(express.json());
app.use(cookieParser());
// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/orders', require('./routes/orderRoutes'));

app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
