
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist.filter(item => item !== null)); // Remove null values
  }, []);

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item?.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    toast.info("Item removed from wishlist!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => 
            product ? ( // ✅ Ensure product is not null before rendering
              <div key={product.id} className="relative bg-white border rounded-lg shadow-md p-4">
                
                {/* Wishlist Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700 bg-white bg-opacity-75 p-2 rounded-full shadow-md"
                >
                  <FaHeart />
                </button>

                {/* Product Image */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )}

                {/* Product Details */}
                <h2 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-green-600 font-bold text-lg">${product.price}</p>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTrash, FaShoppingCart } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CartContext } from "../context/CartContext"; // Import Context

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   // Load wishlist from local storage on mount
//   useEffect(() => {
//     const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(savedWishlist);
//   }, []);

//   // Remove item from wishlist
//   const removeFromWishlist = (id) => {
//     const updatedWishlist = wishlist.filter((item) => item.id !== id);
//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   // Move item to cart without local storage
//   const moveToCart = (item) => {
//     addToCart(item);
//     removeFromWishlist(item.id);
//     toast.success(`${item.name} added to cart!`, { position: "top-right", autoClose: 2000 });
//   };

//   return (
//     <div className="min-h-screen  mt-10 font-poppins p-10 bg-gray-200">
//       <ToastContainer position="top-right" autoClose={2000} />

//       {wishlist.length === 0 ? (
//         <div className="flex flex-col items-center justify-center text-center mt-20">
//           <p className="text-gray-600 text-lg mt-4">Your wishlist is empty! 😔</p>
//           <button 
//             className="bg-teal-300 px-5 py-2 rounded-full shadow-xl hover:bg-teal-400 transition duration-300 transform hover:scale-105 mt-4"
//             onClick={() => navigate("/shop")}
//           >
//             Shop Now
//           </button>
//         </div>
//       ) : (
    

//         <div className=" ">

// <h2 className="text-center text-teal-900 text-3xl font-bold pt-10">
//   Your Favorite Picks – Handpicked Just for You!  
// </h2>

// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//           {wishlist.map((item) => (
//             <div key={item.id} className="bg-white shadow-lg rounded-xl p-5">
//               <img 
//   src={item.image ? item.image : "https://via.placeholder.com/150"} 
//   alt={item.name} 
//   className="w-full h-48 object-cover rounded-md mb-6"
// />

//               <h6 className="text-xl  ">{item.name}</h6>
//               <div className="flex justify-between items-center mt-3">
//   <span className="text-green-600 font-semibold text-lg">${item.price}</span>
//   <button 
//     onClick={() => removeFromWishlist(item.id)} 
//     className="text-red-500 hover:text-red-700 transition duration-200"
//   >
//     <FaTrash size={20} />
//   </button>
// </div>

//               <button onClick={() => moveToCart(item)} className="bg-teal-600 text-white py-2 px-2 mt-3 w-55 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700">
//                 <FaShoppingCart /> Move to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//           </div>

//       )}
//     </div>
//   );
// };

// export default Wishlist;

