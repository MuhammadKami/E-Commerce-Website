import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    if (couponCode.trim() !== '') {
      setIsCouponApplied(true);
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 ">
      <h2 className="text-sm font-lighter mb-4">Shopping Cart</h2>
      <div className='grid grid-cols-4 gap-5 bg-gray-100 shadow-md h-15 flex justify-center items-center text-center border-none rounded-md'>
        <div><p>Product</p></div>
        <div><p>Price</p></div>
        <div><p>Quantity</p></div>
        <div><p>Total</p></div>
      </div>
    
      {items.map(item => (
       <div key={item._id} className="flex justify-center items-center text-center p-2 border-none rounded-lg mb-2 grid grid-cols-4 gap-8 shadow-xl mt-5 ">
          <div className='flex justify-between'>
            <img src={`http://localhost:5000${item.image}`} alt="" className='h-10 w-10 object-cover m-5 border-none rounded-md' />
            <p className="font-bold text-sm">{item.name}</p>
           
          </div>
           <p className='ml-[70px]'>${item.price}</p>
          <div>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
              className="border p-1 w-16 mr-2 ml-[70px] rounded-md"
            />
          </div>
          <div className='text-center'>
           <h3 className="text-md"> ${(item.price * item.quantity).toFixed(2)}</h3>
           </div>
        </div>
        
      ))}
      
      <div className="m-4 flex justify-between items-center text-center">
         <button onClick={() => dispatch(clearCart())} className="bg-white-500 text-black px-4 py-2 mt-2 border cursor-pointer">Clear Cart</button>
        
       <button onClick={() => navigate("/products") } className="bg-white-500 text-black px-4 py-2 mt-2 border cursor-pointer ">Return to Shop</button>
      </div>
      <div className="border rounded p-4 w-full max-w-sm bg-white shadow ml-150 mb-20 mt-25">
      <h2 className="text-lg font-semibold mb-4">Cart Total</h2>

      <div className="flex justify-between text-sm py-1 border-b">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm py-1 border-b">
        <span>Shipping:</span>
        <span className="text-green-600 font-medium">Free</span>
      </div>

      {isCouponApplied && (
        <div className="flex justify-between text-sm py-1 border-b text-green-600">
          <span>Coupon Discount:</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm py-1 font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Coupon Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border rounded-md py-2 px-4 placeholder:text-sm w-full mb-2"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-red-500 text-white px-6 py-2 w-full rounded hover:bg-red-600 transition"
        >
          Apply Coupon
        </button>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Proceed to checkout
      </button>
    </div>
     </div>
  );
}
