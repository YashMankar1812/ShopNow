// src/pages/KidsWear.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KidsWear = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantity, setQuantity] = useState({});
  const [ageFilter, setAgeFilter] = useState('All');

  const kidsProducts = [
    {
      id: 201,
      name: "Organic Cotton Bodysuit",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
      category: "Baby",
      ageGroup: "0-12m",
      colors: ["white", "pink", "blue"]
    },
    {
      id: 202,
      name: "Striped T-Shirt Set",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      category: "Tops",
      ageGroup: "2-4y",
      colors: ["navy", "red", "yellow"]
    },
    {
      id: 203,
      name: "Denim Overalls",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1601512444021-0417e8b9f7d3",
      category: "Bottoms",
      ageGroup: "1-3y",
      colors: ["blue", "black"]
    },
    {
      id: 204,
      name: "Dinosaur Hoodie",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60",
      category: "Outerwear",
      ageGroup: "3-5y",
      colors: ["green", "gray", "red"]
    },
    {
      id: 205,
      name: "Princess Dress",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1596704017256-d56cd7a4a5e6",
      category: "Dresses",
      ageGroup: "4-6y",
      colors: ["pink", "purple", "blue"]
    },
    {
      id: 206,
      name: "Sports Jogger Set",
      price: 26.99,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      category: "Sets",
      ageGroup: "5-7y",
      colors: ["black", "gray", "navy"]
    },
    {
      id: 207,
      name: "Animal Print Pajamas",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1603072387863-1a9322a204a9",
      category: "Sleepwear",
      ageGroup: "2-4y",
      colors: ["green", "blue"]
    },
    {
      id: 208,
      name: "Rainbow Leggings",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1620799140180-9b6b8a1a1253",
      category: "Bottoms",
      ageGroup: "1-3y",
      colors: ["multicolor"]
    }
  ];

  const categories = ['All', ...new Set(kidsProducts.map(p => p.category))];
  const ageGroups = ['All', ...new Set(kidsProducts.map(p => p.ageGroup))];

  const filteredProducts = kidsProducts.filter(product => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const ageMatch = ageFilter === 'All' || product.ageGroup === ageFilter;
    return categoryMatch && ageMatch;
  });

  const handleAddToCart = (product) => {
    const qty = quantity[product.id] || 1;
    addToCart({
      ...product,
      qty: Number(qty)
    });
    toast.success(`${qty > 1 ? qty + ' x ' : ''}${product.name} added to cart!`);
    setQuantity(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = Math.max(1, Math.min(10, Number(value)));
    setQuantity(prev => ({ ...prev, [productId]: numValue }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  font-poppins mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kids Fashion</h1>
          <p className="text-xl mb-6 max-w-2xl">
            Adorable, comfortable clothing for your little ones
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Hypoallergenic</span> Materials
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Free</span> Returns
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Organic</span> Cotton
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Age Group</h3>
          <div className="flex flex-wrap gap-2">
            {ageGroups.map(age => (
              <button
                key={age}
                onClick={() => setAgeFilter(age)}
                className={`px-3 py-1 rounded-full text-sm ${
                  ageFilter === age
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
            {/* Product Image */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x300?text=Kids+Wear";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <span className="text-xs text-white bg-pink-500 px-2 py-1 rounded-full">
                  {product.ageGroup}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              
              {/* Color Options */}
              <div className="flex space-x-1 mb-2">
                {product.colors.map(color => (
                  <span 
                    key={color} 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color === 'multicolor' 
                      ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' 
                      : color }}
                    title={color}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</span>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★☆ <span className="text-gray-500 ml-1">(12)</span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mt-3 flex items-center space-x-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange(product.id, (quantity[product.id] || 1) - 1)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-10 text-center border-0 focus:ring-0 text-sm"
                  />
                  <button 
                    onClick={() => handleQuantityChange(product.id, (quantity[product.id] || 1) + 1)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md transition text-sm flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters</p>
          <button 
            onClick={() => {
              setActiveCategory('All');
              setAgeFilter('All');
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-600"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Safety Information */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Safety First</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>All our kids wear meets or exceeds safety standards:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Non-toxic, child-safe dyes</li>
                <li>No small parts or choking hazards</li>
                <li>Flame-resistant sleepwear</li>
                <li>Lead-free screen prints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsWear;