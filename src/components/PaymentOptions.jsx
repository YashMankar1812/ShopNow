// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // For navigation

// const PaymentOptions = () => {
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const navigate = useNavigate();

//   // Handle payment selection and navigate to Order Summary
//   const handlePaymentSelection = (paymentMethod) => {
//     setSelectedPayment(paymentMethod);
//     navigate("/order-summary", { state: { paymentMethod } }); // Pass selected payment option
//   };

//   return (
//     <div className="min-h-screen bg-white-50 flex flex-col items-center mt-20 py-8 px-4">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//         Secure Payment Methods
//       </h1>
//       <div className="max-w-4xl rounded-lg shadow-lg p-6 sm:p-8">
//         <p className="text-gray-600 mb-6 text-center">
//           Choose from our variety of secure payment options
//         </p>

//         <div className="space-y-8">
//           {/* Credit & Debit Cards */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Credit & Debit Cards
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {["Visa", "Mastercard", "Amex", "Discover"].map((card) => (
//                 <button
//                   key={card}
//                   onClick={() => handlePaymentSelection(card)}
//                   className="border border-gray-300 rounded-lg py-2 px-4 flex justify-center items-center hover:bg-blue-50"
//                 >
//                   {card}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Digital Payments */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Digital Payments
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//               {["PayPal", "Apple Pay", "Google Pay"].map((method) => (
//                 <button
//                   key={method}
//                   onClick={() => handlePaymentSelection(method)}
//                   className="border border-gray-300 rounded-lg py-2 px-4 flex justify-center items-center hover:bg-blue-50"
//                 >
//                   {method}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-gray-500 mt-6 text-sm">
//           Need help with payment?{" "}
//           <a href="#" className="text-blue-600 hover:underline">
//             Contact Support
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentOptions;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  // Handle payment selection and navigate to Order Summary
  const handlePaymentSelection = () => {
    if (!paymentMethod) {
      alert("Please select a payment method first.");
      return;
    }
    navigate("/order-summary", { state: { paymentMethod } });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Choose Your Payment Method
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credit/Debit Card */}
        <div
          onClick={() => setPaymentMethod("credit_card")}
          className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
            paymentMethod === "credit_card" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300"
          }`}
        >
          <FaCreditCard className="text-blue-600 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-center text-gray-800">Credit / Debit Card</h3>
          <p className="text-center text-gray-600 text-sm mt-1">
            Pay securely with Visa, MasterCard, or Rupay.
          </p>
        </div>

        {/* UPI / Net Banking */}
        <div
          onClick={() => setPaymentMethod("upi")}
          className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
            paymentMethod === "upi" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-300"
          }`}
        >
          <FaMobileAlt className="text-green-600 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-center text-gray-800">UPI / Net Banking</h3>
          <p className="text-center text-gray-600 text-sm mt-1">
            Pay via UPI (Google Pay, Paytm, PhonePe).
          </p>
        </div>

        {/* Cash on Delivery */}
        <div
          onClick={() => setPaymentMethod("cod")}
          className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
            paymentMethod === "cod" ? "border-yellow-500 bg-yellow-50 shadow-md" : "border-gray-300"
          }`}
        >
          <FaMoneyBillWave className="text-yellow-600 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-center text-gray-800">Cash on Delivery</h3>
          <p className="text-center text-gray-600 text-sm mt-1">
            Pay with cash upon delivery at your doorstep.
          </p>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handlePaymentSelection}
        className="w-full bg-blue-600 text-white py-3 mt-8 rounded-lg text-lg font-medium tracking-wide hover:bg-blue-700 transition duration-300"
      >
        Proceed to Order Summary
      </button>
    </div>
  );
};

export default PaymentOptions;
