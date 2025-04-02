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
            <span className="text-lg font-bold">{hours}</span>
            <span className="text-xs">h</span>
          </div>
          <span>:</span>
          <div className="bg-black/20 px-2 py-1 rounded-md">
            <span className="text-lg font-bold">{minutes}</span>
            <span className="text-xs">m</span>
          </div>
          <span>:</span>
          <div className="bg-black/20 px-2 py-1 rounded-md">
            <span className="text-lg font-bold">{seconds}</span>
            <span className="text-xs">s</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative overflow-hidden p-20">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <motion.div 
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaFire className="mr-2" />
            <span className="font-medium uppercase tracking-wider">Limited Time Offers</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Special</span> Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these exclusive offers
          </p>
        </div>

        {/* Flash Sale and Bundle Deal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Flash Sale Card */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="relative p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  FLASH SALE
                </span>
                <Countdown 
                  date={timeLeft}
                  renderer={renderer}
                />
              </div>
              <h3 className="text-3xl font-bold mb-4">Up to 50% Off</h3>
              <p className="mb-6 text-lg">Limited time offer on all electronics</p>
              <motion.button
                className="bg-white text-purple-600 hover:bg-purple-700 hover:text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>

          {/* Bundle Deal Card */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            data-aos="fade-left"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="relative p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  BUNDLE DEAL
                </span>
                <div className="flex items-center">
                  <FaGift className="mr-2" />
                  <span className="text-sm font-medium">Buy 2 Get 1 Free</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Premium Beauty Set</h3>
              <ul className="space-y-2 mb-6">
                {["On all beauty products", "Premium skincare", "Free shipping", "Limited stock"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                className="bg-white text-red-600 hover:bg-red-700 hover:text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <FaTruck className="text-4xl" />,
              title: "Free Shipping",
              description: "On orders over $100",
              color: "from-teal-400 to-emerald-500"
            },
            {
              icon: <FaShieldAlt className="text-4xl" />,
              title: "Money Back",
              description: "30 days guarantee",
              color: "from-blue-400 to-indigo-500"
            },
            {
              icon: <FaLock className="text-4xl" />,
              title: "Secure Payment",
              description: "100% secure checkout",
              color: "from-purple-400 to-violet-500"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6 flex items-start">
                <div className={`p-4 rounded-lg bg-gradient-to-br ${feature.color} text-white mr-4 transition-transform duration-300 ${isHovered === index ? 'rotate-12 scale-110' : ''}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo Banner */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          data-aos="zoom-in"
        >
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Seasonal Sale"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-8 text-white max-w-lg">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Seasonal Sale</h3>
              <p className="text-lg mb-6">Up to 60% off on selected items. Limited time only!</p>
              <motion.button
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300"
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