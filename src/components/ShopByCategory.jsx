
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Link } from "react-router-dom";
import {
  FaTshirt, FaLaptop, FaCouch, FaPaintBrush,
  FaAppleAlt, FaHeart, FaBookOpen, FaGamepad,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const categories = [
  { 
    name: "Fashion", 
    text: "Latest trends & styles", 
    link: "/fashion", 
    icon: <FaTshirt />, 
    color: "from-pink-500 to-pink-600",
    bgImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  { 
    name: "Electronics", 
    text: "Cutting-edge gadgets", 
    link: "/electronics", 
    icon: <FaLaptop />, 
    color: "from-blue-500 to-blue-600",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  { 
    name: "Home & Living", 
    text: "Elevate your space", 
    link: "/home-living", 
    icon: <FaCouch />, 
    color: "from-green-500 to-green-600",
    bgImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
  },
  { 
    name: "Beauty", 
    text: "Glow up essentials", 
    link: "/beauty", 
    icon: <FaPaintBrush />, 
    color: "from-purple-500 to-purple-600",
    bgImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  { 
    name: "Health", 
    text: "Wellness solutions", 
    link: "/health", 
    icon: <FaAppleAlt />, 
    color: "from-yellow-500 to-yellow-600",
    bgImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
  },
  { 
    name: "Toys", 
    text: "Fun for all ages", 
    link: "/toys", 
    icon: <FaGamepad />, 
    color: "from-orange-500 to-orange-600",
    bgImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  { 
    name: "Books", 
    text: "Expand your mind", 
    link: "/books", 
    icon: <FaBookOpen />, 
    color: "from-red-500 to-red-600",
    bgImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  { 
    name: "Sports", 
    text: "Performance gear", 
    link: "/sports", 
    icon: <FaHeart />, 
    color: "from-gray-500 to-gray-600",
    bgImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
];

const ShopByCategory = () => {
  const [showMore, setShowMore] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: true
    });
  }, []);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const displayedCategories = showMore ? categories : categories.slice(0, 4);

  return (
    <section 
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden "
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto font-poppins">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"><span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
  Categories
</span></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover products curated for every aspect of your life
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {displayedCategories.map((category, index) => (
            <motion.div
              key={index}
              className="relative h-80 rounded-2xl overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Background Image with Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                style={{ 
                  backgroundImage: `url(${category.bgImage})`,
                  transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-90`} />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 text-white">
                <div className="flex justify-center">
                  <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-4 transition-all duration-300 ${hoveredCard === index ? 'rotate-12 scale-110' : ''}`}>
                    {category.icon}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-80 mb-6">{category.text}</p>
                  <Link
  to="/shop"  // This should match your route path
  className="inline-block px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
>
  Shop Now
</Link>
                  {/* <Link
                    to={category.link}
                    className="inline-block px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
                  >
                    Shop Now
                  </Link> */}
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  boxShadow: `0 0 30px 5px ${category.color.split(' ')[0].replace('from-', '')}`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center" data-aos="fade-up">
          <motion.button
            onClick={handleToggle}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full font-medium flex items-center mx-auto hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? (
              <>
                <span>Show Less</span>
                <FaChevronUp className="ml-2" />
              </>
            ) : (
              <>
                <span>View All Categories</span>
                <FaChevronDown className="ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Global styles for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default ShopByCategory;
