import React from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-pink-50 mb-6">
          <FiHeart className="h-12 w-12 text-pink-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        
        <p className="text-gray-600 mb-6">
          You haven't saved any items yet. Start exploring and add products you love to your wishlist!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/shop"
            className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700 transition-colors"
          >
            <FiShoppingBag className="mr-2" />
            Start Shopping
          </Link>
          
          <Link
            to="/category"
            className="flex items-center justify-center px-6 py-3 border border-pink-600 rounded-md shadow-sm text-base font-medium text-pink-600 bg-white hover:bg-pink-50 transition-colors"
          >
            Browse Collections
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            WISHLIST BENEFITS
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center justify-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save items for later purchase
            </li>
            <li className="flex items-center justify-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Get notified when prices drop
            </li>
            <li className="flex items-center justify-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track item availability
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;