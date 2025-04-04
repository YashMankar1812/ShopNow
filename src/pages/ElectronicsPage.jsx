// src/pages/Electronics.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart, FiStar, FiArrowRight } from 'react-icons/fi';

const ElectronicsPage = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const categories = [
    {
      id: 1,
      name: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd',
      count: '128 products'
    },
    {
      id: 2,
      name: 'Laptops',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
      count: '76 products'
    },
    {
      id: 3,
      name: 'Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      count: '92 products'
    },
    {
      id: 4,
      name: 'Smart Watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      count: '64 products'
    }
  ];

  const featuredProducts = [
    {
      id: 101,
      name: 'iPhone 14 Pro Max',
      price: 1099.99,
      rating: 4.8,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1',
      colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
      specs: ['6.7" Super Retina XDR', 'A16 Bionic Chip', '48MP Camera']
    },
    {
      id: 102,
      name: 'MacBook Pro 14"',
      price: 1999.99,
      rating: 4.9,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
      colors: ['Space Gray', 'Silver'],
      specs: ['M2 Pro chip', '16GB RAM', '512GB SSD']
    },
    {
      id: 103,
      name: 'Sony WH-1000XM5',
      price: 399.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1655720828012-585b4244ef8a',
      colors: ['Black', 'Silver'],
      specs: ['Noise Cancelling', '30hr battery', 'Bluetooth 5.2']
    },
    {
      id: 104,
      name: 'Apple Watch Ultra',
      price: 799.99,
      rating: 4.6,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c',
      colors: ['Titanium'],
      specs: ['49mm case', 'GPS + Cellular', 'Ocean Band']
    },
    {
      id: 105,
      name: 'Samsung Galaxy S23 Ultra',
      price: 1199.99,
      rating: 4.7,
      reviews: 231,
      image: 'https://images.unsplash.com/photo-1676046187315-4b9b8b8b8b8b',
      colors: ['Phantom Black', 'Green', 'Lavender'],
      specs: ['6.8" AMOLED', '200MP Camera', 'S Pen included']
    },
    {
      id: 106,
      name: 'Bose QuietComfort 45',
      price: 329.99,
      rating: 4.5,
      reviews: 187,
      image: 'https://images.unsplash.com/photo-1639754390580-2e7437267698',
      colors: ['Black', 'White'],
      specs: ['Noise Cancelling', '24hr battery', 'Triport acoustic']
    }
  ];

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart({
      ...product,
      qty: Number(qty),
      price: Number(product.price),
      category: 'Electronics'
    });
    
    toast.success(`${qty > 1 ? `${qty} × ` : ''}${product.name} added to cart`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
    
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = Math.max(1, Math.min(10, Number(value)));
    setQuantities(prev => ({ ...prev, [productId]: numValue }));
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10 font-poppins">
      {/* Hero Section */}
      <div className="relative bg-black h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cutting-Edge Electronics</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the latest tech gadgets and devices for your digital lifestyle
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center mx-auto">
            Shop New Arrivals <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-xl h-64">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                <p className="text-gray-300">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-semibold">Featured Products</h2>
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <FiArrowRight className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    <FiStar className="text-yellow-500" />
                    <span className="sr-only">Rating: {product.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Available colors:</p>
                    <div className="flex space-x-2">
                      {product.colors.map((color, i) => (
                        <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1 h-1 bg-gray-600 rounded-full mr-2"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button 
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={quantities[product.id] || 1}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          className="w-12 text-center border-0 focus:ring-0"
                        />
                        <button 
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center"
                      >
                        <FiShoppingCart className="mr-2" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech News Section */}
      {/* <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Latest Tech News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">New Product Launch Coming Soon</h3>
                <p className="text-gray-600 mb-4">Stay tuned for our revolutionary new device that will change how you interact with technology.</p>
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  Read More <FiArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ElectronicsPage;