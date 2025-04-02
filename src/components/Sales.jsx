


import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaTimes } from "react-icons/fa";

const salesData = [
  {
    id: 1,
    title: "Smartphone Discount",
    description: "Get up to 30% off on the latest smartphones!",
    category: "Deals",
    price: 499,
    discount: 30,
    rating: 4.5,
    image: "https://www.91-cdn.com/hub/wp-content/uploads/2023/10/flipkart-amazon-best-phone-deals-feat.png",
    expiry: new Date().getTime() + 48 * 60 * 60 * 1000,
    details: "This sale includes flagship smartphones featuring 120Hz AMOLED displays, powerful processors, and top-tier camera systems. Limited time only!"
  },
  {
    id: 2,
    title: "Laptop Mega Sale",
    description: "Exclusive discounts on gaming and business laptops!",
    category: "Discounts",
    price: 999,
    discount: 20,
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/xGl3LTIUEG_7VCKq3JcEyE8v-A8Dz-mdw8nMDUCvIGw8uonPY08gRFOZMlncC_aqjJOkAoxY6pt6J3IxOtKDw-pGQneozf9bPb6GGl3fMGhsxlPb90c9UszzbgpTUZxOYOBzklbfO452TMsdMYrTUm_GSfMjXk4TSg2bX1tNjDcX1TQ872kVgoe6_2Tk",
    expiry: new Date().getTime() + 72 * 60 * 60 * 1000,
    details: "Get top-notch gaming and business laptops with high-refresh-rate screens, SSD storage, and powerful GPUs. Limited stocks available!"
  }
];

const Sales = () => {
  const [search, setSearch] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimes = {};
      salesData.forEach(item => {
        const timeLeft = item.expiry - now;
        newTimes[item.id] = timeLeft > 0 ? timeLeft : 0;
      });
      setTimeRemaining(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const filteredSales = salesData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-poppins py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        🔥 Hot Sales & Discounts
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search sales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Sales Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredSales.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              {/* Price & Discount */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-semibold">
                  -{item.discount}%
                </span>
                <span className="text-gray-900 font-bold text-lg">₹{item.price}</span>
              </div>

              {/* Countdown Timer */}
              {timeRemaining[item.id] > 0 && (
                <p className="text-red-500 text-sm font-semibold mt-2">
                  ⏳ {formatTime(timeRemaining[item.id])} left!
                </p>
              )}

              {/* Ratings */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < item.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-700 ml-2">{item.rating.toFixed(1)}</span>
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => setSelectedSale(item)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-4 rounded-md"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Sale Details */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedSale(null)}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold">{selectedSale.title}</h2>
            <img
              src={selectedSale.image}
              alt={selectedSale.title}
              className="w-full h-52 object-cover mt-3 rounded-md"
            />

            <p className="mt-4 text-gray-700">{selectedSale.details}</p>
            <p className="mt-3 text-lg font-semibold">Price: ₹{selectedSale.price}</p>
            <p className="text-green-600 font-semibold">Discount: {selectedSale.discount}%</p>

            {/* Ratings */}
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < selectedSale.rating ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-700 ml-2">{selectedSale.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
