import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaTimes, FaClock, FaFire, FaTag, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "react-countdown";

const salesData = [
  {
    id: 1,
    title: "Smartphone Discount",
    description: "Get up to 30% off on the latest smartphones!",
    category: "Electronics",
    price: 499,
    originalPrice: 699,
    discount: 30,
    rating: 4.5,
    reviews: 128,
    image: "https://www.91-cdn.com/hub/wp-content/uploads/2023/10/flipkart-amazon-best-phone-deals-feat.png",
    expiry: Date.now() + 48 * 60 * 60 * 1000,
    details: "This sale includes flagship smartphones featuring 120Hz AMOLED displays, powerful processors, and top-tier camera systems. Limited time only!",
    features: ["120Hz AMOLED Display", "Triple Camera System", "128GB Storage", "5G Connectivity"],
    colors: ["Space Gray", "Midnight Blue", "Rose Gold"]
  },
  {
    id: 2,
    title: "Laptop Mega Sale",
    description: "Exclusive discounts on gaming and business laptops!",
    category: "Computers",
    price: 999,
    originalPrice: 1249,
    discount: 20,
    rating: 4.8,
    reviews: 87,
    image: "https://lh3.googleusercontent.com/xGl3LTIUEG_7VCKq3JcEyE8v-A8Dz-mdw8nMDUCvIGw8uonPY08gRFOZMlncC_aqjJOkAoxY6pt6J3IxOtKDw-pGQneozf9bPb6GGl3fMGhsxlPb90c9UszzbgpTUZxOYOBzklbfO452TMsdMYrTUm_GSfMjXk4TSg2bX1tNjDcX1TQ872kVgoe6_2Tk",
    expiry: Date.now() + 72 * 60 * 60 * 1000,
    details: "Get top-notch gaming and business laptops with high-refresh-rate screens, SSD storage, and powerful GPUs. Limited stocks available!",
    features: ["144Hz Refresh Rate", "512GB SSD", "NVIDIA RTX 3060", "16GB RAM"],
    colors: ["Black", "Silver", "White"]
  },
  {
    id: 3,
    title: "Wireless Headphones",
    description: "Premium noise-cancelling headphones at 25% off",
    category: "Audio",
    price: 199,
    originalPrice: 259,
    discount: 25,
    rating: 4.7,
    reviews: 215,
    image: "https://www.91-cdn.com/hub/wp-content/uploads/2024/01/amazon-great-republic-day-sale-best-headphones-deals-1200x720.png",
    expiry: Date.now() + 24 * 60 * 60 * 1000,
    details: "Experience crystal clear sound with our premium noise-cancelling wireless headphones. 30-hour battery life and comfortable over-ear design.",
    features: ["Active Noise Cancelling", "30hr Battery", "Bluetooth 5.0", "Built-in Mic"],
    colors: ["Black", "Blue", "Red"]
  }
];

const Sales = () => {
  const [search, setSearch] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(salesData.map(item => item.category))];

  const filteredSales = salesData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                         item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Countdown renderer
  const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-500">Sale Ended!</span>;
    } else {
      return (
        <div className="flex items-center gap-1 text-sm ">
          <FaClock className="text-red-500" />
          <span className="font-medium">
            {hours}h {minutes}m {seconds}s
          </span>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-poppins ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins py-6 px-3 sm:px-6 m-10 mt-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full mb-3">
          <FaFire className="mr-2" />
          <span className="font-semibold">HOT DEALS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Exclusive Sales & Discounts
        </h1>
        <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
          Limited time offers on premium products
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto flex overflow-x-auto pb-2 sm:pb-0">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sales Grid */}
      {filteredSales.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredSales.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 transition-all"
            >
              {/* Sale Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 flex items-center">
                <FaTag className="mr-1" /> -{item.discount}%
              </div>

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h2>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <FaStar className="text-yellow-400 text-sm mr-1" />
                    <span className="text-xs font-medium">{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {item.reviews} reviews
                  </span>
                </div>

                {/* Countdown and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Countdown 
                    date={item.expiry}
                    renderer={countdownRenderer}
                  />
                  <button
                    onClick={() => setSelectedSale(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center transition"
                  >
                    <FaShoppingCart className="mr-2" />
                    View Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <FaSearch size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No deals found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {selectedSale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSale(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedSale.image}
                  alt={selectedSale.title}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <button
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                  onClick={() => setSelectedSale(null)}
                >
                  <FaTimes className="text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                  <FaTag className="mr-1" /> -{selectedSale.discount}%
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{selectedSale.title}</h2>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <FaStar className="text-yellow-400 text-sm mr-1" />
                    <span className="text-sm font-medium">{selectedSale.rating.toFixed(1)} ({selectedSale.reviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{selectedSale.details}</p>

                {/* Price Section */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">₹{selectedSale.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{selectedSale.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Countdown 
                      date={selectedSale.expiry}
                      renderer={countdownRenderer}
                    />
                    <span className="text-xs text-gray-500">Limited time offer</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Key Features:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedSale.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colors */}
                {/* <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Available Colors:</h3>
                  <div className="flex space-x-2">
                    {selectedSale.colors.map((color, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-200" 
                        style={{ backgroundColor: color.toLowerCase().includes('gray') ? '#6b7280' : 
                                 color.toLowerCase().includes('blue') ? '#3b82f6' :
                                 color.toLowerCase().includes('rose') ? '#fb7185' :
                                 color.toLowerCase().includes('silver') ? '#d1d5db' :
                                 color.toLowerCase().includes('white') ? '#ffffff' :
                                 color.toLowerCase().includes('red') ? '#ef4444' : '#000000' }} />
                    ))}
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition">
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sales;
