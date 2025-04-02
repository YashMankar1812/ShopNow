import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ products }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]); // Navigate to first suggestion
    }
  };

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-4 w-1/2 flex items-center space-x-2 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Search products..."
        className="p-2 border border-gray-300 rounded-full w-full"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => setQuery("")}>
        <IoClose className="text-xl" />
      </button>

      {/* Suggestion List */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md mt-2 rounded-lg overflow-hidden z-10">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
