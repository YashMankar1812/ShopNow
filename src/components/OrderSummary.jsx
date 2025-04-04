import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FiArrowLeft, FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const OrderSummary = () => {
  const { cart = [], clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const shippingFee = subtotal > 1000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% tax
  const totalAmount = subtotal + shippingFee + tax;

  const handleConfirmOrder = () => {
    toast.success(
      <div className="flex items-center">
        <FiCheckCircle className="mr-2 text-xl" />
        Order confirmed successfully!
      </div>,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        onClose: () => {
          clearCart();
          navigate("/shop");
        },
      }
    );
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 mt-10 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-600 hover:text-teal-800 mr-4"
          >
            <FiArrowLeft className="mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Order Summary</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-medium text-gray-900">Your Items</h2>
              </div>

              {cart.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex">
                      <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between text-base">
                          <h3 className="text-gray-900">{item.name}</h3>
                          <p className="ml-4 font-medium">₹{item.price * (item.qty || 1)}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <p>Qty: {item.qty || 1}</p>
                          <p>{item.category || "General"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-gray-500">
                    Start adding some items to your cart to place an order.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleContinueShopping}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Total</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {cart.length > 0 && (
                <>
                  <div className="mt-8">
                    <button
                      onClick={handleConfirmOrder}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Confirm Order
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={handleContinueShopping}
                      className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Payment Methods */}
            {cart.length > 0 && (
              <div className="bg-white shadow-sm rounded-lg p-6 mt-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="payment-method"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="payment-method"
                      type="radio"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="upi"
                      name="payment-method"
                      type="radio"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                    />
                    <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                      UPI Payment
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default OrderSummary;

// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const OrderSummary = () => {
//   const { cart = [] } = useCart(); // Ensure cart is always an array
//   const navigate = useNavigate();

//   // Use default quantity of 1 if item.qty is missing
//   const totalAmount = cart?.reduce((acc, item) => acc + item.price * (item.qty || 1), 0) || 0;

//   const handleConfirmOrder = () => {
//     toast.success("Order confirmed successfully!", {
//       position: "bottom-center",
//       autoClose: 3000,
//       onClose: () => navigate("/shop"),
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-20">
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-3xl font-semibold mb-4 text-gray-800">Order Summary</h2>

//         {/* Order Items */}
//         <div className="mb-4">
//           {cart.length > 0 ? (
//             cart.map((item) => (
//               <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
//                 <span className="text-lg">
//                   {item.name} (x{item.qty || 1})
//                 </span>
//                 <span className="text-lg font-semibold">₹{item.price * (item.qty || 1)}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-lg text-red-500">No items in cart.</p>
//           )}
//         </div>

//         {/* Total Price */}
//         <div className="flex justify-between text-xl font-semibold border-t pt-4">
//           <span>Total:</span>
//           <span>₹{totalAmount}</span>
//         </div>

//         {/* Confirm Order Button */}
//         <button
//           className="w-full bg-teal-500 text-white py-3 mt-6 rounded hover:bg-teal-700 text-lg font-semibold"
//           onClick={handleConfirmOrder}
//         >
//           Confirm Order
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default OrderSummary;







// import React from "react";
// import { useLocation } from "react-router-dom";

// const OrderSummary = () => {
//   const location = useLocation();
//   const paymentMethod = location.state?.paymentMethod || "Not Selected";

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-gray-800">Order Summary</h1>
//       <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
//         <p className="text-gray-600 text-lg">Selected Payment Method:</p>
//         <p className="text-xl font-semibold text-blue-600">{paymentMethod}</p>

//         <button
//           onClick={() => alert("Proceeding to Payment...")}
//           className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;






