
import React, { useState } from "react";
import { FaBars,  } from "react-icons/fa";
import { CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5"; // Import cross icon
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useCart } from "../context/CartContext"; 
import { IoIosHeart } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { CartContext } from "../context/CartContext";
import Profile from "../components/Profile";
// import { useEffect, useState } from "react";




const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Track search input visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true); 

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Simple validation check
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Handle form submission logic (login/signup)
    if (isSignup) {
      // Signup logic here
      console.log("Signup with", email, password);
    } else {
      // Login logic here
      console.log("Login with", email, password);
    }
  };

  const handleRedirect = () => {
    navigate("/cart");
  };


  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  const toggleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search input visibility
  };
  
  const { cart } = useContext(CartContext);





  // const { cart } = useContext(CartContext) || { cart: [] };



  return (
    <nav className="fixed top-0 left-0 bg-gradient-to-r from-black to-teal-600 shadow-md z-50 w-full  font-poppins">
      <div className="flex justify-between items-center p-5">
        {/* Logo */}
        <div className="text-2xl  cursor-pointer text-white">
          <NavLink to="/">ShopNow</NavLink>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Desktop navigation links */}
        <ul className="hidden lg:flex space-x-6 text-white cursor-pointer">
          <li>
            <NavLink to="/" className="cursor-pointer " activeClassName="text-black">
              Home
            </NavLink>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("shop")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <NavLink to="/shop" className=" hover:text-gray-300" activeClassName="text-black">
              Shop
            </NavLink>
            <ul
              className={`absolute bg-teal-600  w-40 p-4 rounded space-y-2 transition-all duration-300 ease-in-out ${
                hoveredMenu === "shop" ? "opacity-100 visible top-full" : "opacity-0 invisible top-[110%]"
              }`}
            >
              <li>
                <NavLink to="/shop/clothing" className="hover:text-black block">
                  Clothing
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop/electronics" className="hover:text-black block">
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop/furniture" className="hover:text-black block">
                  Furniture
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/about" className="cursor-pointer " activeClassName="text-black">
              About
            </NavLink>
          </li>
          <li
              onMouseEnter={() => handleMouseEnter("category")}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <NavLink to="/category" className=" hover:text-gray-300" activeClassName="text-black">
                Categories
              </NavLink>
              <ul
                className={`absolute bg-teal-600  shadow-md w-40 p-4 rounded space-y-2 transition-all duration-300 ease-in-out ${
                  hoveredMenu === "category" ? "opacity-100 visible top-full" : "opacity-0 invisible top-[110%]"
                }`}
              >
                <li>
                  <NavLink to="/category/fashion" className="hover:text-black block">
                    Fashion
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/living" className="hover:text-black block">
                    Home & Living
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/beauty" className="hover:text-black block">
                    Beauty
                  </NavLink>
                </li>
              </ul>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("sales")}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <NavLink to="/sales" className="hover:text-gray-300" activeClassName="text-black">
                Sales
              </NavLink>
              <ul
                className={`absolute bg-teal-600  shadow-md w-40 p-4 rounded space-y-2 transition-all duration-300 ease-in-out ${
                  hoveredMenu === "sales" ? "opacity-100 visible top-full" : "opacity-0 invisible top-[110%]"
                }`}
              >
                <li>
                  <NavLink to="/sales/deals" className="hover:text-black block">
                    Deal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sales/discounts" className="hover:text-black block">
                    Discounts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sales/bundles" className="hover:text-black block">
                    Bundles
                  </NavLink>
                </li>
              </ul>
            </li>
          <li>
            <NavLink to="/contact" className=" hover:text-gray-300" activeClassName="text-black">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Desktop icons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* <button onClick={toggleSearchInput}>
            <CiSearch className="stroke-1 text-lg text-white " />
          </button> */}


     {/* Search Overlay with Blur Effect */}
     {/* {isSearchOpen && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-4 w-1/2 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-full w-full "
              />
              <button onClick={toggleSearchInput}>
                <IoClose className="text-xl" />
              </button>
            </div>
          )}  */}
{/* 
          <NavLink to="/profile">
            <button>
              <CiUser className="stroke-1 text-lg" />
            </button>
          </NavLink> */}

 <button className="relative text-white group" onClick={() => navigate("/profile")} 
>
  <IoPersonSharp />
  {/* Hover Label */}
  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Profile
  </span>
</button> 

<button
      className="hidden lg:flex items-center space-x-4 relative group"
      onClick={() => navigate("/wishlist")}
    >
      <IoIosHeart className="stroke-1 text-lg text-white hover:text-red-400"/>
      
      {/* Tooltip on hover */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Favorite
      </span>
    </button>
<button 
  className="relative text-white group" 
  onClick={handleRedirect}
>
  <FaCartShopping  className="stroke-1 text-lg" />
  
  {/* Cart Count Badge */}
  {cart?.length > 0 && (
    <span className="absolute text-white bg-red-500 rounded-full text-xs px-1 bottom-2 left-3">
      {cart.length}
    </span>
  )}

  {/* Hover Label */}
  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Cart
  </span>
</button>




  </div>
</div>
      {/* <button onClick={toggleModal} className="bg-black text-white p-2 rounded-full">
            Signup
          </button> */}
        

      {/* Sidebar for mobile view */}
      <div
  className={`fixed top-0 left-0 w-full pt-10 h-full bg-gradient-to-b from-gray-900 to-teal-500 font-poppins text-white shadow-lg transform transition-transform duration-300 ease-in-out z-[9999] ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
<button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-4xl text-red-400 font-bold"
        >
          <IoClose />
        </button>
  <div className="flex justify-between">
  <NavLink
                to="/"
                className="text-3xl p-4  font-semibold  "
                activeClassName="text-black"
                onClick={toggleMenu}
              >
                ShopNow
              </NavLink>
              {/* <li> */}
              <NavLink
                to="/cart"
                className="text-3xl p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 "
                activeClassName="text-black"
                
              >
                      <FaCartShopping  className="stroke-2 text-3xl" />
              </NavLink>
            {/* </li> */}
  </div>

        <div className="p-6">
          <ul className="space-y-4 justify-center">
            
            <li>
              <NavLink
                to="/"
                className="text-lg font-semibold text-gray-200 hover:text-black"
                activeClassName="text-black"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className="text-lg font-semibold text-gray-200 hover:text-black"
                activeClassName="text-black"
                onClick={toggleMenu}
              >
                Shop
              </NavLink>
              </li>
              

              <li>
                <NavLink
                to="/category"
                className="text-lg font-semibold text-gray-200 hover:text-black"
                activeClassName="text-black"
                onClick={toggleMenu}
                >
                  Categories
                  </NavLink>
              </li>
              <li>
                <NavLink
                to="/sales"
                className="text-lg font-semibold text-gray-200 hover:text-black"
                activeClassName="text-black"
                onClick={toggleMenu}
                >
                  Sales
                  </NavLink>
              </li>
              <li>
              <NavLink
                to="/contact"
                className="text-lg font-semibold text-gray-200 hover:text-black"
                activeClassName="text-black"
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/cart"
                className="text-lg font-semibold hover:text-black"
                activeClassName="text-black"
                
              >
                      <CiShoppingCart className="stroke-1 text-lg" />
              </NavLink>
            </li> */}
            <li>
            <button
  onClick={toggleModal}
  className="bg-gray-900 p-2 rounded w-full text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
>
  Signup
</button>


            </li>
          </ul>
        </div>
      </div>

      {/* Modal for login/signup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button onClick={toggleModal} className="absolute top-2 right-2">
              <IoClose className="text-xl" />
            </button>
            <h2 className="text-2xl mb-4 text-center">
              {isSignup ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border mb-4 rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border mb-4 rounded"
              />
              {isSignup && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 border mb-4 rounded"
                />
              )}
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-2 rounded"
              >
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>
            <div className="mt-4 text-center">
              {isSignup ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-purple-500"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-purple-500"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
































































































