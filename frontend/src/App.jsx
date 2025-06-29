import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Products from "./pages/Products.jsx";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Wishlist from "./pages/Wishlist.jsx";
import About from "./pages/About.jsx";

function App() {
  var stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/signup" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Elements>
      <Footer />
    </>
  );
}

export default App;
