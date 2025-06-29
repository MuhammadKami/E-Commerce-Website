import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../features/cart/cartSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
const elements = useElements();
const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { items, totalAmount } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    paymentMethod: 'Visa',
  });

  const [orderSent, setOrderSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const placeOrder = async () => {
  setIsPlacingOrder(true);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to place an order.");
    setIsPlacingOrder(false);
    return;
  }

  if (formData.paymentMethod === 'Cash on delivery') {
    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          ...formData,
          items,
          total: totalAmount,
          paymentMethod: 'Cash on delivery',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(clearCart());
      navigate('/thank-you');
    } catch (err) {
      console.error(err);
      alert('Failed to place COD order');
    } finally {
      setIsPlacingOrder(false);
    }
  } else if (formData.paymentMethod === 'Visa') {
    if (!stripe || !elements) return;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { total: totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 add here too
          },
        }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.firstName,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await axios.post(
          'http://localhost:5000/api/orders',
          {
            ...formData,
            items,
            total: totalAmount,
            paymentMethod: 'Visa',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(clearCart());
        navigate('/thank-you');
      }
    } catch (err) {
      console.error(err);
      alert('Visa payment failed');
    } finally {
      setIsPlacingOrder(false);
    }
  } else {
    alert('Please select a payment method');
    setIsPlacingOrder(false);
  }
};

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-10 p-8 max-w-6xl mx-auto">
      {/* Billing Details */}
      <div>
        <h2 className="text-2xl font-lighter mb-6">Billing Details</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input name="firstName" placeholder="First Name*" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input name="companyName" placeholder="Company Name" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input name="streetAddress" placeholder="Street Address*" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input name="apartment" placeholder="Apartment, floor, etc. (optional)" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input name="city" placeholder="Town/City*" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input name="phone" placeholder="Phone Number*" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
          <input type="email" name="email" placeholder="Email Address*" onChange={handleChange} className="w-full bg-gray-100 p-4 placeholder:text-sm" />
        </form>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <h2 className="text-xl font-lighter mb-4">Order Summary</h2>

        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-10 h-10 object-cover" />
                <span>{item.name}</span>
              </div>
              <span>${item.price} × {item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
  <h3 className="font-semibold">Payment Method</h3>

  {/* Visa Radio */}
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="paymentMethod"
      value="Visa"
      checked={formData.paymentMethod === 'Visa'}
      onChange={handleChange}
      className="accent-red-500"
    />
    <span>Visa / Card Payment</span>
  </label>

  {/* Cash Radio */}
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="paymentMethod"
      value="Cash on delivery"
      checked={formData.paymentMethod === 'Cash on delivery'}
      onChange={handleChange}
      className="accent-red-500"
    />
    <span>Cash on Delivery</span>
  </label>

  {/* Show CardElement only if Visa is selected */}
  {formData.paymentMethod === 'Visa' && (
    <div className="space-y-2 mt-2">
      <label className="font-semibold">Card Info (Visa, Mastercard, etc.)</label>
      <div className="border p-2 rounded bg-white">
        <CardElement />
      </div>
    </div>
  )}
</div>


        {/* Place Order */}
       <button
  className="w-full bg-red-500 text-white py-3  font-lighter cursor-pointer"
  onClick={placeOrder}
  disabled={isPlacingOrder}
>
  {isPlacingOrder ? 'Ordering...' : 'Place Order'}
</button>


        {orderSent && (
          <p className="text-green-600 font-medium mt-4">✅ Order placed successfully!</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;