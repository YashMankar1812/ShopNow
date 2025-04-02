import React, { useState } from "react";

const Furniture = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Furniture Data with Categories
  const furnitureItems = [
    { id: 1, name: "Modern Sofa", price: "$599.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66ahS5keRjbLDHW-HzcjCT_KQWbRT9qeOYQ&s", category: "Living Room" },
    { id: 2, name: "Luxury Bed Frame", price: "$899.99", image: "https://m.media-amazon.com/images/I/61MW20PNdhL._AA360_AC_QL70_.jpg", category: "Bedroom" },
    { id: 3, name: "Elegant Dining Table", price: "$1,199.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZmvfMzUqDbVSm7bPWvwMHcLckxk_m5kUdwQOsEAIKRoYbPOlAec53PtAjPZjhn22Rzo&usqp=CAU", category: "Dining" },
    { id: 4, name: "Office Chair", price: "$249.99", image: "https://shop.gkwretail.com/cdn/shop/products/OfficeChairUpholstered5CasterWheelsOfficeChair.jpg?v=1640772341", category: "Office" },
    { id: 5, name: "Outdoor Patio Set", price: "$1,499.99", image: "https://dreamlineoutdoorfurniture.com/cdn/shop/files/Ainara_Round_2_-_Person_Outdoor_Dining_Set_with_Cushions_7.webp?v=1691062912&width=1800", category: "Outdoor" },
    { id: 6, name: "Wooden Wardrobe", price: "$799.99", image: "https://m.media-amazon.com/images/I/71gldF6irWL._SX679_.jpg", category: "Bedroom" },
    { id: 7, name: "Leather Recliner", price: "$649.99", image: "https://thesleepcompany.in/cdn/shop/files/6_2d088c0b-61a8-4b85-80ba-ca5b36ab0480.webp?v=1743106408&width=1445", category: "Living Room" },
    { id: 8, name: "Glass Coffee Table", price: "$299.99", image: "https://www.indianartpalace.com/cdn/shop/files/TrinityCoffeeTable.jpg?v=1731602355&width=1100", category: "Living Room" },
    { id: 9, name: "Bookshelf", price: "$199.99", image: "https://m.media-amazon.com/images/I/61lngwbcoyL._SX679_.jpg", category: "Office" },
    { id: 10, name: "Nightstand", price: "$99.99", image: "https://m.media-amazon.com/images/I/41S3yyEM-LL._SX300_SY300_QL70_FMwebp_.jpg", category: "Bedroom" },
    { id: 11, name: "TV Stand", price: "$499.99", image: "https://m.media-amazon.com/images/I/41tVXVSOIdL._SY300_SX300_QL70_FMwebp_.jpg", category: "Living Room" },
    { id: 12, name: "Office Desk", price: "$399.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60xE0tz_Joc-aefZstEavH7rohmJPp19PaCGiQt-kzdSrDceO0epMVUiPv-ROr4jvu28&usqp=CAU", category: "Office" },
    { id: 13, name: "Outdoor Swing", price: "$699.99", image: "https://dreamlineoutdoorfurniture.com/cdn/shop/products/2_5_9f412d25-fffb-4417-849d-6700d0901821.jpg?v=1678798371&width=1080", category: "Outdoor" },
    { id: 14, name: "Velvet Armchair", price: "$349.99", image: "https://i.etsystatic.com/10055222/r/il/884505/2639392949/il_fullxfull.2639392949_5jph.jpg", category: "Living Room" },
    { id: 15, name: "Dining Chairs Set", price: "$799.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RQMp57MYM5ctV5mS44iTWL4iCXmeKsnBoQ&s", category: "Dining" },
    { id: 16, name: "Lounge Chair", price: "$599.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw0P8sqMX9Bd743dWV693fJ8LNgbdXivUAQQ&s", category: "Living Room" },
    { id: 17, name: "Wooden Cabinet", price: "$499.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzsbGQM4IzjjV3F3l_RgoKFOeDJCKAGzfbUg&s", category: "Office" },
    { id: 18, name: "Bar Stools", price: "$199.99", image: "https://dreamlineoutdoorfurniture.com/cdn/shop/products/Latina-bar-stool-S1.jpg?v=1686312650&width=1800", category: "Dining" },
    { id: 19, name: "Outdoor Hammock", price: "$399.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANfwQ2a1bCBs42G6CVhdkWG7Dt_NQWAOVHQ&s", category: "Outdoor" },
    { id: 20, name: "Wooden Bench", price: "$299.99", image: "https://m.media-amazon.com/images/I/51vga9VE9gL._SL1100_.jpg", category: "Outdoor" },
  ];

  // Categories
  const categories = ["All", "Living Room", "Bedroom", "Dining", "Office", "Outdoor"];

  // Filtered Products
  const filteredFurniture = selectedCategory === "All"
    ? furnitureItems
    : furnitureItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins mt-20">
      {/* Hero Banner */}
      <div
        className="relative h-80 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWV8ZW58MHx8MHx8fDA%3D')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold">Transform Your Home</h1>
          <p className="mt-3 text-lg">Discover premium furniture for every space.</p>
          <button className="mt-5 bg-yellow-500 text-black px-6 py-2 rounded font-medium hover:bg-yellow-400 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex justify-center gap-4 mt-10">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 border border-gray-300 rounded-lg transition ${
              selectedCategory === category ? "bg-teal-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredFurniture.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
          >
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 mt-2">{product.price}</p>
              <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Furniture;
