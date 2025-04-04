import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FiHeart, FiShoppingBag, FiTrash2, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyWishlist from "../pages/EmptyWishlist ";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingToCart, setMovingToCart] = useState(null);
  const [isMovingAll, setIsMovingAll] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || []);
        setWishlist(storedWishlist.filter(item => item !== null));
      } catch (error) {
        console.error("Error loading wishlist:", error);
        toast.error("Could not load your wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);



const handleMoveAllToCart = async () => {
  setIsMovingAll(true);
  
  try {
    // Process each item sequentially to avoid race conditions
    for (const item of wishlist) {
      try {
        await addToCart(item);
      } catch (error) {
        console.error(`Failed to add ${item.name} to cart:`, error);
        // Continue with next item even if one fails
      }
    }

    // Only clear if all operations were attempted
    localStorage.removeItem("wishlist");
    setWishlist([]);
    
    toast.success(
      <div>
        Moved {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} to your cart
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      }
    );
  } catch (error) {
    console.error("Error moving items to cart:", error);
    toast.error("Failed to move some items to cart");
  } finally {
    setIsMovingAll(false);
  }
};

  const handleRemoveFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item?.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    toast.success(
      <div>
        <span className="font-medium">{product.name}</span> removed from wishlist
      </div>,
      {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      }
    );
  };

  const handleMoveToCart = async (product) => {
    setMovingToCart(product.id);
    try {
      await addToCart(product);
      handleRemoveFromWishlist(product);
      toast.success(
        <div>
          <span className="font-medium">{product.name}</span> moved to cart
        </div>,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
        }
      );
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setMovingToCart(null);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-teal-600" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-poppins m-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-64"
                      />
                    ) : (
                      <div className="bg-gray-100 w-full h-64 flex items-center justify-center">
                        <FiShoppingBag className="text-gray-400 text-3xl" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Wishlist Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 className="text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={movingToCart === product.id}
                    className={`flex items-center px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors ${
                      movingToCart === product.id ? "opacity-75" : ""
                    }`}
                  >
                    {movingToCart === product.id ? (
                      <FiLoader className="animate-spin mr-2" />
                    ) : (
                      <FiShoppingBag className="mr-2" />
                    )}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Wishlist Summary
          </h3>
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-gray-600">
              You have {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
            </p>
            <button
  onClick={handleMoveAllToCart}
  disabled={isMovingAll || wishlist.length === 0}
  className={`mt-3 sm:mt-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
    isMovingAll ? 'opacity-75 cursor-not-allowed' : ''
  } ${
    wishlist.length === 0 ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''
  }`}
>
  {isMovingAll ? (
    <>
      <FiLoader className="animate-spin inline mr-2" />
      Moving...
    </>
  ) : (
    `Move All (${wishlist.length}) to Cart`
  )}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { FaTrashAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Wishlist = () => {
//   const { addToCart } = useCart();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       setLoading(true);
//       try {
//         const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//         setWishlist(storedWishlist.filter((item) => item !== null));
//       } catch (err) {
//         setError("Failed to load wishlist.");
//         console.error("Error loading wishlist:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   const handleRemoveFromWishlist = (id) => {
//     const updatedWishlist = wishlist.filter((item) => item?.id !== id);
//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

//     toast.info("Item removed from wishlist!", {
//       position: "top-right",
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   };

//   const handleAddToCartFromWishlist = (product) => {
//     addToCart(product);
//     handleRemoveFromWishlist(product.id); // Remove from wishlist after adding to cart
//     toast.success(`${product.name} added to cart!`, {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 font-poppins">
//         <p className="text-center text-gray-600">Loading wishlist...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 font-poppins">
//         <p className="text-center text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 font-poppins pt-20">
//       <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Wishlist</h1>

//       {wishlist.length === 0 ? (
//         <p className="text-lg text-gray-600">Your wishlist is currently empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {wishlist.map((product) =>
//             product ? (
//               <div key={product.id} className="relative bg-white border rounded-lg shadow-md p-6">
//                 <button
//                   onClick={() => handleRemoveFromWishlist(product.id)}
//                   className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500 transition-colors"
//                 >
//                   <FaTrashAlt />
//                 </button>

//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4">
//                     <p className="text-gray-500">No Image Available</p>
//                   </div>
//                 )}

//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
//                 <p className="text-gray-500 text-sm mb-2">{product.category}</p>
//                 <div className="flex justify-between items-center">
//                   <p className="text-green-600 font-bold text-lg">${product.price}</p>
//                   <button
//                     onClick={() => handleAddToCartFromWishlist(product)}
//                     className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ) : null
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;




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

