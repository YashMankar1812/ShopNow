


import React from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

const categories = [
  {
    name: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/category/mens",
    desc: "Discover the latest trends in men's fashion, from casual to formal wear.",
  },
  {
    name: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/category/beauty",
    desc: "Stylish and elegant clothing options curated just for you.",
  },
  {
    name: "Kids' Wear",
    image: "https://cdn.shopify.com/s/files/1/0086/0150/1792/files/boys_wear_-_summer_collection.jpg?v=1588577244",
    link: "/category/kids-wear",
    desc: "Comfortable and trendy outfits for your little ones.",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/category/electronics",
    desc: "Top-notch electronics, including smartphones, laptops, and accessories.",
  },
  {
    name: "Home & Decor",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/category/living",
    desc: "Transform your space with modern and stylish home décor items.",
  },
  {
    name: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/category/sports-fitness",
    desc: "Find the best fitness gear and sports essentials for your active lifestyle.",
  },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-poppins mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl  text-gray-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our diverse selection of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <NavLink 
              key={index} 
              to={category.link}
              className="group relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Category Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>

              {/* Category Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-200 mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {category.desc}
                </p>
                <span className="inline-flex items-center text-white font-medium group-hover:text-yellow-300 transition-colors duration-300">
                  Shop Now
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;