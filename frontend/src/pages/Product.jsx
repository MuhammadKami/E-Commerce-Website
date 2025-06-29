import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { fetchProductById } from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const { singleProduct: product, loading } = useSelector(
    (state) => state.products
  );
const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(2);
  const [wishlist, setWishlist] = useState([]);
const token = localStorage.getItem("token");
   const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [wishlistMap, setWishlistMap] = useState({});
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 useEffect(() => {
  const token = localStorage.getItem("token");
  
if (!token) {
  console.error("No token found. User must be logged in.");
  return;
}
  axios
    .get("http://localhost:5000/api/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const map = {};
        res.data.forEach((p) => {
          map[p._id] = true;
        });
        setWishlistMap(map);
      } else {
        console.error("Wishlist is not an array", res.data);
      }
    })
    .catch((err) => console.error("Error fetching wishlist:", err));
}, []);
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !product) return <p>Loading...</p>;

  const handleBuyNow = () => {
   dispatch(
  addToCart({
    _id: product._id, // 👈 Use _id for matching in Redux
    name: product.name,
    image: product.image,
    price: product.price,
    selectedColor,
    selectedSize,
    quantity,
  }),
  navigate('/cart')

);


};
const toggleWishlist = async (productId) => {
  const token = localStorage.getItem("token");

  try {
    const isWished = wishlistMap[productId];

    if (isWished) {
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistMap((prev) => ({ ...prev, [productId]: false }));
    } else {
      await axios.post(`http://localhost:5000/api/wishlist/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistMap((prev) => ({ ...prev, [productId]: true }));
    }
  } catch (err) {
    console.error("Error toggling wishlist:", err);
  }
};



  return (
    <div className="p-6 grid grid-cols-2 gap-10 m-[100px]">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="w-full h-80 object-contain"
      />

      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-lighter">{product.name}</h1>

        <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>

        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{star <= 4 ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-gray-500 text-sm">(150 Reviews)</span>
          <span className="mx-2 text-gray-300">|</span>
          <span
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-sm text-gray-700">{product.description}</p>

        {/* Colour Selector */}
        <div>
          <p className="font-medium mb-1">Colours:</p>
          <div className="flex space-x-2">
            {["red", "gray"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-5 h-5 rounded-full border-2 ${
                  color === "red" ? "bg-red-500" : "bg-gray-400"
                } ${selectedColor === color ? "ring-2 ring-black" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div>
          <p className="font-medium mb-1">Size:</p>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-3 py-1 rounded ${
                  selectedSize === size
                    ? "bg-red-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Buy Now */}
        <div className="flex items-center mt-4 space-x-2">
          <button
            className="border px-3 py-1 rounded"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            className="border px-3 py-1 rounded"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>

          <button
            onClick={handleBuyNow}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Add to Cart
          </button>
         <button
              className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100 border-none"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product._id);
              }}
            >
              <i
                className={`text-lg m-2 fa-heart ${
                  wishlistMap[product._id] ? "fa-solid text-red-500" : "fa-regular"
                }`}
              ></i>
            </button>

         
        </div>

        {/* Delivery Info */}
        <div className="border rounded p-3 mt-4 space-y-3 text-sm">
          <div>
            <strong>🚚 Free Delivery</strong>
            <p className="text-gray-500">
              Enter your postal code for Delivery Availability
            </p>
          </div>
          <hr />
          <div>
            <strong>🔁 Return Delivery</strong>
            <p className="text-gray-500">
              Free 30 Days Delivery Returns.{" "}
              <a href="#" className="underline">
                Details
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
