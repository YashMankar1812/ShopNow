
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
            <NavLink to="/category" className=" hover:text-gray-300" activeClassName="text-black">
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

        

   {/* Professional Mobile Sidebar */}
<div
  className={`fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 font-poppins text-white shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* Header with close button */}
  <div className="flex items-center justify-between p-6 border-b border-gray-700">
    <NavLink
      to="/"
      className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors"
      onClick={toggleMenu}
    >
      ShopNow
    </NavLink>
    
    <div className="flex items-center space-x-4">
      <NavLink
        to="/cart"
        className="p-2 relative hover:text-teal-400 transition-colors"
      >
        <FaCartShopping className="text-xl" />
        {/* Optional: Add cart item count badge */}
        <span className="absolute -top-1 -right-1 bg-teal-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
          3
        </span>
      </NavLink>
      
      <button
        onClick={toggleMenu}
        className="p-1 text-gray-400 hover:text-white transition-colors"
        aria-label="Close menu"
      >
        <IoClose className="text-2xl" />
      </button>
    </div>
  </div>

  {/* Navigation Links */}
  <nav className="p-6">
    <ul className="space-y-6">
      {[
        { path: "/", label: "Home" },
        { path: "/shop", label: "Shop" },
        { path: "/category", label: "Categories" },
        { path: "/sales", label: "Sales" },
        { path: "/contact", label: "Contact" }
      ].map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) => 
              `block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                isActive 
                  ? "bg-gray-800 text-teal-400" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
            onClick={toggleMenu}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>

  {/* Auth Section */}
  <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700 bg-gray-900/50">
    <button
      onClick={toggleModal}
      className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
    >
      Sign Up
    </button>
    
    <p className="mt-4 text-center text-gray-400 text-sm">
      Already have an account?{" "}
      <button 
        onClick={toggleModal}
        className="text-teal-400 hover:text-teal-300 underline transition-colors"
      >
        Log In
      </button>
    </p>
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
































































































