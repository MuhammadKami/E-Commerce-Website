// pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

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


  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 p-4 m-20">
      {items.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="relative group border-none rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          {/* Wishlist & View Icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
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

            <button className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
              <i className="fa-regular fa-eye"></i>
            </button>
          </div>

          {/* Product Image */}
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-40 object-contain mb-4"
          />

          {/* Product Name */}
          <h2 className="font-medium text-sm mb-1">{product.name}</h2>

          {/* Price */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-red-500 font-semibold">
              ${product.price - (product.price * (product.discount || 0)) / 100}
            </span>
            {product.discount && (
              <span className="line-through text-gray-400">${product.price}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center text-sm mt-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < Math.floor(product.rating || 4.5) ? "★" : "☆"}</span>
            ))}
            <span className="ml-1 text-gray-500 text-xs">
              ({product.reviewCount || 99})
            </span>
          </div>

          {/* Description */}
          {product.description.length > 100 ? (
            <p className="text-xs">
              {product.description.slice(0, 100)}...
              <span className="text-black-500 cursor-pointer text-sm"> Show more</span>
            </p>
          ) : (
            <p className="text-xs">{product.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
