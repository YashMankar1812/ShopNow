import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img
        src="https://fizza925.com/uploads/empty.gif"
        alt="Empty Cart"
        className="w-60 h-50 mb-4"
      />
      <p className="text-gray-600 mb-4">
        Looks like you haven’t added anything to your cart yet.
      </p>
      <Link to="/shop">
        <button className="bg-teal-300 px-5 py-2 rounded-full shadow-xl hover:bg-teal-400 transition duration-300 transform hover:scale-105">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
