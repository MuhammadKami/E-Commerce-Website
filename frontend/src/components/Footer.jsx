import React from "react";

function Footer() {
  return (
    <div className="bg-black text-white w-full py-10 relative bottom-0 left-0 mt-70">
      <div className="grid grid-cols-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
        {/* Exclusive Section */}
        <div className="ml-5">
          <h1 className="text-lg font-bold mb-2">Exclusive</h1>
          <h4 className="text-sm mb-2">Subscribe</h4>
          <p className="text-sm mb-4">Get 10% OFF your first order</p>
          <div className="flex items-center bg-white rounded-md overflow-hidden w-full max-w-xs">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-black text-sm px-4 py-2 w-full focus:outline-none"
            />
            <button className="text-black px-3">
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Support</h1>
          <p className="text-sm mb-2">111 Bjoi DHA Phase-8 Karachi, Pakistan</p>
          <p className="text-sm mb-2">exclusive@gmail.com</p>
          <p className="text-sm mb-2">+08080 0880 58888</p>
        </div>

        {/* Account Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Account</h1>
          <ul className="text-sm space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Quick Link</h1>
          <ul className="text-sm space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* App Download Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Download App</h1>
          <p className="text-sm mb-4">Save $3 with App for New Users Only</p>
          <div className="flex gap-4 items-start">
            {/* QR Code */}
            <img
              src="/path-to-your-qr.png"
              alt="QR Code"
              className="w-20 h-20 object-contain"
            />

            {/* App Buttons */}
            <div className="flex flex-col gap-2">
              <img
                src="/path-to-playstore.png"
                alt="Google Play"
                className="w-32 object-contain"
              />
              <img
                src="/path-to-appstore.png"
                alt="App Store"
                className="w-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
