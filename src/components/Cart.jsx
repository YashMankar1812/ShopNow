

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { ImBin2 } from "react-icons/im";
// import EmptyCart from "./EmptyCart";

// const Cart = () => {
//   const { cartItems, updateQuantity, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const tax = subtotal * 0.08;
//   const total = subtotal + tax;

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   if (cartItems.length === 0) {
//     return <EmptyCart />;
//   }

//   return (
//     <div className="container mx-auto p-6 font-poppins">
//       <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center sm:text-left">
//         Shopping Cart
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Price Breakdown */}
//         <aside className="bg-gray-50 p-6 rounded-lg shadow-md md:order-first">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">
//             Order Summary
//           </h3>
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-600">Subtotal:</span>
//             <span className="font-medium">${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-600">Tax (8%):</span>
//             <span className="font-medium">${tax.toFixed(2)}</span>
//           </div>
//           <hr className="my-3" />
//           <div className="flex justify-between font-semibold text-lg text-gray-800">
//             <span>Total:</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//           <button
//             className="w-full bg-green-600 text-white py-3 mt-6 rounded-md hover:bg-green-700 transition-colors"
//             onClick={handleCheckout}
//           >
//             Proceed to Checkout
//           </button>
//         </aside>

//         {/* Cart Table */}
//         <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 border-b">
//                 <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700">
//                   Product
//                 </th>
//                 <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700">
//                   Price
//                 </th>
//                 <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700">
//                   Quantity
//                 </th>
//                 <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id} className="border-b hover:bg-gray-50">
//                   <td className="py-4 px-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                   </td>
//                   <td className="py-4 px-4 text-gray-700">{item.name}</td>
//                   <td className="py-4 px-4 text-gray-700">
//                     ${item.price.toFixed(2)}
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.qty - 1)}
//                         className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={item.qty <= 1}
//                       >
//                         -
//                       </button>
//                       <span className="text-gray-700">{item.qty}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.qty + 1)}
//                         className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500 hover:text-red-600 transition-colors"
//                     >
//                       <ImBin2 size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiTrash2, FiChevronLeft, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingFee + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleRemoveItem = (itemId, itemName) => {
    removeFromCart(itemId);
    toast.success(`${itemName} removed from cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty < 1) return;
    updateQuantity(itemId, newQty);
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handleContinueShopping}
            className="flex items-center text-teal-600 hover:text-teal-800 font-bold transition-colors"
          >
            <FiChevronLeft className="mr-1" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-2 md:grid-cols-12 p-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-2 md:col-span-5 flex items-center">
                      <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 text-center mt-4 md:mt-0">
                      <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-1 md:col-span-3 flex justify-center mt-4 md:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-900">{item.qty}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="col-span-2 md:col-span-2 flex items-center justify-end mt-4 md:mt-0 space-x-4">
                      <p className="text-gray-900 font-medium">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared successfully", {
                      position: "bottom-right",
                      autoClose: 2000,
                    });
                  }}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-3 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                or{' '}
                <button
                  onClick={handleContinueShopping}
                  className="text-teal-600 hover:text-teal-800 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

