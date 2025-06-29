exports.addToWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  res.json(user.wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(
    pid => pid.toString() !== req.params.productId
  );
  await user.save();
  res.json(user.wishlist);
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');
  res.json(user.wishlist);
};
