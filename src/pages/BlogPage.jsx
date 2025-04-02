// import React from "react";

// const blogs = [
//   {
//     title: "10 Shopping Tips for Smart Buyers",
//     description: "Discover how to get the best deals and make informed purchases.",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyL9ZZt1OaJzQvZa9RBOPRl4d1pyPoRRBTMg&s",
//     date: "July 20, 2025",
//   },
//   {
//     title: "How to Choose the Right Electronics",
//     description: "A complete guide to buying gadgets and tech products.",
//     image: "data:image/png;base64,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",
//     date: "July 18, 2025",
//   },
//   {
//     title: "Top 5 Fashion Trends of 2025",
//     description: "Stay stylish with the latest fashion trends and outfit ideas.",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnIAJIgNfDLQIIbKx7_vPZV7YW1YipK7u1w&s",
//     date: "July 15, 2025",
//   },
// ];

// export default function BlogPage() {
//   return (
//     <div className="max-w-9xl mx-auto p-6 bg-teal-600">
//       {/* Hero Section */}
//       <div className=" m-10 rounded-lg mb-10 ">
//         <h1 className="text-4xl font-bold text-gray-200 text-center mb-4">ShopNow Blog</h1>
//         <p className="text-center text-gray-300">Your go-to place for shopping tips, guides, and latest trends.</p>
//       </div>
      
//       {/* Blog List */}
//       <div className="grid md:grid-cols-3 gap-6 m-20">
//         {blogs.map((blog, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
//             <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
//             <p className="text-gray-600 text-sm mb-2">{blog.date}</p>
//             <p className="text-gray-700 mb-4">{blog.description}</p>
//             <div className="group">
//   <button className="text-blue-600 font-medium transition-all duration-300 ease-in-out transform group-hover:translate-x-2">
//     Read More →
//   </button>
// </div>


//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Shopping Trends for 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-74BN8h-HRsEwYx8wno0x_wsEpPbtolVUA&s",
    excerpt: "Discover the latest shopping trends that will shape 2025, from AI-powered recommendations to sustainable fashion...",
    content: "As technology and consumer preferences evolve, the shopping industry continues to adapt. In 2025, expect to see AI-powered recommendations, eco-friendly shopping, personalized AR experiences, and faster delivery systems. Stay ahead with these trends!",
  },
  {
    id: 2,
    title: "How to Find the Best Deals Online",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWYa8jqNwXiqnm9bI4GITLyfjPu4f3o93Yg&s",
    excerpt: "Looking for great discounts? Here are expert tips on finding the best online deals and seasonal sales...",
    content: "Online shopping offers great discounts if you know where to look. Sign up for store newsletters, use coupon websites, and compare prices using tools like Honey and CamelCamelCamel. Don't forget to check for cashback offers!",
  },
  {
    id: 3,
    title: "Sustainable Shopping: Buy Better, Waste Less",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3NYmRgSJhRLyBz-MRxmTWztDMHE6Xn1krw&s",
    excerpt: "Learn how to shop sustainably by choosing eco-friendly products, supporting ethical brands, and reducing waste...",
    content: "Sustainable shopping is all about making responsible choices. Look for brands that use recyclable packaging, shop locally, and invest in quality items that last longer. By making small changes, you can help the planet!",
  },
];

const BlogPage = () => {
  const [expandedPost, setExpandedPost] = useState(null);

  React.useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen p-5 bg-gradient-to-b from-teal-900 to-black text-white">
      <h2 className="text-5xl font-bold p-10 justify-center text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400" data-aos="fade-down">
  Blog
</h2>
      <h3 className="text-center uppercase text-sm p-5">Blog Posts</h3>
      <div className="max-w-6xl mx-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gradient-to-b from-teal-900 to-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
            data-aos="fade-up"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
            />
            <h2 className="text-xl  text-teal-500">{post.title}</h2>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              {expandedPost === post.id ? post.content : post.excerpt}
            </p>
            <button
              onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              className="mt-4 bg-teal-700 hover:bg-teal-900 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              {expandedPost === post.id ? "Read Less ⬆" : "Read More ⬇"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
