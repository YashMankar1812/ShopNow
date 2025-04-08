// import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCreative } from 'swiper';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
});

const products = [
  // ... (your products array remains the same)
  {
    id: 1,
    name: 'Gaming Laptop',
    price: 1499.99,
    description: 'High-performance gaming laptop with RTX graphics and fast refresh rate display.',
    brand: 'ASUS',
    category: 'Computers',
    rating: 4.7,
    reviews: 200,
    availability: 'In Stock',
    image: 'https://i.rtings.com/assets/pages/6dRuEBex/best-gaming-laptops-20242028-medium.jpg?format=auto',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 79.99,
    description: 'True wireless earbuds with active noise cancellation and touch controls.',
    brand: 'Samsung',
    category: 'Audio',
    rating: 4.4,
    reviews: 180,
    availability: 'In Stock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgLPLWUekfrao5XdUCEOVHfcvP8oUKatd3EVZiU9dnndwnpgK2JanQxtju7XO80Ob-dk&usqp=CAU',
  },
  {
    id: 3,
    name: '4K Smart TV',
    price: 599.99,
    description: 'Ultra HD Smart TV with HDR and built-in streaming apps.',
    brand: 'LG',
    category: 'Electronics',
    rating: 4.6,
    reviews: 250,
    availability: 'In Stock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfoCk6rPUjx1njbDdITiEjZd5c5U_U-ofC7zxzFGhpo2fP9bhxyGBgutlvEVrqhDgRrM&usqp=CAU',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB mechanical keyboard with customizable switches and backlighting.',
    brand: 'Corsair',
    category: 'Accessories',
    rating: 4.5,
    reviews: 130,
    availability: 'In Stock',
    image: 'https://i.rtings.com/assets/pages/xXDZ1p9x/best-rgb-keyboards-20240515-2-medium.jpg?format=auto',
  },
  {
    id: 5,
    name: 'Fitness Tracker',
    price: 59.99,
    description: 'Track your steps, heart rate, and workouts with this smart fitness band.',
    brand: 'Fitbit',
    category: 'Wearables',
    rating: 4.2,
    reviews: 170,
    availability: 'In Stock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUe0zp3RgKdHG3i5C41nhx0rxXLsmOpiGbQ&s',
  },
  {
    id: 6,
    name: 'Noise-Canceling Headphones',
    price: 199.99,
    description: 'Enjoy immersive sound with active noise cancellation and long battery life.',
    brand: 'Bose',
    category: 'Audio',
    rating: 4.8,
    reviews: 300,
    availability: 'In Stock',
    image: 'https://sm.pcmag.com/pcmag_me/review/b/bose-quiet/bose-quietcomfort-ultra-headphones_bknf.jpg',
  },
  {
    id: 7,
    name: 'Portable Power Bank',
    price: 39.99,
    description: 'Fast-charging power bank with 20,000mAh capacity and multiple USB ports.',
    brand: 'Anker',
    category: 'Accessories',
    rating: 4.5,
    reviews: 210,
    availability: 'In Stock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZKF_sI-9NVylAuf264Jyku2iT6oaarKpDw&s',
  },
  {
    id: 8,
    name: 'Ergonomic Office Chair',
    price: 249.99,
    description: 'Comfortable ergonomic chair with lumbar support and adjustable armrests.',
    brand: 'Herman Miller',
    category: 'Furniture',
    rating: 4.7,
    reviews: 190,
    availability: 'In Stock',
    image: 'https://static.independent.co.uk/2024/11/18/10/best-ergonomic-office-chairs-18-november-2024.jpg',
  },
  {
    id: 9,
    name: 'Smartphone Gimbal Stabilizer',
    price: 99.99,
    description: '3-axis gimbal stabilizer for smooth video recording on smartphones.',
    brand: 'DJI',
    category: 'Photography',
    rating: 4.6,
    reviews: 140,
    availability: 'In Stock',
    image: 'https://i.pcmag.com/imagery/roundups/00XqEGK3NGufUde5l1jLuVH-9..v1736364675.jpg',
  },
  {
    id: 10,
    name: 'VR Headset',
    price: 299.99,
    description: 'Immersive virtual reality headset with high-resolution display and motion tracking.',
    brand: 'Oculus',
    category: 'Gaming',
    rating: 4.7,
    reviews: 280,
    availability: 'In Stock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDsOCBPct2PHdXF56gwZ2rpO240dYgkgFZg&s',
  },
];

const ProductCard = ({ product }) => {
  // ... (your ProductCard component remains the same)
  const { addToCart } = useContext(CartContext);

  const handleAddToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      toast.success(`${product.name} added to wishlist!`, {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-green-100 text-green-800',
      });
    } else {
      toast.warning('Item is already in wishlist!', {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-yellow-100 text-yellow-800',
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      className: 'bg-green-100 text-green-800',
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      data-aos="fade-up"
    >
      <div className="relative h-64 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleAddToWishlist}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className="text-red-500 text-xl" />
          </motion.button>
          <motion.button
            onClick={handleAddToCart}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart className="text-teal-600 text-xl" />
          </motion.button>
        </div>
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
            product.availability === 'In Stock' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {product.availability}
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <p className="text-2xl font-bold text-teal-400">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="text-gray-400 text-sm ml-1">({product.reviews})</span>
          </div>
          <span className="text-sm text-gray-400">{product.brand}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Category: {product.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProductCarousel = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-500/10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Products</span>
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover our premium selection of high-quality products</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Pagination, Autoplay, EffectCreative]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'custom-bullet',
              bulletActiveClass: 'custom-bullet-active',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}

            <div className="custom-pagination flex justify-center gap-2 mt-8" />
          </Swiper>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .custom-bullet-active {
          background: linear-gradient(to right, #2dd4bf, #3b82f6);
          width: 30px;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
};

export default ProductCarousel;
