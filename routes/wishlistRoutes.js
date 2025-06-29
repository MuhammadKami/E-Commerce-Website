const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Should decode the logged-in user

// GET wishlist
// routes/wishlistRoutes.js
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist); // ✅ Must return an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});


// ADD to wishlist
router.post('/:productId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  res.json({ message: 'Added to wishlist' });
});

// DELETE from wishlist
router.delete('/:productId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== req.params.productId
  );
  await user.save();
  res.json({ message: 'Removed from wishlist' });
});

module.exports = router;
