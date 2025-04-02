import React from 'react';

const FashionPage = () => {
  // Trending fashion items with realistic placeholder images
  const trendingItems = [
    { 
      id: 1, 
      name: 'Summer Linen Dresses', 
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      price: '$89.99 - $129.99',
      description: 'Breathable linen dresses perfect for summer outings'
    },
    { 
      id: 2, 
      name: 'Premium Denim Collection', 
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      price: '$59.99 - $149.99',
      description: 'Sustainable denim with premium washes and fits'
    },
    { 
      id: 3, 
      name: 'Urban Streetwear Essentials', 
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      price: '$39.99 - $99.99',
      description: 'Contemporary streetwear for everyday wear'
    },
  ];

  // Style tips with realistic content
  const styleTips = [
    {
      id: 1,
      title: 'Mastering Seasonal Layering',
      excerpt: 'Learn how to transition your wardrobe seamlessly between seasons with smart layering techniques.',
      author: 'By Sophia Chen, Fashion Editor',
      date: 'September 15, 2023'
    },
    {
      id: 2,
      title: 'The Capsule Wardrobe: Essentials for 2023',
      excerpt: 'Build a versatile wardrobe with these 30 key pieces that mix and match effortlessly.',
      author: 'By Michael Rodriguez, Style Director',
      date: 'August 28, 2023'
    }
  ];

  // Brands we carry
  const featuredBrands = [
    { name: 'Everlane', logo: 'https://logo.clearbit.com/everlane.com' },
    { name: 'Reformation', logo: 'https://logo.clearbit.com/thereformation.com' },
    { name: 'Aritzia', logo: 'https://logo.clearbit.com/aritzia.com' },
    { name: '& Other Stories', logo: 'https://logo.clearbit.com/stories.com' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with professional image */}
      <div 
        className="relative h-screen max-h-[700px] bg-black flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Elevate Your Style</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover curated collections from the world's most sought-after designers and emerging brands
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300">
              Shop Women's
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition duration-300">
              Shop Men's
            </button>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light text-center mb-12 text-gray-600">FEATURED BRANDS</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="h-12 flex items-center">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-8 object-contain opacity-80 hover:opacity-100 transition"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150x50?text=' + brand.name;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-light">TRENDING NOW</h2>
          <a href="#" className="text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black">
            View All Collections →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingItems.map((item) => (
            <div key={item.id} className="group">
              <div className="relative overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-96 object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div>
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  Quick View
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                <p className="text-gray-900">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Tips */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">STYLE JOURNAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {styleTips.map((tip) => (
              <div key={tip.id} className="bg-white p-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <img 
                  src={`https://source.unsplash.com/random/600x400/?fashion,${tip.id}`} 
                  alt={tip.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{tip.author}</span>
                    <span>{tip.date}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
                  <p className="text-gray-600 mb-4">{tip.excerpt}</p>
                  <a href="#" className="text-sm font-medium uppercase tracking-wider text-gray-900 hover:text-gray-600">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-block border-b border-black pb-1 text-sm font-medium uppercase tracking-wider">
              View All Articles
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-light mb-4">JOIN OUR COMMUNITY</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to receive exclusive early access to new collections, special offers, and style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 bg-gray-900 text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FashionPage;