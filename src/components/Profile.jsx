import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa'; // Importing icons
import Cart  from './Cart';
import Wishlist from '../pages/Wishlist';

const Profile = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [activeTab, setActiveTab] = useState("profile"); // State for active section
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("johndoe@example.com");
  const [editMode, setEditMode] = useState(false);

  const handleLogout = () => {
    console.log("User logged out!");
    navigate("/"); // Redirect to Home Page
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex h-screen bg-teal-600 mt-20 ">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-9 ">
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
            alt="User Avatar"
            className="rounded-full w-24 h-24 mb-3 bg-gray-400"
          />
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-gray-600">{userEmail}</p>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-4 text-gray-700">
          <li 
            className={`flex items-center space-x-3 cursor-pointer ${activeTab === "profile" ? "text-teal-500" : "hover:text-teal-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="text-xl" />
            <span>Profile</span>
          </li>
          <li 
            className={`flex items-center space-x-3 cursor-pointer ${activeTab === "orders" ? "text-teal-500" : "hover:text-teal-500"}`}
            onClick={() => setActiveTab("orders")}
          >
            <FaBox className="text-xl" />
            <span>Orders</span>
          </li>
          <li 
            className={`flex items-center space-x-3 cursor-pointer ${activeTab === "wishlist" ? "text-teal-500" : "hover:text-teal-500"}`}
            onClick={() => setActiveTab("wishlist")}
          >
            <FaHeart className="text-xl" />
            <span>Wishlist</span>
          </li>
          <li 
            className={`flex items-center space-x-3 cursor-pointer ${activeTab === "settings" ? "text-teal-500" : "hover:text-teal-500"}`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog className="text-xl" />
            <span>Settings</span>
          </li>
          <li
            className="flex items-center space-x-3 cursor-pointer hover:text-red-500"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 p-5 h-screen">
        {activeTab === "profile" && (
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Profile</h2>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Name</label>
              {editMode ? (
                <input
                  type="text"
                  value={userName}
                  onChange={handleNameChange}
                  className="border px-4 py-2 rounded-lg w-full"
                />
              ) : (
                <p className="text-xl">{userName}</p>
              )}
              <button
                onClick={toggleEditMode}
                className="mt-2 text-teal-500 hover:underline"
              >
                {editMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Orders</h2>
            <Cart/>
            {/* <p>No orders found.</p> */}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Wishlist</h2>
            <Wishlist />
            {/* <p>Your wishlist is empty.</p> */}
          </div>
        )}



        {activeTab === "settings" && (
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <p>Adjust your account settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;




// import { useState } from "react";
// import { IoMdPerson } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// const ProfileButton = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // Logout Function
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setMenuOpen(false);
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="relative">
//       {/* Profile Icon Button */}
//       <button 
//         onClick={() => setMenuOpen(!menuOpen)} 
//         className="relative text-white text-2xl group"
//       >
//         <IoMdPerson />
//         {/* Hover Label */}
//         <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//           Profile
//         </span>
//       </button>

//       {/* Logout Dropdown */}
//       {menuOpen && (
//         <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden">
//           <button 
//             onClick={handleLogout} 
//             className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileButton;
