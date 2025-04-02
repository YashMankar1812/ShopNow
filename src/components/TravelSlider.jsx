import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper";

const travelDestinations = [
  {
    image:
      "https://img.freepik.com/free-vector/flat-shopping-center-social-media-post-template_23-2149319664.jpg?ga=GA1.1.1659243566.1707889813&semt=ais_hybrid",
  },
  {
    image:
      "https://img.freepik.com/free-vector/realistic-horizontal-sale-banner-template-with-photo_23-2149017940.jpg?t=st=1742470251~exp=1742473851~hmac=05a7447a89f429633c47057921207ccb4dcdd357a2584a93049d988cc3fa3cac&w=1380",
  },
  {
    image:
      "https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148764566.jpg?t=st=1742470289~exp=1742473889~hmac=5e5653587029e3570dd03a277a12b56349bd9465d8da2e5c28f75c2660d61ba8&w=1380",
  },
  {
    image:
      "https://img.freepik.com/free-vector/flat-design-horizontal-sale-banner_23-2150287081.jpg?t=st=1742469138~exp=1742472738~hmac=204318672d6397be83aa5e0a19c11119787a0d03f64c10c523640f73e5fe7ac9&w=1380",
  },
  {
    image:
      "https://img.freepik.com/free-vector/flat-design-horizontal-sale-banner_23-2150287078.jpg?t=st=1742469650~exp=1742473250~hmac=1bb20d8e27302fc1202fbc5ed0b66499a6928f82da664d1b49aea84718cf251b&w=1380",
  },
];

const TravelSlider = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative bg-cover bg-center py-16 font-poppins">
      {/* 🎨 Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10 opacity-50"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1501012640/vector/background-with-confetti-dancing-like-a-cracker-popping-yellow-ratio-16-9.jpg?s=612x612&w=0&k=20&c=LhvuDSWIeAkSVJX81-Z36mbfcuai9ffnvaXWAs7T5qQ=')`,
        }}
      ></div>

      {/* ✨ Title Section */}
      <div
        className="text-center text-4xl font-bold text-gray-900 uppercase mb-8"
        data-aos="fade-up"
      >
        Top Offers
      </div>

      {/* 🌟 Swiper Component */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {travelDestinations.map((place, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative overflow-hidden  p-4 cursor-pointer group transform transition duration-300 hover:scale-105"
              data-aos="zoom-in"
            >
              <img
                src={place.image}
                alt={`Slide ${index}`}
                className="w-full h-74 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TravelSlider;
