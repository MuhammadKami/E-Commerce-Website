import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
function Navbar() {
  const { user } = useSelector((state) => state.auth);
 const { wishlist } = useSelector((state) => state.user); // from userSlice
const { items: cartItems } = useSelector((state) => state.cart); // from cartSlice

  const dispatch = useDispatch();
  return (
    <>
      <nav className="bg-white-100 border-b border-gray-200">
        {/* Top Banner */}
        <div className="bg-black text-white w-full py-2 px-4 text-center text-xs sm:text-sm flex justify-center items-center">
          <p className="max-w-[90%] sm:max-w-[70%]">
            Summer Sale For All Swim Suits and Express Delivery with
            <span className="underline underline-offset-[2px] ml-1">
              50% OFF Shop Now
            </span>
          </p>
        </div>
        {/* Bottom Banner */}
        <div className="flex justify-between text-center items-center w-full h-20">
          <div className="flex justify-center text-center items-center">
            <h1 className="font-bold text-2xl m-9 tracking-wide">Exlusive</h1>
          </div>
          <div className="flex justify-between">
            <Link to="/" className="m-5 hover:underline cursor-pointer">
              Home
            </Link>
            <Link to="/contact" className="m-5 hover:underline cursor-pointer">
              Contact
            </Link>
            <Link to="/about" className="m-5 hover:underline cursor-pointer">
              About
            </Link>
            <Link to="/products" className="m-5 hover:underline cursor-pointer">
              Products
            </Link>
            {user ? (
              <button
                onClick={() => dispatch(logout())}
                className="text-black-500 text-base m-5 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/signup" className="m-5 hover:underline cursor-pointer">
                SignUp
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4 mr-9 w-full max-w-md">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="pl-9 pr-4 py-2 h-9 w-full border-none placeholder:text-sm bg-gray-100 rounded-md focus:outline-none"
              />
            </div>
            <Icon />
           {/* Wishlist Icon */}
<div className="relative m-2">
  <Link to="/wishlist" className="fa-regular fa-heart text-lg"></Link>
  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
      {wishlist.length}
    </span>
  )}
</div>

{/* Cart Icon */}
<div className="relative m-2">
  <Link to="/cart" className="fa-solid fa-bag-shopping text-lg"></Link>
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5  rounded-full">
      {cartItems.length}
    </span>
  )}
</div>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
