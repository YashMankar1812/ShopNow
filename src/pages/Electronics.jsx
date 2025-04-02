import React, { useState } from "react";

const Electronics = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Gaming Laptop",
      desc: "Experience high-performance gaming with an Intel i9 processor, RTX 4090 GPU, 32GB RAM, and 1TB SSD.",
      price: "$2,999",
      features: ["4K Display", "Ray Tracing", "RGB Backlit Keyboard"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEmQEp8XHjDdrcALvWnsSQfGp_o9Qv8-edJ46yGLmVS5_ecRbANT1H4ue-vdA6gz3JqNk&usqp=CAU",
      details: "This gaming laptop features advanced cooling technology, a mechanical keyboard for better precision, and a high-refresh-rate display for ultra-smooth gameplay.",
    },
    {
      id: 2,
      name: "Smart Watch",
      desc: "Track your fitness, monitor heart rate, and stay connected with Bluetooth calling and AI assistance.",
      price: "$299",
      features: ["AMOLED Display", "GPS Tracking", "7-Day Battery"],
      image: "https://m.media-amazon.com/images/I/61RDsH6pK0L.jpg",
      details: "The smartwatch comes with an always-on display, multiple sport modes, and a customizable watch face. It also supports fast charging for quick top-ups.",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      desc: "Noise-canceling over-ear headphones with deep bass, 40-hour battery, and premium sound quality.",
      price: "$199",
      features: ["ANC Technology", "Fast Charging", "Voice Assistant"],
      image: "https://m.media-amazon.com/images/I/71OTJgp0xNL.jpg",
      details: "Equipped with active noise cancellation, these headphones offer an immersive audio experience. The soft ear cushions ensure comfort during long listening sessions.",
    },
    {
      id: 4,
      name: "Mirrorless Camera",
      desc: "Professional-grade camera with 4K video recording, 24MP sensor, and fast autofocus for stunning shots.",
      price: "$1,499",
      features: ["4K Video", "Interchangeable Lens", "WiFi & Bluetooth"],
      image: "https://m.media-amazon.com/images/I/31LW3EeWZ4L._SL500_.jpg",
      details: "This camera offers a lightweight design, a touchscreen LCD, and in-body stabilization for smooth video and crisp images in any lighting condition.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 font-poppins">
      <h6 className="text-5xl font-bold text-gray-400 text-center mb-8">Top Electronics</h6>
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center gap-6 mb-10`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 h-80 object-cover rounded-lg "
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-3">{product.desc}</p>
            <p className="text-lg font-semibold text-green-700 mt-2">{product.price}</p>
            <ul className="mt-3 text-gray-700">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-5 bg-teal-600 text-white px-6 py-2 rounded font-medium hover:bg-teal-800 transition"
              onClick={() => setSelectedProduct(product)}
            >
              Learn More
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedProduct(null)}
            >
              ❌
            </button>
            <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProduct.desc}</p>
            <p className="text-gray-800 mt-3">{selectedProduct.details}</p>
            <p className="text-lg font-semibold text-green-700 mt-3">{selectedProduct.price}</p>
            <button
              className="mt-4 bg-teal-600 text-white px-6 py-2 rounded font-medium hover:bg-teal-800 transition w-full"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Electronics;
