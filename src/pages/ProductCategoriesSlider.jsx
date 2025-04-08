import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const ProductCategoriesSlider = () => {
  // Product Categories Data
  const categories = [
    { name: "Quirigue rutrum", products: 2, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1.webp" },
    { name: "Etiam ultricies", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-6.webp" },
    { name: "Fusce fermentum", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-9.webp" },
    { name: "Vestibulum ante", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-1.webp" },
    { name: "Masternas nec", products: 8, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-10.webp" },
    { name: "Aenean tellus", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-m-1.webp" },
    { name: "Fusce fermentum", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-2.webp" },
    { name: "Vestibulum ante", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-7.webp" },
    { name: "Masternas nec", products: 8, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-12-variant.webp" },
    { name: "Aenean tellus", products: 4, img: "https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-3.webp" },
  ];

  return (
    <div className="p-5 m-10 max-w-10xl bg-gray-50" data-aos="fade-up" data-aos-delay="200">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-2 rounded-lg transition-colors duration-300">
              <img 
                src={category.img} 
                alt={category.name} 
                className="w-30 h-50 mx-auto mb-3 object-cover transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCategoriesSlider;