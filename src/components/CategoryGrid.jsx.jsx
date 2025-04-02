

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaTruck, FaMoneyBillAlt, FaTags, FaHeadset } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const FeaturesSection = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Feature Grid Data
  const features = [
    {
      icon: <FaTruck className="w-12 h-12 mb-4 text-teal-600" />,
      title: "Free Shipping",
      description:
        "Enjoy free shipping on all orders. No hidden fees, no minimum purchase required.",
    },
    {
      icon: <FaMoneyBillAlt className="w-12 h-12 mb-4 text-teal-600" />,
      title: "Money Back Guarantee",
      description:
        "Not satisfied? Get a full refund within 30 days. Shop with confidence!",
    },
    {
      icon: <FaTags className="w-12 h-12 mb-4 text-teal-600" />,
      title: "Discount Offers",
      description:
        "Exclusive discounts and offers for our loyal customers. Save big every day!",
    },
    {
      icon: <FaHeadset className="w-12 h-12 mb-4 text-teal-600" />,
      title: "24/7 Support",
      description:
        "Our support team is available 24/7 to assist you with any questions or issues.",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 font-poppins">
      {/* Why Choose Us Section */}
      <div
        className="text-center  p-5 m-6 "
        data-aos="fade-down"
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h3>
        <p className="text-gray-600 text-md leading-relaxed max-w-6xl mx-auto">
          Because we go above and beyond to ensure your satisfaction. With{" "}
          <span className="text-teal-600 font-medium">free shipping</span> on all
          orders, a{" "}
          <span className="text-teal-600 font-medium">30-day money-back guarantee</span>, and{" "}
          <span className="text-teal-600 font-medium">24/7 customer support</span>, we make
          shopping risk-free and hassle-free. Our{" "}
          <span className="font-medium text-gray-900">user-friendly website</span>,{" "}
          <span className="font-medium text-gray-900">secure payment options</span>, and{" "}
          <span className="font-medium text-gray-900">fast delivery</span> ensure that you
          get what you need, when you need it.{" "}
          <span className="text-teal-600 font-semibold">Shop with confidence at ShopNow!</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Feature Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 p-10"
          data-aos="fade-up"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8  rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {feature.icon}
              <h5 className="text-sm font-semibold text-gray-800 mb-6">
                {feature.title}
              </h5>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Product Categories Slider */}

      </div>
    </div>
  );
};

export default FeaturesSection;