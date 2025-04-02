import React from "react";

const DealsDiscounts = () => {
  const deals = [
    {
      id: 1,
      name: "Gaming Essentials Bundle",
      desc: "Get a high-performance gaming laptop bundled with a mechanical keyboard and gaming mouse.",
      originalPrice: "$3,499",
      discountedPrice: "$2,899",
      image: "https://source.unsplash.com/600x400/?gaming,setup",
      discount: "20% OFF",
    },
    {
      id: 2,
      name: "Smartwatch & Earbuds Combo",
      desc: "Track your fitness while enjoying immersive audio with this exclusive smartwatch and earbuds combo.",
      originalPrice: "$499",
      discountedPrice: "$399",
      image: "https://source.unsplash.com/600x400/?smartwatch,earbuds",
      discount: "Save $100",
    },
    {
      id: 3,
      name: "Content Creator Kit",
      desc: "Perfect for vloggers! Includes a mirrorless camera, tripod, and wireless mic for pro-level videos.",
      originalPrice: "$1,799",
      discountedPrice: "$1,499",
      image: "https://source.unsplash.com/600x400/?camera,tripod",
      discount: "🔥 Limited Deal",
    },
    {
      id: 4,
      name: "Home Office Bundle",
      desc: "Upgrade your workspace with a sleek laptop, ergonomic chair, and noise-canceling headphones.",
      originalPrice: "$2,099",
      discountedPrice: "$1,699",
      image: "https://source.unsplash.com/600x400/?laptop,office",
      discount: "Save $400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">🔥 Deals & Discount Bundles</h1>
      {deals.map((deal, index) => (
        <div
          key={deal.id}
          className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center gap-6 mb-10 border p-6 rounded-lg shadow-md bg-white`}
        >
          <img
            src={deal.image}
            alt={deal.name}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-semibold">{deal.name}</h2>
            <p className="text-gray-600 mt-3">{deal.desc}</p>
            <div className="mt-3">
              <span className="text-gray-500 line-through text-lg">{deal.originalPrice}</span>
              <span className="text-2xl font-bold text-green-600 ml-2">{deal.discountedPrice}</span>
            </div>
            <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mt-2">
              {deal.discount}
            </span>
            <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
              Grab Deal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealsDiscounts;
