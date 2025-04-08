import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const MensFashion = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [quantity, setQuantity] = useState({});
  const [styleFilter, setStyleFilter] = useState('All');

  const mensProducts = [
    {
      id: 101,
      name: "Premium Slim Fit Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
      category: "Shirts",
      style: "Formal",
      colors: ["white", "blue", "gray"]
    },
    {
      id: 102,
      name: "Classic Denim Jeans",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      category: "Pants",
      style: "Casual",
      colors: ["blue", "black", "light-wash"]
    },
    {
      id: 103,
      name: "Leather Jacket",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      category: "Outerwear",
      style: "Casual",
      colors: ["black", "brown"]
    },
    {
      id: 104,
      name: "Tailored Suit",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      category: "Suits",
      style: "Formal",
      colors: ["navy", "charcoal", "black"]
    },
    {
      id: 105,
      name: "Athletic Shorts",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      category: "Activewear",
      style: "Sport",
      colors: ["black", "gray", "navy"]
    },
    {
      id: 106,
      name: "Cashmere Sweater",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
      category: "Sweaters",
      style: "Smart Casual",
      colors: ["cream", "gray", "navy"]
    },
    {
      id: 107,
      name: "Chino Pants",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
      category: "Pants",
      style: "Smart Casual",
      colors: ["khaki", "olive", "navy"]
    },
    {
      id: 108,
      name: "Performance Polo",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
      category: "Shirts",
      style: "Sport",
      colors: ["white", "black", "blue"]
    }
  ];

  const categories = ['All', ...new Set(mensProducts.map(p => p.category))];
  const styles = ['All', ...new Set(mensProducts.map(p => p.style))];

  const filteredProducts = mensProducts.filter(product => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const styleMatch = styleFilter === 'All' || product.style === styleFilter;
    return categoryMatch && styleMatch;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 font-poppins">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 rounded-xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Men's Fashion</h1>
          <p className="text-xl mb-6 max-w-2xl">
            Premium quality clothing for the modern man
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Premium</span> Materials
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Free</span> Shipping
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="font-bold">Tailored</span> Fit
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Style</h3>
          <div className="flex flex-wrap gap-2">
            {styles.map(style => (
              <button
                key={style}
                onClick={() => setStyleFilter(style)}
                className={`px-3 py-1 rounded-full text-sm ${
                  styleFilter === style
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {style}
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
                    ? 'bg-gray-800 text-white'
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
                  e.target.src = "https://via.placeholder.com/300x300?text=Mens+Fashion";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full">
                  {product.style}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              
              {/* Color Options */}
              {/* <div className="flex space-x-1 mb-2">
                {product.colors.map(color => (
                  <span 
                    key={color} 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ 
                      backgroundColor: color.includes('wash') ? '#f3f4f6' : 
                        color === 'khaki' ? '#f0e68c' :
                        color === 'olive' ? '#808000' :
                        color === 'charcoal' ? '#36454f' :
                        color === 'navy' ? '#001f3f' :
                        color === 'cream' ? '#fffdd0' :
                        color
                    }}
                    title={color}
                  />
                ))}
              </div> */}

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★☆ <span className="text-gray-500 ml-1">(24)</span>
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
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded-md transition text-sm flex items-center justify-center"
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
              setStyleFilter('All');
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quality Information */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-800">Premium Quality</h3>
            <div className="mt-2 text-sm text-gray-700">
              <p>All our men's fashion items meet the highest standards:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Premium fabrics and materials</li>
                <li>Durable construction and stitching</li>
                <li>Colorfast dyes that won't fade</li>
                <li>Wrinkle-resistant finishes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensFashion;