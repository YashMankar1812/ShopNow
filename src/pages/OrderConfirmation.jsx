import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMoneyBillAlt, FaTruck, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Import the useCart hook

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const paymentMethod = state?.paymentMethod;
  const { cartItems, clearCart } = useCart(); // Changed 'cart' to 'cartItems'

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingFee = 15.00; // Example shipping fee
  const totalAmount = subtotal + shippingFee;

  const handleGoToOrders = () => {
    navigate('/orders');
  };

  const handleGoToShop = () => {
    navigate('/categories');
  };

  useEffect(() => {
    console.log('Order submitted with items:', cartItems, 'payment method:', paymentMethod);
    clearCart();
  }, [cartItems, paymentMethod, clearCart]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <FaCheckCircle className="text-teal-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your order. We are processing it now.</p>
          <p className="text-gray-600">You will receive a confirmation email shortly.</p>
        </div>

        {/* Order Details */}
        {/* <div className="mb-6 border-b border-gray-200 pb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <FaMoneyBillAlt className="mr-2 text-teal-500" /> Order Summary
          </h3>
          <p className="text-gray-700">Order ID: TEMP-ID</p>
          <p className="text-gray-700">Order Date: {new Date().toLocaleDateString()}</p>
          <ul className="mt-4 space-y-2">
            {cartItems.map((item) => ( // Now mapping over cartItems
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} ({item.qty})</span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between font-medium text-gray-800">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-800">
              <span>Shipping Fee:</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold text-gray-900">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div> */}

        {/* Payment Information */}
        {/* {paymentMethod && (
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <FaCreditCard className="mr-2 text-teal-500" /> Payment Method
            </h3>
            <p className="text-gray-700">Selected: {paymentMethod}</p>
          </div>
        )} */}

        {/* Shipping Information */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <FaTruck className="mr-2 text-teal-500" /> Shipping To
          </h3>
          <address className="text-gray-700">
            Shipping address will be displayed here.
          </address>
        </div> */}

        {/* Next Steps */}
        {/* <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoToOrders}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md shadow-md transition-colors"
          >
            View Orders
          </button>
          <button
            onClick={handleGoToShop}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md shadow-md transition-colors"
          >
            Continue Shopping
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OrderConfirmation;