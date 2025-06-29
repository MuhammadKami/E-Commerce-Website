let cart = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

exports.getCart = (req, res) => {
  res.json(cart);
};

exports.addToCart = (req, res) => {
  const product = req.body;
  const existing = cart.items.find(item => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }

  cart.totalItems += 1;
  cart.totalAmount += product.price;

  res.status(201).json(cart);
};

exports.updateQuantity = (req, res) => {
  const { id, quantity } = req.body;
  const item = cart.items.find(item => item._id === id);

  if (item && quantity > 0) {
    cart.totalItems += quantity - item.quantity;
    cart.totalAmount += (quantity - item.quantity) * item.price;
    item.quantity = quantity;
    return res.json(cart);
  }

  res.status(400).json({ message: 'Invalid quantity or item not found' });
};

exports.removeFromCart = (req, res) => {
  const id = req.params.productId;
  const existing = cart.items.find(item => item._id === id);

  if (existing) {
    cart.totalItems -= existing.quantity;
    cart.totalAmount -= existing.price * existing.quantity;
    cart.items = cart.items.filter(item => item._id !== id);
    return res.json(cart);
  }

  res.status(404).json({ message: 'Item not found' });
};

exports.checkout = (req, res) => {
  // Add payment and order saving logic here
  const order = { ...cart, date: new Date() };
  cart = { items: [], totalAmount: 0, totalItems: 0 }; // Clear cart after checkout
  res.status(200).json({ message: 'Order placed', order });
};
