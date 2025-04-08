import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCreditCard, FaPaypal, FaApple, FaGoogle } from "react-icons/fa";
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover } from "react-icons/si";
import { FiChevronRight } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentOptions = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();

  const paymentMethods = [
    {
      category: "Credit & Debit Cards",
      options: [
        { name: "Visa", icon: <SiVisa className="text-blue-900 text-2xl" /> },
        { name: "Mastercard", icon: <SiMastercard className="text-red-600 text-2xl" /> },
        { name: "American Express", icon: <SiAmericanexpress className="text-blue-500 text-2xl" /> },
        { name: "Discover", icon: <SiDiscover className="text-orange-600 text-2xl" /> }
      ]
    },
    {
      category: "Digital Wallets",
      options: [
        { name: "PayPal", icon: <FaPaypal className="text-blue-700 text-2xl" /> },
        { name: "Apple Pay", icon: <FaApple className="text-gray-800 text-2xl" /> },
        { name: "Google Pay", icon: <FaGoogle className="text-green-600 text-2xl" /> }
      ]
    }
  ];

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    toast.success(`${paymentMethod} selected!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Instead of navigating to order-summary, navigate to order-confirmation
    setTimeout(() => {
      navigate("/order-confirmation", { state: { paymentMethod } });
    }, 2500); // Delay navigation slightly to show the toast
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center text-teal-600 mb-3">
            <FaLock className="mr-2" />
            <span className="text-sm font-medium">SECURE CHECKOUT</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Payment Method</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Choose your preferred payment option to complete your purchase
          </p>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {paymentMethods.map((section, index) => (
            <div key={index} className={index !== paymentMethods.length - 1 ? "border-b border-gray-200" : ""}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-teal-600" />
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.options.map((method) => (
                    <button
                      key={method.name}
                      onClick={() => handlePaymentSelection(method.name)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                        selectedPayment === method.name
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-4">{method.icon}</div>
                        <span className="font-medium text-gray-800">{method.name}</span>
                      </div>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Assurance */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <FaLock className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Payment Guarantee</h3>
              <p className="text-gray-600 text-sm">
                Your payment information is processed securely. We do not store credit card details
                and implement industry-standard encryption for all transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Shipping
          </button>
          {/* The "Continue to Review" button is now disabled and the navigation happens on selection */}
          <button
            disabled={true}
            className={`px-6 py-3 rounded-lg text-white font-medium bg-gray-300 cursor-not-allowed transition-colors`}
          >
            Continue to Review
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentOptions;


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









// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

// const PaymentOptions = () => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const navigate = useNavigate();

//   // Handle payment selection and navigate to Order Summary
//   const handlePaymentSelection = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method first.");
//       return;
//     }
//     navigate("/order-summary", { state: { paymentMethod } });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
//         Choose Your Payment Method
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Credit/Debit Card */}
//         <div
//           onClick={() => setPaymentMethod("credit_card")}
//           className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
//             paymentMethod === "credit_card" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300"
//           }`}
//         >
//           <FaCreditCard className="text-blue-600 text-4xl mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-center text-gray-800">Credit / Debit Card</h3>
//           <p className="text-center text-gray-600 text-sm mt-1">
//             Pay securely with Visa, MasterCard, or Rupay.
//           </p>
//         </div>

//         {/* UPI / Net Banking */}
//         <div
//           onClick={() => setPaymentMethod("upi")}
//           className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
//             paymentMethod === "upi" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-300"
//           }`}
//         >
//           <FaMobileAlt className="text-green-600 text-4xl mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-center text-gray-800">UPI / Net Banking</h3>
//           <p className="text-center text-gray-600 text-sm mt-1">
//             Pay via UPI (Google Pay, Paytm, PhonePe).
//           </p>
//         </div>

//         {/* Cash on Delivery */}
//         <div
//           onClick={() => setPaymentMethod("cod")}
//           className={`p-5 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
//             paymentMethod === "cod" ? "border-yellow-500 bg-yellow-50 shadow-md" : "border-gray-300"
//           }`}
//         >
//           <FaMoneyBillWave className="text-yellow-600 text-4xl mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-center text-gray-800">Cash on Delivery</h3>
//           <p className="text-center text-gray-600 text-sm mt-1">
//             Pay with cash upon delivery at your doorstep.
//           </p>
//         </div>
//       </div>

//       {/* Proceed Button */}
//       <button
//         onClick={handlePaymentSelection}
//         className="w-full bg-blue-600 text-white py-3 mt-8 rounded-lg text-lg font-medium tracking-wide hover:bg-blue-700 transition duration-300"
//       >
//         Proceed to Order Summary
//       </button>
//     </div>
//   );
// };

// export default PaymentOptions;
