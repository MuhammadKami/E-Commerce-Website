import React from "react";

function About() {
  return (
    <>
   <div className="py-20">
  <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 items-center ">
    {/* Text Section */}
    <div className="m-20">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-4">
        Our Story
      </h1>
      <p className="text-sm lg:text-base mb-6 mt-20">
        Launched in 2015, Exclusive is South Asia’s premier online shopping
        marketplace with an active presence in Bangladesh. Supported by a wide
        range of tailored marketing, data, and service solutions, Exclusive
        has 10,500 sellers and 300 brands and serves 3 million customers
        across the region.
      </p>
      <p className="text-sm lg:text-base">
        Exclusive has more than 1 million products to offer, growing very
        fast. Exclusive offers a diverse assortment in categories ranging
        from consumer goods to electronics and more.
      </p>
    </div>

    {/* Image Section */}
    <div className="flex justify-end lg:justify-end ">
      <img
        src="./p.png"
        alt="Our Story"
        className="w-full max-w-lg object-contain pr-0 mr-0"
      />
    </div>
  </div>
</div>

<div className="p-10 grid grid-cols-4 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-10">
  <div className="border border-gray-300  p-6 flex flex-col items-center text-center shadow-md  hover:bg-red-400 hover:text-white">
    <div className="border border-gray-200 rounded-full p-4 flex items-center justify-center w-16 h-16 mb-4 bg-white hover:bg-black">
      <i className="fa-solid fa-house text-2xl text-gray-700 hover:text-white"></i>
    </div>
    <h1 className="text-2xl font-bold">10.5K</h1>
    <p className="text-sm mt-2 text-gray-500 hover:text-white">Sellers active on our site</p>
  </div>

  {/* You can copy the same structure for other boxes */}
  <div className="border border-gray-300  p-6 flex flex-col items-center text-center shadow-md  hover:bg-red-400 hover:text-white">
    <div className="border border-gray-200 rounded-full p-4 flex items-center justify-center w-16 h-16 mb-4 bg-white">
      <i className="fa-solid fa-cart-shopping text-2xl text-gray-700"></i>
    </div>
    <h1 className="text-2xl font-bold">33K</h1>
    <p className="text-sm mt-2 text-gray-500">Monthly product sales</p>
  </div>

  <div className="border border-gray-300  p-6 flex flex-col items-center text-center shadow-md  hover:bg-red-400 hover:text-white">
    <div className="border border-gray-200 rounded-full p-4 flex items-center justify-center w-16 h-16 mb-4 bg-white">
      <i className="fa-solid fa-user text-2xl text-gray-700"></i>
    </div>
    <h1 className="text-2xl font-bold">45K</h1>
    <p className="text-sm mt-2 text-gray-500">Registered users</p>
  </div>

  <div className="border border-gray-300 p-6 flex flex-col items-center text-center shadow-md  hover:bg-red-400 hover:text-white">
    <div className="border border-gray-200 rounded-full p-4 flex items-center justify-center w-16 h-16 mb-4 bg-white">
      <i className="fa-solid fa-globe text-2xl text-gray-700"></i>
    </div>
    <h1 className="text-2xl font-bold">99+</h1>
    <p className="text-sm mt-2 text-gray-500">Global partners</p>
  </div>
</div>
<div className="py-16 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leadership</h2>

  <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
    {/* Member 1 */}
    <div className="text-left">
      <img
        src="./image 46.png"
        alt="Tom Cruise"
        className="w-full h-[300px] object-contain mx-auto mb-4 "
      />
      <h3 className="text-xl font-semibold">Tom Cruise</h3>
      <p className="text-sm text-gray-500">Founder & Chairman</p>
      <div className="flex justify-start gap-4 mt-2 text-gray-600 text-xl">
        <a href="#"><i className="fab fa-twitter hover:text-blue-500"></i></a>
        <a href="#"><i className="fab fa-instagram hover:text-pink-500"></i></a>
        <a href="#"><i className="fab fa-linkedin hover:text-blue-700"></i></a>
      </div>
    </div>

    {/* Member 2 */}
    <div className="text-left">
      <img
        src="./image 51.png"
        alt="Emma Watson"
        className="w-full h-[300px] object-contain mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold">Emma Watson</h3>
      <p className="text-sm text-gray-500">Managing Director</p>
      <div className="flex justify-start gap-4 mt-2 text-gray-600 text-xl">
        <a href="#"><i className="fab fa-twitter hover:text-blue-500"></i></a>
        <a href="#"><i className="fab fa-instagram hover:text-pink-500"></i></a>
        <a href="#"><i className="fab fa-linkedin hover:text-blue-700"></i></a>
      </div>
    </div>

    {/* Member 3 */}
    <div className="text-left">
      <img
        src="./image 47.png"
        alt="Will Smith"
        className="w-full h-[300px] object-contain mx-auto mb-4 "
      />
      <h3 className="text-xl font-semibold">Will Smith</h3>
      <p className="text-sm text-gray-500">Product Designer</p>
      <div className="flex justify-start gap-4 mt-2 text-gray-600 text-xl">
        <a href="#"><i className="fab fa-twitter hover:text-blue-500"></i></a>
        <a href="#"><i className="fab fa-instagram hover:text-pink-500"></i></a>
        <a href="#"><i className="fab fa-linkedin hover:text-blue-700"></i></a>
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

</>
  );
}

export default About;
