// import React, { useState, useEffect } from "react";
// import { FaBox, FaMapMarkerAlt, FaHeart, FaTrash } from "react-icons/fa";
// import Wishlist from "..pages/Wishlist";

// const UserDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     // Load orders, addresses, and wishlist from local storage
//     setOrders(JSON.parse(localStorage.getItem("orders")) || []);
//     setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
//     setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
//   }, []);

//   // Remove item from wishlist
//   const removeFromWishlist = (id) => {
//     const updatedWishlist = wishlist.filter((item) => item.id !== id);
//     setWishlist(updatedWishlist);
//     localStorage.setItem("Wishlist", JSON.stringify(updatedWishlist));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">👤 User Dashboard</h1>

//       {/* Orders Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
//           <FaBox /> My Orders
//         </h2>
//         {orders.length === 0 ? (
//           <p className="text-gray-600">No orders placed yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {orders.map((order, index) => (
//               <li key={index} className="p-3 border rounded-md flex justify-between">
//                 <span>📦 Order #{order.id} - {order.status}</span>
//                 <span className="text-green-500 font-bold">₹{order.total}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Addresses Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
//           <FaMapMarkerAlt /> Saved Addresses
//         </h2>
//         {addresses.length === 0 ? (
//           <p className="text-gray-600">No saved addresses.</p>
//         ) : (
//           <ul className="space-y-3">
//             {addresses.map((address, index) => (
//               <li key={index} className="p-3 border rounded-md">
//                 {address}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Wishlist Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
//           <FaHeart /> Wishlist
//         </h2>
//         {wishlist.length === 0 ? (
//           <p className="text-gray-600">Your wishlist is empty.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {wishlist.map((item) => (
//               <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center">
//                 <div>
//                   <h3 className="font-bold">{item.title}</h3>
//                   <span className="text-green-500 font-bold">₹{item.price}</span>
//                 </div>
//                 <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-700">
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
