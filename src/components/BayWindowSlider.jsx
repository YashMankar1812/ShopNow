import React from "react";

// Sample images for the slider
const images = [
  "https://source.unsplash.com/400x500/?nature,mountain",
  "https://source.unsplash.com/400x500/?city,night",
  "https://source.unsplash.com/400x500/?ocean,beach",
  "https://source.unsplash.com/400x500/?forest,trees",
  "https://source.unsplash.com/400x500/?desert,dunes",
];

const BayWindowSlider = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      <div className="flex gap-6 overflow-x-auto p-6 scrollbar-hide">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group transition-transform duration-300 hover:scale-105"
            style={{
              transform: `rotateY(${index % 2 === 0 ? "-10deg" : "10deg"})`,
            }}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-64 h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Explore</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BayWindowSlider;
