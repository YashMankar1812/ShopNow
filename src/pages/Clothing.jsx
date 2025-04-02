import React from "react";

const Clothing = () => {
  const products = [
    {
      id: 1,
      name: "Men's Casual Jacket",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1516822003754-cca485356ecb",
    },
    {
      id: 2,
      name: "Women's Summer Dress",
      price: "$39.99",
      image: "",
    },
    {
      id: 3,
      name: "Classic Denim Jeans",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1532576881217-6c9b9be8be62",
    },
    {
      id: 4,
      name: "Trendy Sneakers",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    },
    {
      id: 5,
      name: "Men's Hoodie",
      price: "$44.99",
      image: "https://images.unsplash.com/photo-1614112758315-b19b34d1a16f",
    },
    {
      id: 6,
      name: "Women's Leather Jacket",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1598032890361-64c5d3f7073e",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 font-poppins ">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h3 className="text-5xl font-extrabold text-gray-400">Clothing Collection</h3>
        <p className="text-lg text-gray-600 mt-3">
          Upgrade your wardrobe with the latest fashion trends and premium outfits.
        </p>
      </header>

{/* Categories Section */}
<section className="mb-14">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
    Shop by Category
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {[
      {
        name: "Men's Wear",
        img: "https://images.pexels.com/photos/2204197/pexels-photo-2204197.jpeg",
      },
      {
        name: "Women's Wear",
        img: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
      },
      {
        name: "Kids' Wear",
        img: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg",
      },
    ].map((category, index) => (
      <div
        key={index}
        className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transition-transform hover:scale-105"
      >
        <img
          src={category.img}
          alt={category.name}
          className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white text-2xl font-bold">{category.name}</h3>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Featured Products */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-lg font-medium mt-2">{product.price}</p>
                <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg">
        <h2 className="text-3xl font-semibold">Find Your Perfect Style</h2>
        <p className="text-lg mt-2">Shop now and stay ahead in fashion trends.</p>
        <button className="mt-6 bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
          Explore More
        </button>
      </section>
    </div>
  );
};

export default Clothing;
