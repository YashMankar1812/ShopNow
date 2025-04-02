import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const trendingProducts = [
  {
    id: 1,
    image: "https://dukaan.b-cdn.net/700x700/webp/media/2ddfc7ee-d7b4-4242-b5fd-a635b9ff52d9.jpg",
    category: "Furniture",
    name: "Modern Dining Table",
    rating: 4.7,
    price: 599.99,
  },
  {
    id: 2,
    image: "https://sylvi.in/cdn/shop/files/SylviUrbaneRGBlackWatchMainImageExploreBestWatchesforMen800x1000_53ced632-3846-4b00-bf6e-8cba542fe466_360x.webp?v=1734668613",
    category: "Accessories",
    name: "Urbane Rosegold Black",
    rating: 4.6,
    price: 199.99,
  },
  {
    id: 3,
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/638faa3886c942b29526923e7aefd7e5_9366/Ultraboost_5_Shoes_Orange_ID8811_HM1.jpg",
    category: "Footwear",
    name: "Ultraboost 5 Shoes",
    rating: 4.9,
    price: 89.99,
  },
];

const TrendingProductPage = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleCartClick = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(`${product.name} added to cart!`, { position: "top-left", autoClose: 2000 });
      return updatedCart;
    });
  };

  const handleWishlistClick = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        toast.info("Already in wishlist!", { position: "top-right", autoClose: 2000 });
        return prevWishlist;
      }
      const updatedWishlist = [...prevWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success(`${product.name} added to wishlist!`, { position: "top-right", autoClose: 2000 });
      return updatedWishlist;
    });
  };

  return (
    <>
      <ToastContainer />
      <section className="py-8 bg-gradient-to-b from-black to-teal-900 font-poppins">


        <h3 className="text-center uppercase text-gray-400 font-poppins">Trends</h3>
        <h2 className="text-3xl mb-6 text-center px-5 py-5 text-gray-200" data-aos="fade-down">
          Trending Products
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-lg w-80 mb-6 rounded-lg overflow-hidden" data-aos="fade-up">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-600 bg-white p-2 rounded-full cursor-pointer"
                  onClick={() => handleWishlistClick(product)}
                >
                  <FaHeart />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-xl text-gray-800 font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-2">{"★".repeat(Math.floor(product.rating))}</span>
                  <span className="text-gray-500 text-sm">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-red-500">${product.price}</p>
                  <button onClick={() => handleCartClick(product)} className="text-black border-2 border-green-600 px-4 py-2 rounded-md shadow hover:bg-green-600 hover:text-white transition transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TrendingProductPage;
