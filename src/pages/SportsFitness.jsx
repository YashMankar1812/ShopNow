// src/pages/SportsFitness.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

const SportsFitness = () => {
  const { addToCart } = useCart();

  const fitnessProducts = [
    {
      id: 101,
      name: "Yoga Mat (Premium)",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      category: "Yoga"
    },
    {
      id: 102,
      name: "Adjustable Dumbbells",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1571019614243-c4cc4b7fddd6",
      category: "Strength"
    },
    {
      id: 103,
      name: "Running Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      category: "Running"
    },
    {
      id: 104,
      name: "Resistance Bands Set",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1595079835353-a2299ad79ae2",
      category: "Training"
    },
    {
      id: 105,
      name: "Smart Water Bottle",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      category: "Accessories"
    },
    {
      id: 106,
      name: "Wireless Earbuds (Sport)",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      category: "Accessories"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      qty: 1, // Assuming quantity is 1 for direct add to cart
      price: Number(product.price)
    });
    // Use react-hot-toast for success notification
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right', // Common and clear position
      duration: 3000,       // Toast will disappear after 3 seconds
    });
  };

  const handleShopNewArrivals = () => {
    toast('Exciting new fitness gear arriving soon!', {
      icon: '💪',
      position: 'top-center',
      duration: 2500,
    });
  };

  const handleCategoryClick = (category) => {
    toast(`Filtering by ${category} products.`, {
      icon: '🔎',
      position: 'bottom-center',
      duration: 1500,
    });
  };

  const handleShopNowOffer = () => {
    toast.success('Awesome! Offer code FITNESS15 copied to clipboard!', {
      icon: '🎉',
      position: 'top-center',
      duration: 3000,
    });
    // In a real app, you'd actually copy the code to the clipboard here.
    navigator.clipboard.writeText('FITNESS15').catch(err => console.error('Failed to copy: ', err));
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
      <Toaster /> {/* Add the Toaster component here */}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Sports & Fitness</h1>
        <p className="text-xl mb-6">Premium gear for your fitness journey</p>
        <button
          onClick={handleShopNewArrivals} // Added onClick handler
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop New Arrivals
        </button>
      </div>

      {/* Categories Navigation */}
      <div className="flex overflow-x-auto space-x-4 mb-10 pb-2">
        {['All', 'Yoga', 'Strength', 'Running', 'Training', 'Accessories'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)} // Added onClick handler
            className="whitespace-nowrap px-4 py-2 bg-gray-100 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fitnessProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
                }}
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers Banner */}
      <div className="mt-16 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-orange-700 mb-2">Special Offer</h3>
        <p className="text-orange-600 mb-4">
          Get 15% off on orders over $100! Use code <span className="font-mono bg-orange-200 px-2 py-1 rounded">FITNESS15</span>
        </p>
        <button
          onClick={handleShopNowOffer} // Added onClick handler
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default SportsFitness;

// // src/pages/SportsFitness.jsx
// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SportsFitness = () => {
//   const { addToCart } = useCart();

//   const fitnessProducts = [
//     {
//       id: 101,
//       name: "Yoga Mat (Premium)",
//       price: 29.99,
//       image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
//       category: "Yoga"
//     },
//     {
//       id: 102,
//       name: "Adjustable Dumbbells",
//       price: 129.99,
//       image: "https://images.unsplash.com/photo-1571019614243-c4cc4b7fddd6",
//       category: "Strength"
//     },
//     {
//       id: 103,
//       name: "Running Shoes",
//       price: 89.99,
//       image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
//       category: "Running"
//     },
//     {
//       id: 104,
//       name: "Resistance Bands Set",
//       price: 24.99,
//       image: "https://images.unsplash.com/photo-1595079835353-a2299ad79ae2",
//       category: "Training"
//     },
//     {
//       id: 105,
//       name: "Smart Water Bottle",
//       price: 34.99,
//       image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
//       category: "Accessories"
//     },
//     {
//       id: 106,
//       name: "Wireless Earbuds (Sport)",
//       price: 79.99,
//       image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
//       category: "Accessories"
//     }
//   ];

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     toast.success(`${product.name} added to cart!`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl p-8 mb-12 text-white">
//         <h1 className="text-4xl font-bold mb-4">Sports & Fitness</h1>
//         <p className="text-xl mb-6">Premium gear for your fitness journey</p>
//         <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
//           Shop New Arrivals
//         </button>
//       </div>

//       {/* Categories Navigation */}
//       <div className="flex overflow-x-auto space-x-4 mb-10 pb-2">
//         {['All', 'Yoga', 'Strength', 'Running', 'Training', 'Accessories'].map((category) => (
//           <button
//             key={category}
//             className="whitespace-nowrap px-4 py-2 bg-gray-100 rounded-full hover:bg-blue-500 hover:text-white transition"
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {fitnessProducts.map((product) => (
//           <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
//             <div className="relative h-64 overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
//                 }}
//               />
//               <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                 {product.category}
//               </span>
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//               <div className="flex justify-between items-center">
//                 <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Special Offers Banner */}
//       <div className="mt-16 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
//         <h3 className="text-2xl font-bold text-orange-700 mb-2">Special Offer</h3>
//         <p className="text-orange-600 mb-4">
//           Get 15% off on orders over $100! Use code <span className="font-mono bg-orange-200 px-2 py-1 rounded">FITNESS15</span>
//         </p>
//         <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SportsFitness;