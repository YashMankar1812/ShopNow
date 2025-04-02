import React, { useEffect, useState } from 'react';
import { FaTruck, FaShieldAlt, FaLock, FaFire, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Countdown from 'react-countdown';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  const [isHovered, setIsHovered] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  // Countdown renderer
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Offer expired!</span>;
    } else {
      return (
        <div className="flex items-center space-x-1">
          <div className="bg-black/20 px-2 py-1 rounded-md">
            <span className="text-sm md:text-lg font-bold">{hours}</span>
            <span className="text-xs">h</span>
          </div>
          <span>:</span>
          <div className="bg-black/20 px-2 py-1 rounded-md">
            <span className="text-sm md:text-lg font-bold">{minutes}</span>
            <span className="text-xs">m</span>
          </div>
          <span>:</span>
          <div className="bg-black/20 px-2 py-1 rounded-md">
            <span className="text-sm md:text-lg font-bold">{seconds}</span>
            <span className="text-xs">s</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Floating decorative elements - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16" data-aos="fade-down">
          <motion.div 
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-full mb-3 md:mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaFire className="mr-2 text-sm md:text-base" />
            <span className="font-medium uppercase tracking-wider text-sm md:text-base">Limited Time Offers</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Special</span> Deals
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these exclusive offers
          </p>
        </div>

        {/* Flash Sale and Bundle Deal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
          {/* Flash Sale Card */}
          <motion.div 
            className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="relative p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-2 sm:space-y-0">
                <span className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold w-max">
                  FLASH SALE
                </span>
                <Countdown 
                  date={timeLeft}
                  renderer={renderer}
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Up to 50% Off</h3>
              <p className="mb-4 md:mb-6 text-base md:text-lg">Limited time offer on all electronics</p>
              <motion.button
                className="bg-white text-purple-600 hover:bg-purple-700 hover:text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold shadow-md md:shadow-lg transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>

          {/* Bundle Deal Card */}
          <motion.div 
            className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            data-aos="fade-left"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="relative p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-2 sm:space-y-0">
                <span className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold w-max">
                  BUNDLE DEAL
                </span>
                <div className="flex items-center">
                  <FaGift className="mr-2 text-sm md:text-base" />
                  <span className="text-xs md:text-sm font-medium">Buy 2 Get 1 Free</span>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Premium Beauty Set</h3>
              <ul className="space-y-1 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
                {["On all beauty products", "Premium skincare", "Free shipping", "Limited stock"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-white text-red-600 hover:bg-red-700 hover:text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold shadow-md md:shadow-lg transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
          {[
            {
              icon: <FaTruck className="text-3xl md:text-4xl" />,
              title: "Free Shipping",
              description: "On orders over $100",
              color: "from-teal-400 to-emerald-500"
            },
            {
              icon: <FaShieldAlt className="text-3xl md:text-4xl" />,
              title: "Money Back",
              description: "30 days guarantee",
              color: "from-blue-400 to-indigo-500"
            },
            {
              icon: <FaLock className="text-3xl md:text-4xl" />,
              title: "Secure Payment",
              description: "100% secure checkout",
              color: "from-purple-400 to-violet-500"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`h-1.5 md:h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-4 md:p-6 flex items-start">
                <div className={`p-3 md:p-4 rounded-lg bg-gradient-to-br ${feature.color} text-white mr-3 md:mr-4 transition-transform duration-300 ${isHovered === index ? 'rotate-12 scale-110' : ''}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo Banner */}
        <motion.div 
          className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          data-aos="zoom-in"
        >
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Seasonal Sale"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-4 md:p-6 lg:p-8 text-white max-w-md">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">Seasonal Sale</h3>
              <p className="text-sm sm:text-base md:text-lg mb-3 md:mb-6">Up to 60% off on selected items. Limited time only!</p>
              <motion.button
                className="bg-white text-black hover:bg-gray-100 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold shadow-md md:shadow-lg transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop the Sale
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default SpecialOffers;