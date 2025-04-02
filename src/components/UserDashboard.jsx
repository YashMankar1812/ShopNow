import React, { useState } from "react";
// import Wishlist from "./Wishlist";


const OrderHistory = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Order History</h2>
    <p className="text-gray-500">No orders placed yet.</p>
  </div>
);

const ProfileSettings = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
    <p className="text-gray-500">Update your profile information here.</p>
  </div>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orderHistory");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <Button variant="outline" onClick={() => setActiveTab("orderHistory")}>Order History</Button>
        <Button variant="outline" onClick={() => setActiveTab("wishlist")}>Wishlist</Button>
        <Button variant="outline" onClick={() => setActiveTab("profileSettings")}>Profile Settings</Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "orderHistory" && <OrderHistory />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "profileSettings" && <ProfileSettings />}
      </div>
    </div>
  );
};

export default UserDashboard;
