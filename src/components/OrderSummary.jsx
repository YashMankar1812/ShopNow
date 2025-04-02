// import { useCart } from "../context/CartContext";

// const { cart } = useCart();  

// console.log(cart); // Debugging: Check if cart is defined
// console.log(Array.isArray(cart));

// const OrderSummary = () => {
//   const { cart, totalPrice } = useCart();

//   if (!cart) {
//     return <p>Loading cart...</p>;  // Handle undefined cart
// }

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//       {cart.length === 0 ? (
//         <p className="text-gray-500">No items in cart.</p>
//       ) : (
//         cart.map((item) => (
//           <div key={item.id} className="flex justify-between mb-2">
//             <span>{item.name} × {item.quantity}</span>
//             <span>₹{item.price * item.quantity}</span>
//           </div>
//         ))
//       )}
//       <hr className="my-2" />
//       <h3 className="font-bold text-lg">Total: ₹{totalPrice}</h3>
//     </div>
//   );
// };

// export default OrderSummary;

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const OrderSummary = () => {
  const { cart = [] } = useCart(); // Ensure cart is always an array
  const navigate = useNavigate();

  // Use default quantity of 1 if item.qty is missing
  const totalAmount = cart?.reduce((acc, item) => acc + item.price * (item.qty || 1), 0) || 0;

  const handleConfirmOrder = () => {
    toast.success("Order confirmed successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      onClose: () => navigate("/shop"),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Order Summary</h2>

        {/* Order Items */}
        <div className="mb-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
                <span className="text-lg">
                  {item.name} (x{item.qty || 1})
                </span>
                <span className="text-lg font-semibold">₹{item.price * (item.qty || 1)}</span>
              </div>
            ))
          ) : (
            <p className="text-lg text-red-500">No items in cart.</p>
          )}
        </div>

        {/* Total Price */}
        <div className="flex justify-between text-xl font-semibold border-t pt-4">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>

        {/* Confirm Order Button */}
        <button
          className="w-full bg-teal-500 text-white py-3 mt-6 rounded hover:bg-teal-700 text-lg font-semibold"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrderSummary;







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






