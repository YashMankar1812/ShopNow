
import React from 'react';
import { FiArrowRight, FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

const HomeLivingPage = () => {
  const { addToCart } = useCart(); // Access addToCart from CartContext

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      qty: 1,
      price: Number(product.price),
      category: 'Home & Living',
    };

    addToCart(productToAdd);

    // Using react-hot-toast for the success notification
    toast.success(`${product.name} added to cart`, {
      position: 'top-right', // 'top-left' is also an option, but 'top-right' is often standard. Chose 'top-right' for consistency with other pages, feel free to change.
      duration: 3000,        // autoClose is now duration in milliseconds
      // Properties like hideProgressBar, closeOnClick, pauseOnHover, draggable, theme are handled differently
      // or are default behaviors in react-hot-toast.
    });
  };

  const roomCategories = [
    {
      id: 1,
      name: 'Living Room',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      items: '245 products',
    },
    {
      id: 2,
      name: 'Bedroom',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      items: '189 products',
    },
    {
      id: 3,
      name: 'Kitchen & Dining',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      items: '312 products',
    },
    {
      id: 4,
      name: 'Home Office',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      items: '127 products',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Nordic Wood Coffee Table',
      price: 299.99,
      rating: 4.8,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      colors: ['#E5C9B4', '#A68A64', '#4A3F35'],
      material: 'Solid Oak',
      dimensions: '120cm × 60cm × 45cm',
    },
    {
      id: 2,
      name: 'Modern Velvet Sofa',
      price: 1299.99,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      colors: ['#5E3023', '#895737', '#C08552'],
      material: 'Velvet upholstery',
      dimensions: '220cm × 95cm × 85cm',
    },
    {
      id: 3,
      name: 'Minimalist Bookshelf',
      price: 459.99,
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80',
      colors: ['#F3E9DC', '#C6AD8F', '#5C574F'],
      material: 'Birch plywood',
      dimensions: '180cm × 30cm × 200cm',
    },
    {
      id: 4,
      name: 'Industrial Dining Table',
      price: 799.99,
      rating: 4.6,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      colors: ['#3E3E3E', '#6B5B4D', '#C4B8AB'],
      material: 'Reclaimed wood & iron',
      dimensions: '200cm × 100cm × 75cm',
    },
    {
      id: 5,
      name: 'Mid-Century Armchair',
      price: 349.99,
      rating: 4.5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
      colors: ['#2C3E50', '#E74C3C', '#F39C12'],
      material: 'Walnut & leather',
      dimensions: '65cm × 70cm × 85cm',
    },
    {
      id: 6,
      name: 'Glass Pendant Light',
      price: 129.99,
      rating: 4.4,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      colors: ['#F5F5F5', '#D4D4D4', '#A3A3A3'],
      material: 'Blown glass',
      dimensions: 'Ø30cm × H25cm',
    },
    {
      id: 7,
      name: 'Wool Area Rug',
      price: 249.99,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
      colors: ['#6D4C41', '#8D6E63', '#BCAAA4'],
      material: '100% New Zealand wool',
      dimensions: '160cm × 230cm',
    },
    {
      id: 8,
      name: 'Marble Side Table',
      price: 199.99,
      rating: 4.3,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1588&q=80',
      colors: ['#F5F5F5', '#616161', '#9E9E9E'],
      material: 'Carrara marble',
      dimensions: '45cm × 45cm × 50cm',
    },
    {
      id: 9,
      name: 'Rattan Lounge Chair',
      price: 429.99,
      rating: 4.8,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1588&q=80',
      colors: ['#D2B48C', '#8B5A2B', '#CD853F'],
      material: 'Natural rattan',
      dimensions: '75cm × 80cm × 90cm',
    },
    {
      id: 10,
      name: 'Ceramic Table Lamp',
      price: 89.99,
      rating: 4.2,
      reviews: 211,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      colors: ['#795548', '#A1887F', '#D7CCC8'],
      material: 'Hand-glazed ceramic',
      dimensions: 'Ø20cm × H45cm',
    },
  ];

  const designInspirations = [
    {
      id: 1,
      title: 'Scandinavian Minimalism',
      description: 'Embrace clean lines and functional beauty in your home',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: 'Industrial Chic',
      description: 'Combine raw materials with modern comfort',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
  ];

  // Handler for category clicks
  const handleCategoryClick = (categoryName) => {
    toast(`Exploring ${categoryName} options!`, {
      icon: '🏡',
      position: 'bottom-center',
      duration: 1500,
    });
  };

  // Handler for "View All Products"
  const handleViewAllProducts = () => {
    toast.info('Loading all home and living products...', {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  // Handler for "Get Inspired" button in Design Inspirations
  const handleGetInspired = (inspirationTitle) => {
    toast(`Discovering ${inspirationTitle} designs!`, {
      icon: '💡',
      position: 'top-center',
      duration: 2000,
    });
  };

  // Handler for Newsletter subscribe
  const handleSubscribe = () => {
    toast.success('Thanks for subscribing! Check your email for updates.', {
      icon: '🎉',
      position: 'top-center',
      duration: 3000,
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Toaster /> {/* Add the Toaster component here */}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-blue-700 h-96 flex items-center justify-center text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583847264769-e659b85f2b87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)' }}></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Elevate Your Home</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find unique furniture, decor, and essentials to transform your space.
          </p>
          <button onClick={() => toast('Exploring collections!', { icon: '✨' })} className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition flex items-center mx-auto">
            Explore Collections <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Shop by Room */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-light text-center mb-12">Shop by Room</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roomCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)} // Added onClick
              className="group relative overflow-hidden rounded-lg shadow-lg h-64 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-200 text-sm">{category.items}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                    <FiStar className="text-yellow-500" />
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 flex items-center"
                  >
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                  {/* Additional product details can be added here if needed */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Material: {product.material}</p>
                    <p>Dimensions: {product.dimensions}</p>
                    <div className="flex items-center">
                      Colors:
                      <div className="flex ml-2 space-x-1">
                        {product.colors.map((color, i) => (
                          <span
                            key={i}
                            className="block w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={handleViewAllProducts} // Changed from <a> to <button> and added onClick
              className="inline-block border-b border-black pb-1 text-sm font-medium uppercase tracking-wider hover:text-gray-700 hover:border-gray-700 transition"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>
      
      {/* Design Inspirations */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-light text-center mb-12">Design Inspirations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {designInspirations.map((inspiration) => (
            <div key={inspiration.id} className="group relative overflow-hidden h-96 rounded-lg shadow-md">
              <img
                src={inspiration.image}
                alt={inspiration.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-medium text-white mb-2">{inspiration.title}</h3>
                <p className="text-gray-300 mb-4">{inspiration.description}</p>
                <button
                  onClick={() => handleGetInspired(inspiration.title)} // Added onClick
                  className="text-white border-b border-transparent hover:border-white w-max pb-1 text-sm font-medium transition duration-300"
                >
                  Get Inspired
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-light mb-4">Join Our Design Community</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to receive design tips, exclusive offers, and early access to new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button
              onClick={handleSubscribe} // Added onClick
              className="bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-200 transition duration-300 whitespace-nowrap"
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

export default HomeLivingPage;
// import React from 'react';
// import { FiArrowRight, FiStar, FiShoppingCart } from 'react-icons/fi';
// import { useCart } from '../context/CartContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const HomeLivingPage = () => {
//   const { addToCart } = useCart(); // Access addToCart from CartContext

//   const handleAddToCart = (product) => {
//     const productToAdd = {
//       ...product,
//       qty: 1,
//       price: Number(product.price),
//       category: 'Home & Living',
//     };

//     addToCart(productToAdd);

//     toast.success(`${product.name} added to cart`, {
//       position: 'top-left',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   };

//   const roomCategories = [
//     {
//       id: 1,
//       name: 'Living Room',
//       image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       items: '245 products',
//     },
//     {
//       id: 2,
//       name: 'Bedroom',
//       image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
//       items: '189 products',
//     },
//     {
//       id: 3,
//       name: 'Kitchen & Dining',
//       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       items: '312 products',
//     },
//     {
//       id: 4,
//       name: 'Home Office',
//       image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       items: '127 products',
//     },
//   ];

//   const featuredProducts = [
//     {
//       id: 1,
//       name: 'Nordic Wood Coffee Table',
//       price: 299.99,
//       rating: 4.8,
//       reviews: 142,
//       image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
//       colors: ['#E5C9B4', '#A68A64', '#4A3F35'],
//       material: 'Solid Oak',
//       dimensions: '120cm × 60cm × 45cm',
//     },
//     {
//       id: 2,
//       name: 'Modern Velvet Sofa',
//       price: 1299.99,
//       rating: 4.9,
//       reviews: 89,
//       image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
//       colors: ['#5E3023', '#895737', '#C08552'],
//       material: 'Velvet upholstery',
//       dimensions: '220cm × 95cm × 85cm',
//     },
//     {
//       id: 3,
//       name: 'Minimalist Bookshelf',
//       price: 459.99,
//       rating: 4.7,
//       reviews: 67,
//       image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80',
//       colors: ['#F3E9DC', '#C6AD8F', '#5C574F'],
//       material: 'Birch plywood',
//       dimensions: '180cm × 30cm × 200cm',
//     },
//     {
//       id: 4,
//       name: 'Industrial Dining Table',
//       price: 799.99,
//       rating: 4.6,
//       reviews: 112,
//       image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
//       colors: ['#3E3E3E', '#6B5B4D', '#C4B8AB'],
//       material: 'Reclaimed wood & iron',
//       dimensions: '200cm × 100cm × 75cm',
//     },
//     {
//       id: 5,
//       name: 'Mid-Century Armchair',
//       price: 349.99,
//       rating: 4.5,
//       reviews: 203,
//       image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
//       colors: ['#2C3E50', '#E74C3C', '#F39C12'],
//       material: 'Walnut & leather',
//       dimensions: '65cm × 70cm × 85cm',
//     },
//     {
//       id: 6,
//       name: 'Glass Pendant Light',
//       price: 129.99,
//       rating: 4.4,
//       reviews: 178,
//       image: 'https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
//       colors: ['#F5F5F5', '#D4D4D4', '#A3A3A3'],
//       material: 'Blown glass',
//       dimensions: 'Ø30cm × H25cm',
//     },
//     {
//       id: 7,
//       name: 'Wool Area Rug',
//       price: 249.99,
//       rating: 4.7,
//       reviews: 156,
//       image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
//       colors: ['#6D4C41', '#8D6E63', '#BCAAA4'],
//       material: '100% New Zealand wool',
//       dimensions: '160cm × 230cm',
//     },
//     {
//       id: 8,
//       name: 'Marble Side Table',
//       price: 199.99,
//       rating: 4.3,
//       reviews: 94,
//       image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1588&q=80',
//       colors: ['#F5F5F5', '#616161', '#9E9E9E'],
//       material: 'Carrara marble',
//       dimensions: '45cm × 45cm × 50cm',
//     },
//     {
//       id: 9,
//       name: 'Rattan Lounge Chair',
//       price: 429.99,
//       rating: 4.8,
//       reviews: 87,
//       image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1588&q=80',
//       colors: ['#D2B48C', '#8B5A2B', '#CD853F'],
//       material: 'Natural rattan',
//       dimensions: '75cm × 80cm × 90cm',
//     },
//     {
//       id: 10,
//       name: 'Ceramic Table Lamp',
//       price: 89.99,
//       rating: 4.2,
//       reviews: 211,
//       image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
//       colors: ['#795548', '#A1887F', '#D7CCC8'],
//       material: 'Hand-glazed ceramic',
//       dimensions: 'Ø20cm × H45cm',
//     },
//   ];

//   const designInspirations = [
//     {
//       id: 1,
//       title: 'Scandinavian Minimalism',
//       description: 'Embrace clean lines and functional beauty in your home',
//       image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//     },
//     {
//       id: 2,
//       title: 'Industrial Chic',
//       description: 'Combine raw materials with modern comfort',
//       image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-poppins">
//       {/* ... (rest of the component remains the same) */}
//       {/* Featured Products */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-light text-center mb-12">Featured Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="bg-white group overflow-hidden">
//                 <div className="relative overflow-hidden h-80">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
//                     <FiStar className="text-yellow-500" />
//                   </div>
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center"
//                   >
//                     <FiShoppingCart className="mr-2" /> Add to Cart
//                   </button>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-medium">{product.name}</h3>
//                     <span className="font-medium">${product.price.toFixed(2)}</span>
//                   </div>
//                   <div className="flex items-center mb-4">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FiStar
//                           key={i}
//                           className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-gray-500 text-sm ml-2">{product.rating}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <a href="#" className="inline-block border-b border-black pb-1 text-sm font-medium uppercase tracking-wider">
//               View All Products
//             </a>
//           </div>
//         </div>
//       </div>
     
//      {/* Design Inspirations */}
// <div className="container mx-auto py-16 px-4">
// <h2 className="text-3xl font-light text-center mb-12">Design Inspirations</h2>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
// {designInspirations.map((inspiration) => (
// <div key={inspiration.id} className="group relative overflow-hidden h-96 rounded-lg">
// <img
// src={inspiration.image}
// alt={inspiration.title}
// className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
// />
// <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
// <h3 className="text-2xl font-medium text-white mb-2">{inspiration.title}</h3>
// <p className="text-gray-300 mb-4">{inspiration.description}</p>
// <button className="text-white border-b border-transparent hover:border-white w-max pb-1 text-sm font-medium transition duration-300">
// Get Inspired
// </button>
// </div>
// </div>
// ))}
// </div>
// </div>

// {/* Newsletter */}
// <div className="bg-gray-900 text-white py-16">
// <div className="container mx-auto px-4 max-w-4xl text-center">
// <h2 className="text-2xl font-light mb-4">Join Our Design Community</h2>
// <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
// Subscribe to receive design tips, exclusive offers, and early access to new collections.
// </p>
// <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
// <input
// type="email"
// placeholder="Your email address"
// className="flex-grow px-4 py-3 bg-gray-800 text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
// />
// <button className="bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-200 transition duration-300 whitespace-nowrap">
// Subscribe
// </button>
// </div>
// <p className="text-xs text-gray-500 mt-4">
// By subscribing, you agree to our Privacy Policy and consent to receive updates.
// </p>
// </div>
// </div>

//     </div>
//   );
// };

// export default HomeLivingPage;