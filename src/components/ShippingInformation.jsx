// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaShippingFast, FaRegClock, FaGlobeAmericas, FaCheckCircle } from 'react-icons/fa';

// function ShippingInformation() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000, // Animation duration
//       easing: 'ease-in-out', // Animation easing
//       once: true, // Whether animation should happen only once
//     });
//   }, []);

//   return (
//     <div className="container mx-auto p-6 bg-white-50 mt-20 max-w-5xl font-poppins">
//       <h1
//         className="text-3xl font-bold text-center mb-8 text-gray-900"
//         data-aos="fade-down"
//       >
//         Shipping Information
//       </h1>
//       <p
//         className="text-lg text-center text-gray-600 mb-10"
//         data-aos="fade-up"
//       >
//         Learn about our shipping policies and delivery options.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* Standard Shipping */}
//         <div
//           className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:border-4 border-indigo-200 border-x-indigo-500"
//           data-aos="zoom-in"
//         >
//           <div className="flex items-center mb-6">
//             <FaShippingFast className="h-10 w-10 text-blue-500" />
//             <h2 className="text-xl font-semibold ml-4 text-gray-800">
//               Standard Shipping
//             </h2>
//           </div>
//           <ul className="space-y-4 text-gray-600">
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               5-7 business days
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               Free for orders over $50
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               Order tracking included
//             </li>
//           </ul>
//         </div>

//         {/* Express Shipping */}
//         <div
//           className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:border-4 border-indigo-200 border-x-indigo-500"
//           data-aos="zoom-in"
//         >
//           <div className="flex items-center mb-6">
//             <FaRegClock className="h-10 w-10 text-blue-500" />
//             <h2 className="text-xl font-semibold ml-4 text-gray-800">
//               Express Shipping
//             </h2>
//           </div>
//           <ul className="space-y-4 text-gray-600">
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               2-3 business days
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               Priority handling
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               Real-time tracking
//             </li>
//           </ul>
//         </div>

//         {/* International Shipping */}
//         <div
//           className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:border-4 border-indigo-200 border-x-indigo-500"
//           data-aos="zoom-in"
//         >
//           <div className="flex items-center mb-6">
//             <FaGlobeAmericas className="h-10 w-10 text-blue-500" />
//             <h2 className="text-xl font-semibold ml-4 text-gray-800">
//               International Shipping
//             </h2>
//           </div>
//           <ul className="space-y-4 text-gray-600">
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               7-14 business days
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               Customs clearance included
//             </li>
//             <li className="flex items-center">
//               <FaCheckCircle className="text-green-500 mr-3" />
//               International tracking
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Important Notes */}
//       <div
//         className="mt-12 bg-gray-50 p-6 rounded-lg shadow-lg"
//         data-aos="fade-up"
//       >
//         <h3 className="text-xl font-semibold text-gray-800">
//           Important Shipping Notes
//         </h3>
//         <ul className="space-y-4 text-gray-600">
//           <li className="flex items-center">
//             <FaCheckCircle className="text-green-500 mr-3" />
//             Shipping times may vary during peak seasons and holidays.
//           </li>
//           <li className="flex items-center">
//             <FaCheckCircle className="text-green-500 mr-3" />
//             Some locations may require additional delivery time.
//           </li>
//           <li className="flex items-center">
//             <FaCheckCircle className="text-green-500 mr-3" />
//             Tracking information will be emailed once your order ships.
//           </li>
//           <li className="flex items-center">
//             <FaCheckCircle className="text-green-500 mr-3" />
//             Contact customer service for special shipping requests.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ShippingInformation;




import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle, FaShippingFast, FaGlobe, FaClock } from "react-icons/fa";

const shippingOptions = [
  {
    title: "Standard Shipping",
    img: "https://media1.giphy.com/media/0T0FUiZl51VPCLsqLR/giphy.gif?cid=6c09b9520587sb7mxa7u34gyky76n9j75aolh3gb8cub85ry&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
    details: [
      "5-7 business days",
      "Free for orders over $50",
      "Order tracking included",
    ],
    // icon: <FaShippingFast className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Express Shipping",
    img: "https://media1.giphy.com/media/1ky8BtSFzfAS1tXZ4c/200w.gif?cid=6c09b952r8eem4cn1buj4gdyd9rjykl7pq5t0nw3aoutx0c0&ep=v1_gifs_search&rid=200w.gif&ct=g",
    details: [
      "2-3 business days",
      "Priority handling",
      "Real-time tracking",
    ],
    // icon: <FaClock className="w-8 h-8 text-green-500" />,
  },
  {
    title: "International Shipping",
    img: "https://www.modernretail.co/wp-content/uploads/sites/5/2021/12/container.gif",
    details: [
      "7-14 business days",
      "Customs clearance included",
      "International tracking",
    ],
    // icon: <FaGlobe className="w-8 h-8 text-purple-500" />,
  },
];

const importantNotes = [
  "Shipping times may vary during peak seasons.",
  "Some locations may require additional time.",
  "Tracking information will be emailed.",
  "Contact support for special requests.",
];

function ShippingInformation() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg mt-20 max-w-6xl font-poppins">
      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-4xl  text-teal-900 mb-4">
          Shipping Information
        </h1>
        <p className="text-lg text-gray-600">
          Learn about our shipping policies and delivery options.
        </p>
      </div>

      {/* Shipping Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-10">
        {shippingOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-teal-500"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src={option.img}
                alt={option.title}
                className="w-32 h-32 rounded-md mb-4"
              />
              <div className="flex items-center gap-2">
                {option.icon}
                <h2 className="text-xl font-semibold text-gray-800">
                  {option.title}
                </h2>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              {option.details.map((detail, i) => (
                <li key={i} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" /> {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Important Notes Section */}
      <div
        className="bg-gray-50 p-8 rounded-lg shadow-md my-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Important Shipping Notes
        </h3>
        <ul className="space-y-4 text-gray-600">
          {importantNotes.map((note, index) => (
            <li key={index} className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-3" /> {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Call-to-Action Section */}
      <div
        className="mt-12 bg-gradient-to-r from-black to-teal-600 p-10  rounded-lg text-white text-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2 className="text-3xl font-bold mb-4">Need Help with Shipping?</h2>
        <p className="text-lg mb-6">
          Our support team is here to assist you with any questions or special
          requests.
        </p>
        <button className="bg-white text-teal-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default ShippingInformation;