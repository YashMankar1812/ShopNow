import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper';

const categories = [
  {
    name: "Sarah Johnson",
    category: "Verified Buyer",
    para: "Exceptional quality and fast delivery! The wireless headphones exceeded my expectations. Will definitely shop here again.",
    icon: <FaUser />,
    color: "bg-pink-600 text-white",
  },
  {
    name: "Michael Chen",
    category: "Verified Buyer",
    para: "Great customer service and amazing products. The smart watch is perfect for my daily needs. Highly recommend!",
    icon: <FaUser />,
    color: "bg-blue-600 text-white",
  },
  {
    name: "Emma Wilson",
    category: "Verified Buyer",
    para: "The shipping was quick and the product quality is outstanding. Would definitely recommend to friends and family.",
    icon: <FaUser />,
    color: "bg-green-600 text-white",
  },
];

const CustomerReview = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="py-12 px-6 font-poppins bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-3xl font-bold text-gray-900">Our Happy Customers</h2>
        <p className="text-gray-700 text-md mt-2 md:px-10">Real experiences from our valued customers who have shopped with us.</p>
      </div>

      {/* Statistics Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 p-6">
            <div className="text-center" data-aos="fade-up">
              <h2 className="text-4xl font-bold text-teal-600">4.8</h2>
              <p className="text-black font-medium">Average Rating</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-4xl font-bold text-teal-600">15k+</h2>
              <p className="text-black font-medium">Verified Reviews</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-4xl font-bold text-teal-600">92%</h2>
              <p className="text-black font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Slider */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-5">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-white shadow-xl rounded-lg p-6 flex flex-col justify-between min-h-[250px] hover:shadow-2xl transition duration-300"
                  
                  data-aos-delay={`${index * 200}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-2xl`}>{item.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{item.para}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default CustomerReview;


      {/* Share Your Experience */}
      {/* <section className="mt-10  text-center">
        <div className="mx-10 my-50 bg-gray-100 shadow-lg rounded-lg px-10 py-10 "> 
        <h3 className="text-2xl font-bold ">Share Your Experience</h3>
        <p className="text-gray-600 mt-2">We'd love to hear about your shopping experience with us!</p>
        <form className="mt-6 max-w-lg mx-auto text-left">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Write your review here..."
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        </div>
      </section> */}
