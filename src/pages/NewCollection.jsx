import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { Pagination, Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";

   
  
  const NewCollection = () => {
    // Initialize AOS
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);
    const navigate = useNavigate();

  // Image Slider Data
  const images = [
    // "https://dokan.co/app/uploads/2024/12/Top-Fashion-eCommerce-Trends.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20231221/pngtree-during-the-shopping-festival-a-girl-bought-a-shopping-cart-with-photo-image_15556167.png",
    "https://builder.bootstrapmade.com/static/img/product/product-f-9.webp",
    "https://img.lovepik.com/free-png/20211215/lovepik-e-commerce-shopping-girl-png-image_401641046_wh1200.png",
    "https://previews.123rf.com/images/primagefactory/primagefactory1705/primagefactory170500804/78541045-attractive-asian-woman-using-credit-card-paying-shopping-standing-on-white-background-e-commerce.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-happy-girl-on-a-shopping-spree-image_860818.jpg",

  ];

  return (
    <div className="bg-white py-5 font-poppins pt-20 mt-5 p-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* New Collection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-7" data-aos="fade-right">
{/* <h4 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
  New Collection 2025
</h4> */}
{/* <h4 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
  New Collection 2025
</h4> */}
{/* <h4 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-yellow-500">
  New Collection 2025
</h4> */}
<h4 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
  New Collection 2025
</h4>
            <p className="text-xl text-gray-600">
              Discover Stylish Fashion For Every Season
            </p>
            <p className="text-gray-500 text-sm">
            "Welcome to ShopNow, your ultimate destination for stylish, high-quality products at unbeatable prices! Whether you're looking for the latest fashion trends, cutting-edge electronics, or everyday essentials, we've got you covered."
            </p>
            <div className="flex gap-4">
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full  text-center transition-all duration-300 ease-in-out hover:-translate-y-1" onClick={() => navigate("/shop")}>
                Shop Now →
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full hover:bg-teal-600 hover:text-white transition-colors duration-300"  onClick={() => navigate("/shop")}>
                View Collection
              </button>
            </div>
            <div className="flex gap-6 mt-6">
            <div className="text-center gap-4 flex justify-evenly items-center">
  <div className="flex items-center gap-1">
    <FaShippingFast className="text-teal-600 text-lg" />
    <p className="text-sm text-gray-600">Free Shipping</p>
  </div>
  <div className="flex items-center gap-1">
  <MdOutlineVerifiedUser className="text-teal-600 text-lg" />
    <p className="text-sm text-gray-600">Secure Payment</p>
  </div>
  <div className="flex items-center gap-1">
    <MdOutlineAssignmentReturn className="text-teal-600 text-lg" />
    <p className="text-sm text-gray-600">Easy Returns</p>
  </div>
</div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative w-full  " data-aos="fade-left">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-96  object-cover rounded-lg shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm">
              30% OFF
            </div>
          </div>
        </div>

        {/* Product Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Summer Collection
            </h3>
            <p className="text-gray-600">$89.99</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Casual Wear
            </h3>
            <p className="text-gray-600">$59.99</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              New Arrivals
            </h3>
            <p className="text-gray-600">$99.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;