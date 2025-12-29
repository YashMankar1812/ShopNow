import React from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster from react-hot-toast

const BeautyPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      qty: 1,
      price: Number(product.price),
      category: 'Beauty',
    };

    addToCart(productToAdd);

    // Using react-hot-toast for the success notification
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right', // Customize the position
      duration: 3000,       // Set the duration for the toast
      style: {
        background: '#ffffff',
        color: '#333333',
      },
      
    //   iconTheme: {
    //     primary: '#fff',       // White icon
    //     secondary: '#4CAF50',  // Green background for icon
    //   },
    });
  };

  const productCategories = [
    {
      id: 1,
      name: 'Skincare',
      icon: '🧴',
      description: 'Cleansers, serums & moisturizers',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      id: 2,
      name: 'Makeup',
      icon: '💄',
      description: 'Foundation, lipstick & more',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
    },
    {
      id: 3,
      name: 'Hair Care',
      icon: '🧖‍♀️',
      description: 'Shampoo, conditioner & treatments',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      id: 4,
      name: 'Fragrance',
      icon: '🌸',
      description: 'Perfumes & body mists',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Hydrating Hyaluronic Serum',
      brand: 'Glow Lab',
      price: 32.99,
      rating: 4.8,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 2,
      name: 'Matte Revolution Lipstick',
      brand: 'Beauty Cosmetics',
      price: 18.99,
      rating: 4.5,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 3,
      name: 'Volume Boost Mascara',
      brand: 'Lash Queen',
      price: 24.99,
      rating: 4.7,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1595878905785-5b0b0af6bd0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isNew: true,
      isBestSeller: true,
    },
  ];

  const beautyTips = [
    {
      id: 1,
      title: 'The Perfect 5-Step Skincare Routine',
      excerpt: 'Learn how to build an effective morning and nighttime skincare regimen for your skin type.',
      author: 'By Dr. Sarah Chen, Dermatologist',
      date: 'October 12, 2023',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: '10-Minute Everyday Makeup Look',
      excerpt: 'Professional makeup artist reveals how to achieve a polished look in minimal time.',
      author: 'By Mia Rodriguez, Makeup Artist',
      date: 'September 28, 2023',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
    },
  ];

  const handleShopNowClick = () => {
    toast('Redirecting to products...', {
      icon: '✨',
      position: 'top-center',
      duration: 2000,
    });
  };

  const handleCategoryClick = (categoryName) => {
    toast(`${categoryName} products coming soon!`, {
      icon: categoryName === 'Skincare' ? '🧴' : categoryName === 'Makeup' ? '💄' : categoryName === 'Hair Care' ? '🧖‍♀️' : '🌸',
      position: 'bottom-center',
      duration: 1500,
    });
  };

  const handleNewsletterSubscribe = () => {
    toast.success('Thanks for subscribing!', {
      position: 'bottom-right',
      duration: 3000,
      icon: '📧',
    });
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster /> {/* Place the Toaster component at the top level */}

      {/* Hero Section */}
      <div
        className="relative h-screen max-h-[700px] flex items-center justify-center bg-black"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Beauty Reimagined</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover premium beauty products curated by experts to enhance your natural glow
          </p>
          <button
            onClick={handleShopNowClick}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300 flex items-center mx-auto"
          >
            Shop Now <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-light">Shop by Category</h2>
          <a href="#" className="text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black flex items-center">
            View All <FiArrowRight className="ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)} // Add onClick for toast
              className={`${category.bgColor} p-8 rounded-xl text-center group cursor-pointer transition duration-300 hover:shadow-lg`}
            >
              <span className="text-5xl mb-4 block">{category.icon}</span>
              <h3 className={`${category.textColor} text-xl font-medium mb-2`}>{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
              <button className={`mt-4 ${category.textColor} text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition duration-300`}>
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Featured Products */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.isNew && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">BESTSELLER</span>
                    )}
                  </div>
                  <button
                    onClick={() => toast('Product added to wishlist!', { icon: '❤️', position: 'top-right' })} // Toast for wishlist
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <FiHeart className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center"
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{product.brand}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-2">({product.reviewCount})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => toast(`Viewing details for ${product.name}...`, { icon: '🔎', position: 'bottom-center' })} // Toast for view details
                      className="text-sm text-pink-600 font-medium hover:text-pink-800"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-block border-b border-black pb-1 text-sm font-medium uppercase tracking-wider">
              View All Products
            </a>
          </div>
        </div>
      </div>

      {/* Beauty Tips */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-light text-center mb-12">Beauty Journal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {beautyTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span>{tip.author}</span>
                  <span>{tip.date}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
                <p className="text-gray-600 mb-4">{tip.excerpt}</p>
                <a
                  href="#"
                  onClick={() => toast(`Reading "${tip.title}"...`, { icon: '📖', position: 'bottom-right' })} // Toast for read more
                  className="text-pink-600 text-sm font-medium uppercase tracking-wider flex items-center"
                >
                  Read More <FiArrowRight className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-light mb-4">Join Our Beauty Community</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive exclusive beauty tips, product launches, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            <button
              onClick={handleNewsletterSubscribe} // Add onClick for subscribe
              className="bg-pink-600 text-white px-6 py-3 font-medium hover:bg-pink-700 transition duration-300 rounded-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeautyPage;

// import React from 'react';
// import { FiShoppingCart, FiHeart, FiStar, FiArrowRight } from 'react-icons/fi';
// import { useCart } from '../context/CartContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BeautyPage = () => {
// const { addToCart } = useCart();

// const handleAddToCart = (product) => {
// const productToAdd = {
// ...product,
// qty: 1,
// price: Number(product.price),
// category: 'Beauty',
// };

// addToCart(productToAdd);

// toast.success(`${product.name} added to cart`, {
// position: 'top-left',
// autoClose: 3000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// });
// };

// const productCategories = [
// {
// id: 1,
// name: 'Skincare',
// icon: '🧴',
// description: 'Cleansers, serums & moisturizers',
// bgColor: 'bg-blue-50',
// textColor: 'text-blue-600',
// },
// {
// id: 2,
// name: 'Makeup',
// icon: '💄',
// description: 'Foundation, lipstick & more',
// bgColor: 'bg-pink-50',
// textColor: 'text-pink-600',
// },
// {
// id: 3,
// name: 'Hair Care',
// icon: '🧖‍♀️',
// description: 'Shampoo, conditioner & treatments',
// bgColor: 'bg-purple-50',
// textColor: 'text-purple-600',
// },
// {
// id: 4,
// name: 'Fragrance',
// icon: '🌸',
// description: 'Perfumes & body mists',
// bgColor: 'bg-rose-50',
// textColor: 'text-rose-600',
// },
// ];

// const featuredProducts = [
// {
// id: 1,
// name: 'Hydrating Hyaluronic Serum',
// brand: 'Glow Lab',
// price: 32.99,
// rating: 4.8,
// reviewCount: 142,
// image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80',
// isNew: true,
// isBestSeller: false,
// },
// {
// id: 2,
// name: 'Matte Revolution Lipstick',
// brand: 'Beauty Cosmetics',
// price: 18.99,
// rating: 4.5,
// reviewCount: 89,
// image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
// isNew: false,
// isBestSeller: true,
// },
// {
// id: 3,
// name: 'Volume Boost Mascara',
// brand: 'Lash Queen',
// price: 24.99,
// rating: 4.7,
// reviewCount: 203,
// image: 'https://images.unsplash.com/photo-1595878905785-5b0b0af6bd0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
// isNew: true,
// isBestSeller: true,
// },
// ];

// const beautyTips = [
// {
// id: 1,
// title: 'The Perfect 5-Step Skincare Routine',
// excerpt: 'Learn how to build an effective morning and nighttime skincare regimen for your skin type.',
// author: 'By Dr. Sarah Chen, Dermatologist',
// date: 'October 12, 2023',
// image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
// },
// {
// id: 2,
// title: '10-Minute Everyday Makeup Look',
// excerpt: 'Professional makeup artist reveals how to achieve a polished look in minimal time.',
// author: 'By Mia Rodriguez, Makeup Artist',
// date: 'September 28, 2023',
// image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
// },
// ];

// return (
// <div className="min-h-screen bg-gray-50">
// {/* Hero Section */}
// <div
// className="relative h-screen max-h-[700px] flex items-center justify-center bg-black"
// style={{
// backgroundImage: 'url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80)',
// backgroundSize: 'cover',
// backgroundPosition: 'center'
// }}
// >
// <div className="absolute inset-0 bg-black bg-opacity-40"></div>
// <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
// <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Beauty Reimagined</h1>
// <p className="text-xl md:text-2xl mb-8 font-light">
// Discover premium beauty products curated by experts to enhance your natural glow
// </p>
// <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300 flex items-center mx-auto">
// Shop Now <FiArrowRight className="ml-2" />
// </button>
// </div>
// </div>

// {/* Categories */}
// <div className="container mx-auto py-16 px-4">
// <div className="flex justify-between items-center mb-12">
// <h2 className="text-3xl font-light">Shop by Category</h2>
// <a href="#" className="text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black flex items-center">
// View All <FiArrowRight className="ml-1" />
// </a>
// </div>
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// {productCategories.map((category) => (
// <div
// key={category.id}
// className={`${category.bgColor} p-8 rounded-xl text-center group cursor-pointer transition duration-300 hover:shadow-lg`}
// >
// <span className="text-5xl mb-4 block">{category.icon}</span>
// <h3 className={`${category.textColor} text-xl font-medium mb-2`}>{category.name}</h3>
// <p className="text-gray-600 text-sm">{category.description}</p>
// <button className={`mt-4 ${category.textColor} text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition duration-300`}>
// Shop Now
// </button>
// </div>
// ))}
// </div>
// </div>
// {/* Featured Products */}
// <div className="bg-gray-100 py-16">
// <div className="container mx-auto px-4">
// <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
// <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
// {featuredProducts.map((product) => (
// <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
// <div className="relative">
// <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
// <div className="absolute top-4 left-4 flex gap-2">
// {product.isNew && (
// <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">NEW</span>
// )}
// {product.isBestSeller && (
// <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">BESTSELLER</span>
// )}
// </div>
// <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
// <FiHeart className="text-gray-600" />
// </button>
// <button
// onClick={() => handleAddToCart(product)}
// className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center"
// >
// <FiShoppingCart className="mr-2" /> Add to Cart
// </button>
// </div>
// <div className="p-6">
// <h3 className="text-lg font-medium mb-1">{product.name}</h3>
// <p className="text-gray-500 text-sm mb-3">{product.brand}</p>
// <div className="flex items-center mb-3">
// <div className="flex">
// {[...Array(5)].map((_, i) => (
// <FiStar
// key={i}
// className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`}
// />
// ))}
// </div>
// <span className="text-gray-500 text-xs ml-2">({product.reviewCount})</span>
// </div>
// <div className="flex justify-between items-center">
// <span className="font-bold">${product.price.toFixed(2)}</span>
// <button className="text-sm text-pink-600 font-medium hover:text-pink-800">
// View Details
// </button>
// </div>
// </div>
// </div>
// ))}
// </div>
// <div className="text-center mt-12">
// <a href="#" className="inline-block border-b border-black pb-1 text-sm font-medium uppercase tracking-wider">
// View All Products
// </a>
// </div>
// </div>
// </div>

// {/* Beauty Tips */}
// <div className="container mx-auto py-16 px-4">
// <h2 className="text-3xl font-light text-center mb-12">Beauty Journal</h2>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
// {beautyTips.map((tip) => (
// <div key={tip.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
// <img
// src={tip.image}
// alt={tip.title}
// className="w-full h-60 object-cover"
// />
// <div className="p-6">
// <div className="flex justify-between text-xs text-gray-500 mb-3">
// <span>{tip.author}</span>
// <span>{tip.date}</span>
// </div>
// <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
// <p className="text-gray-600 mb-4">{tip.excerpt}</p>
// <a href="#" className="text-pink-600 text-sm font-medium uppercase tracking-wider flex items-center">
// Read More <FiArrowRight className="ml-1" />
// </a>
// </div>
// </div>
// ))}
// </div>
// </div>

// {/* Newsletter */}
// <div className="bg-pink-50 py-16">
// <div className="container mx-auto px-4 max-w-3xl text-center">
// <h2 className="text-2xl font-light mb-4">Join Our Beauty Community</h2>
// <p className="text-gray-600 mb-8">
// Subscribe to receive exclusive beauty tips, product launches, and special offers
// </p>
// <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
// <input
// type="email"
// placeholder="Your email address"
// className="flex-grow px-4 py-3 bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
// />
// <button className="bg-pink-600 text-white px-6 py-3 font-medium hover:bg-pink-700 transition duration-300 rounded-lg whitespace-nowrap">
// Subscribe
// </button>
// </div>
// <p className="text-xs text-gray-500 mt-4">
// By subscribing, you agree to our Privacy Policy and consent to receive updates.
// </p>
// </div>
// </div>
// </div>
// );
// };

// export default BeautyPage;


