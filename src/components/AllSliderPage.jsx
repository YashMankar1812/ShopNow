// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper";


// ---------- Image Slider Component ----------
const ImageSlider = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/18de31e52e204bee.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1d4456d79592a9fe.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/63f47aa6a19098cc.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c1bf4e97384ebd48.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2a424b4ce6a5f5b2.jpg?q=20",
    // "https://rukminim2.flixcart.com/fk-p-flap/520/280/image/bf4c75ae837a1db2.jpg?q=20",

  ];

  return (
    <div className="md:flex-row items-center">
      {/* <h3 className="text-2xl font-bold mb-4">Image Slider</h3> */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={1}
        className="w-full  "
      >
        {images.map((img, index) => (
            
          <SwiperSlide key={index} className="w-screen">
            <img src={img} alt={`Slide ${index}`} className="w-screen h-80  object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------- Content Slider Component ----------
const ContentSlider = () => {
  const contents = [
    { id: 1, title: "Innovative Solutions", description: "We deliver innovative solutions to your challenges." },
    { id: 2, title: "Creative Design", description: "Our designs are creative, modern, and functional." },
    { id: 3, title: "Quality Assurance", description: "We ensure the highest quality in every project we undertake." },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4">Content Slider</h3>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {contents.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="p-6 bg-gray-200 rounded shadow-md">
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------- Testimonial Slider Component ----------
const TestimonialSlider = () => {
  const testimonials = [
    { id: 1, quote: "This service is amazing!", name: "Alice", image: "https://source.unsplash.com/100x100/?woman" },
    { id: 2, quote: "I loved working with this team.", name: "Bob", image: "https://source.unsplash.com/100x100/?man" },
    { id: 3, quote: "Highly recommended for quality work.", name: "Charlie", image: "https://source.unsplash.com/100x100/?person" },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4">Testimonial Slider</h3>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="p-6 bg-white rounded shadow-md flex items-center space-x-4">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="italic">"{t.quote}"</p>
                <p className="font-bold mt-2">- {t.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------- Card Slider Component ----------
const CardSlider = () => {
  const cards = [
    { id: 1, title: "Product One", image: "https://source.unsplash.com/400x400/?product" },
    { id: 2, title: "Product Two", image: "https://source.unsplash.com/400x400/?item" },
    { id: 3, title: "Product Three", image: "https://source.unsplash.com/400x400/?goods" },
    { id: 1, title: "Product One", image: "https://source.unsplash.com/400x400/?product" },
    { id: 2, title: "Product Two", image: "https://source.unsplash.com/400x400/?item" },
    { id: 3, title: "Product Three", image: "https://source.unsplash.com/400x400/?goods" },

  ];

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4">Card Slider</h3>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 0 },
        }}
        className="w-full"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="bg-white rounded shadow-md p-4 text-center">
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-xl font-semibold">{card.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------- Range Slider Component ----------
// const RangeSlider = () => {
//   const [value, setValue] = useState(50);

//   return (
//     <div className="mb-10 p-6 bg-gray-100 rounded shadow-md">
//       <h3 className="text-2xl font-bold mb-4">Range Slider</h3>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className="w-full"
//       />
//       <p className="mt-2 text-center">Value: {value}</p>
//     </div>
//   );
// };

// ---------- Vertical Slider Component ----------
// const VerticalSlider = () => {
//   const verticalImages = [
//     "https://source.unsplash.com/600x400/?sky",
//     "https://source.unsplash.com/600x400/?ocean",
//     "https://source.unsplash.com/600x400/?landscape",
//   ];

//   return (
//     <div className="mb-10">
//       <h3 className="text-2xl font-bold mb-4">Vertical Slider</h3>
//       <Swiper
//         direction="vertical"
//         modules={[Pagination, Navigation, Autoplay]}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         navigation
//         loop={true}
//         slidesPerView={1}
//         className="w-full h-80"
//       >
//         {verticalImages.map((img, index) => (
//           <SwiperSlide key={index}>
//             <img src={img} alt={`Vertical ${index}`} className="w-full h-80 object-cover rounded" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// ---------- Bay Window Slider (3D/Animated) Component ----------
const BayWindowSlider = () => {
    const images = [

    
      ];
    return (
      // Adding perspective to the parent container for a 3D effect
      <div
        className="relative flex justify-center items-center h-screen bg-gray-100"
        style={{ perspective: "1000px" }}
      >
        <div className="flex gap-6 overflow-x-auto p-6 scrollbar-hide scroll-smooth">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group transition-transform duration-300 hover:scale-105"
              // Applying rotateY for an angled effect
              style={{ transform: `rotateY(${index % 2 === 0 ? "-10deg" : "10deg"})` }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-64 h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">Explore</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

// ---------- Video Slider Component ----------
const VideoSlider = () => {
  const videos = [
    { id: 1, title: "Big Buck Bunny", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 2, title: "Elephant Dream", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  ];

  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4">Video Slider</h3>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="relative">
              <video className="w-full h-96 object-cover rounded" controls>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {video.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------- Main Page Component ----------
const AllSlidersPage = () => {
  return (
    <div className="container mx-auto px-2 py-5 space-y-16 mt-20 ">
      {/* <h1 className="text-4xl font-bold text-center mb-10">All Types of Sliders</h1> */}
      <ImageSlider />
      {/* <ContentSlider />
      <TestimonialSlider />
      <CardSlider /> */}
      {/* <RangeSlider /> */}
      {/* <VerticalSlider /> */}
      {/* <BayWindowSlider /> */}
      {/* <VideoSlider /> */}
    </div>
  );
};

export default AllSlidersPage;
