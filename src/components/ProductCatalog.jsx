import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon from react-icons

function ProductCatalog() {
  const [categories, setCategories] = useState({
    electronics: true,
    clothing: true,
    homeLiving: true,
    beauty: true,
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [rating, setRating] = useState({ fiveStars: true, fourStars: true, threeStars: true });

  const handleCategoryChange = (category) => {
    setCategories({ ...categories, [category]: !categories[category] });
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleRatingChange = (stars) => {
    setRating({ ...rating, [stars + 'Stars']: !rating[stars + 'Stars'] });
  };

  const filterProducts = (products) => {
    // Implement filtering logic here based on selected categories, price range, and rating
    return products;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Catalog</h1>

      <div className="flex gap-4">
        {/* Filters Section */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Categories</h2>
          <div className="space-y-2">
            {Object.keys(categories).map((category) => (
              <div className="flex items-center" key={category}>
                <input
                  type="checkbox"
                  id={category}
                  checked={categories[category]}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox text-blue-500"
                />
                <label htmlFor={category} className="ml-2 text-gray-700">
                  {category.charAt(0).toUpperCase() + category.slice(1)} (124)
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-4 text-gray-800">Price Range</h2>
          <div className="flex items-center">
            <input
              type="number"
              className="w-16 mr-2 border border-gray-300 rounded-md px-2 py-1"
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange(e.target.value, priceRange.max)}
            />
            <span className="mx-2 text-gray-700">-</span>
            <input
              type="number"
              className="w-16 ml-2 border border-gray-300 rounded-md px-2 py-1"
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange(priceRange.min, e.target.value)}
            />
          </div>

          <h2 className="text-xl font-semibold mt-4 text-gray-800">Rating</h2>
          <div className="space-y-2">
            {['fiveStars', 'fourStars', 'threeStars'].map((stars) => (
              <div className="flex items-center" key={stars}>
                <input
                  type="checkbox"
                  id={stars}
                  checked={rating[stars]}
                  onChange={() => handleRatingChange(stars.charAt(0))}
                  className="form-checkbox text-yellow-400"
                />
                <label htmlFor={stars} className="ml-2 text-gray-700">
                  {stars === 'fiveStars' ? '***** (5)' : stars === 'fourStars' ? '**** (4+)' : '*** (3+)'}
                </label>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Apply Filters
          </button>
        </div>

        {/* Product Cards Section */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder for product cards */}
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
            <img src="product-image.jpg" alt="Product" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
            <p className="text-gray-500">Category</p>
            <p className="text-lg font-semibold text-gray-900">$99.99</p>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 w-5 h-5" />
              ))}
            </div>
          </div>

          {/* Other product cards will be dynamically generated here */}
        </div>
      </div>
    </div>
  );
}

export default ProductCatalog;
