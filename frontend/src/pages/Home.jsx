import React from "react";
// pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
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
        await axios.post(
          `http://localhost:5000/api/wishlist/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWishlistMap((prev) => ({ ...prev, [productId]: true }));
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };
  const icons = [
    {
      name: "fa-solid fa-mobile-screen",
      id: "Mobiles",
    },
    {
      name: "fa-solid fa-desktop",
      id: "Computers",
    },
    {
      name: "fa-solid fa-stopwatch",
      id: "StopWatch",
    },
    {
      name: "fa-solid fa-camera",
      id: "Camera",
    },
    {
      name: "fa-solid fa-headphones",
      id: "Headphones",
    },
    {
      name: "fa-solid fa-gamepad",
      id: "Gaming",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4  m-10 flex  items-center">
        {/* Left Sidebar - Categories */}
        <div className="col-span-1 border-r-1 border-gray-500 ">
          <ul className="space-y-4 text-gray-700 text-sm font-medium">
            <li className="hover:text-red-500 cursor-pointer">
              Woman's Fashion
            </li>
            <li className="hover:text-red-500 cursor-pointer">Men's Fashion</li>
            <li className="hover:text-red-500 cursor-pointer">Electronics</li>
            <li className="hover:text-red-500 cursor-pointer">
              Home & Lifestyle
            </li>
            <li className="hover:text-red-500 cursor-pointer">Medicine</li>
            <li className="hover:text-red-500 cursor-pointer">
              Sports & Outdoor
            </li>
            <li className="hover:text-red-500 cursor-pointer">Baby's & Toys</li>
            <li className="hover:text-red-500 cursor-pointer">
              Groceries & Pets
            </li>
            <li className="hover:text-red-500 cursor-pointer">
              Health & Beauty
            </li>
          </ul>
        </div>

        {/* Promo Banner */}
        <div className=" col-span-3 w-full h-full bg-black text-white rounded-xl flex flex-row md:flex-row items-center justify-between px-10 py-10 relative overflow-hidden">
          {/* Text Section */}
          <div className="mb-6 md:mb-0 max-w-md">
            <p className="text-gray-400 tracking-wider text-sm mb-2">
              iPhone 14 Series
            </p>
            <h2 className="text-5xl font-semibold mb-4">
              Up to 10% off Voucher
            </h2>
            <button className="flex items-center gap-1 underline underline-offset-4 hover:text-gray-300">
              Shop Now <span>&rarr;</span>
            </button>
          </div>

          {/* Image Section */}
          <img
            src="./hero.png"
            alt="iPhone 14"
            className="w-full h-auto object-cover"
          />

          {/* Dots - Carousel indicators (static here) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === 0 ? "bg-white" : "bg-gray-600"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="m-20">
        <div className="flex">
          <div className="h-7 w-3 rounded-sm bg-red-500"></div>
          <p className="text-sm text-red-500 font-bold ml-5">Today's</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Flash Sales</h1>
          <div>
            <i className="fa-solid fa-arrow-left text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm"></i>
            <i className="fa-solid fa-arrow-right text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm "></i>
          </div>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 p-4 ">
          {items
            .filter((_, index) => index % 2 !== 0)
            .slice(0, 4) // sirf pehle 4
            .map((product) => (
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
                        wishlistMap[product._id]
                          ? "fa-solid text-red-500"
                          : "fa-regular"
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
                    $
                    {product.price -
                      (product.price * (product.discount || 0)) / 100}
                  </span>
                  {product.discount && (
                    <span className="line-through text-gray-400">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center text-sm mt-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating || 4.5) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-1 text-gray-500 text-xs">
                    ({product.reviewCount || 99})
                  </span>
                </div>

                {/* Description */}
                {product.description.length > 100 ? (
                  <p className="text-xs">
                    {product.description.slice(0, 100)}...
                    <span className="text-black-500 cursor-pointer text-sm">
                      {" "}
                      Show more
                    </span>
                  </p>
                ) : (
                  <p className="text-xs">{product.description}</p>
                )}
              </Link>
            ))}
        </div>
        <div className="text-center m-8">
          <Link
            to="/products"
            className="bg-red-500  text-white px-5 py-2 font-lighter"
          >
            View All Products
          </Link>
        </div>
        <div className="flex">
          <div className="h-7 w-3 rounded-sm bg-red-500"></div>
          <p className="text-sm text-red-500 font-bold ml-5">Cateogries</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Browse by Cateogry</h1>
          <div>
            <i className="fa-solid fa-arrow-left text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm"></i>
            <i className="fa-solid fa-arrow-right text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm "></i>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-5">
          {icons.map((pro) => (
            <div className="border border-gray-400 rounded-md px-7 py-10 text-center mt-8 hover:bg-red-500 hover:text-white">
              <i className={`${pro.name} text-2xl`}></i>
              <p className="text-sm text-gray-500 m-2">{pro.id}</p>
            </div>
          ))}
        </div>
        <div className="flex mt-8">
          <div className="h-7 w-3 rounded-sm bg-red-500"></div>
          <p className="text-sm text-red-500 font-bold ml-5">This Month</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Best Selling Product</h1>
          <div>
            <Link
              to="/products"
              className="bg-red-500  text-white px-6 py-2 font-lighter"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 p-4 ">
          {items
            .filter((_, index) => index % 7 !== 0)
            .slice(0, 4) // sirf pehle 4
            .map((product) => (
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
                        wishlistMap[product._id]
                          ? "fa-solid text-red-500"
                          : "fa-regular"
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
                    $
                    {product.price -
                      (product.price * (product.discount || 0)) / 100}
                  </span>
                  {product.discount && (
                    <span className="line-through text-gray-400">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center text-sm mt-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating || 4.5) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-1 text-gray-500 text-xs">
                    ({product.reviewCount || 99})
                  </span>
                </div>

                {/* Description */}
                {product.description.length > 100 ? (
                  <p className="text-xs">
                    {product.description.slice(0, 100)}...
                    <span className="text-black-500 cursor-pointer text-sm">
                      {" "}
                      Show more
                    </span>
                  </p>
                ) : (
                  <p className="text-xs">{product.description}</p>
                )}
              </Link>
            ))}
        </div>
        <div className="grid grid-cols-2 bg-black p-10 rounded-sm mt-8">
            <div className="p-5">
              <p className="text-sm  text-green-400 m-4">Cateogries</p>
              <h1 className="text-5xl text-white m-3 font-semibold">Enhance Your Music Experience</h1>
              <button className="bg-green-400 text-white px-7 py-2 text-sm m-4">Buy Now</button>
              <div>
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
            <div>
              <img src="./78.png" alt="" />
            </div>
        </div>
          <div className="flex mt-8">
          <div className="h-7 w-3 rounded-sm bg-red-500"></div>
          <p className="text-sm text-red-500 font-bold ml-5">Our Products</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Explore Our Products</h1>
          <div>
            <i className="fa-solid fa-arrow-left text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm"></i>
            <i className="fa-solid fa-arrow-right text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm "></i>
          </div>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 p-4 ">
          {items
            .filter((_, index) => index % 3 !== 0)
            .slice(0, 8) // sirf pehle 4
            .map((product) => (
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
                        wishlistMap[product._id]
                          ? "fa-solid text-red-500"
                          : "fa-regular"
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
                    $
                    {product.price -
                      (product.price * (product.discount || 0)) / 100}
                  </span>
                  {product.discount && (
                    <span className="line-through text-gray-400">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center text-sm mt-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating || 4.5) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-1 text-gray-500 text-xs">
                    ({product.reviewCount || 99})
                  </span>
                </div>

                {/* Description */}
                {product.description.length > 100 ? (
                  <p className="text-xs">
                    {product.description.slice(0, 100)}...
                    <span className="text-black-500 cursor-pointer text-sm">
                      {" "}
                      Show more
                    </span>
                  </p>
                ) : (
                  <p className="text-xs">{product.description}</p>
                )}
              </Link>
            ))}
        </div>
         <div className="text-center m-8">
          <Link
            to="/products"
            className="bg-red-500  text-white px-5 py-2 font-lighter"
          >
            View All Products
          </Link>
        </div>
           <div className="flex mt-8">
          <div className="h-7 w-3 rounded-sm bg-red-500"></div>
          <p className="text-sm text-red-500 font-bold ml-5">Featured</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">New Arrival</h1>
          <div>
            <i className="fa-solid fa-arrow-left text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm"></i>
            <i className="fa-solid fa-arrow-right text-gray-500 m-2 p-3 bg-white border rounded-full border-gray-300 shadow-sm "></i>
          </div>
        </div>
       <div className="grid grid-cols-2 h-screen rounded-md">
  {/* Left Side: Gamer Image */}
  <div className="bg-[url('./gamer.png')] bg-cover bg-center bg-black rounded-md  ">
  <div className=" mt-120 m-15">
  <h1 className="text-5xl text-white">Play Station 5</h1>
  <p className="text-md text-gray-400">Black and White version of the PS5 coming out on sale.</p>
  <button className="underline underline-offset-4 text-white">Shop Now</button>
  </div>
  </div>

  {/* Right Side: 2 Rows */}
  <div className="grid grid-rows-2 p-6 gap-4 bg-gray-100">
    {/* Top Row */}
    <div className="bg-[url('./women.png')] rounded-xl shadow-md  bg-cover text-xl font-semibold">
        <div className="  m-10 mt-50">
  <h1 className="text-2xl text-white">Women's Collections</h1>
  <p className="text-sm text-gray-400">Featured woman collections that give you another vibe.</p>
  <button className="underline underline-offset-4 text-white text-sm font-lighter">Shop Now</button>
  </div>
    </div>

    {/* Bottom Row: 2 Columns */}
    <div className="grid grid-cols-2 gap-4  text-white ">
      <div className="bg-[url('./speaker.png')] bg-cover rounded-xl shadow-md flex items-center justify-center bg-black ml-5">
         <div className="  m-10 mt-50">
  <h1 className="text-2xl text-white">Speakers</h1>
  <p className="text-xs text-gray-400">Amazon wireless speakers</p>
  <button className="underline underline-offset-4 text-white text-sm font-lighter">Shop Now</button>
  </div>
      </div>
       <div className="bg-[url('./perfume.png')] bg-cover bg-no-repeat rounded-xl shadow-md flex items-center justify-center bg-black ml-5">
         <div className="  m-10 mt-50">
  <h1 className="text-2xl text-white">Perfume</h1>
  <p className="text-xs text-gray-400">GUCCI INTENSE OUD EDP</p>
  <button className="underline underline-offset-4 text-white text-sm font-lighter">Shop Now</button>
  </div>
      </div>
    </div>
  </div>
</div>
{/* Feature Icons Section */}
<div className="m-30 max-w-6xl mx-auto px-4 grid grid-cols-3 sm:grid-cols-3 gap-8 text-center">
  {/* Free Delivery */}
  <div>
    <div className="text-4xl mb-4 text-black">
      <i className="fas fa-truck-fast"></i>
    </div>
    <h4 className="font-semibold text-lg mb-1">FREE AND FAST DELIVERY</h4>
    <p className="text-sm text-gray-500">Free delivery for all orders over $140</p>
  </div>

  {/* 24/7 Support */}
  <div>
    <div className="text-4xl mb-4 text-black">
      <i className="fas fa-headphones"></i>
    </div>
    <h4 className="font-semibold text-lg mb-1">24/7 CUSTOMER SERVICE</h4>
    <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
  </div>

  {/* Money Back */}
  <div>
    <div className="text-4xl mb-4 text-black">
      <i className="fas fa-shield-alt"></i>
    </div>
    <h4 className="font-semibold text-lg mb-1">MONEY BACK GUARANTEE</h4>
    <p className="text-sm text-gray-500">We return money within 30 days</p>
  </div>
</div>
      </div>
    </>
  );
}

export default Home;
