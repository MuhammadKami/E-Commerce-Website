import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load wishlist on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User must be logged in.");
      setLoading(false);
      return;
    }

    axios.get('http://localhost:5000/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log('Fetched wishlist:', res.data);
        setWishlist(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch wishlist:', err);
        setLoading(false);
      });
  }, []);


  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      {loading ? (
        <p className="text-gray-600">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500 italic">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
             <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="relative group border-none rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          {/* Wishlist & View Icons */}
          

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
      )}
    </div>
  );
};

export default Wishlist;
