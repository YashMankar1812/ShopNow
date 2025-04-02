import React, { useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

const AdminPanel = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Smartphone", price: "$699" },
    { id: 2, name: "Laptop", price: "$999" },
    { id: 3, name: "Headphones", price: "$199" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Customer" },
  ]);

  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🛍️ ShopNow Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* Products Management */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">📦 Manage Products</h2>
        <div className="bg-white p-4 shadow rounded-lg">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between p-3 border-b">
              <p>{product.name} - <span className="font-bold">{product.price}</span></p>
              <div className="flex gap-3">
                <button className="text-blue-500"><FiEdit /></button>
                <button className="text-red-500" onClick={() => deleteProduct(product.id)}><FiTrash /></button>
              </div>
            </div>
          ))}
          <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <FiPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Users Management */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">👥 Manage Users</h2>
        <div className="bg-white p-4 shadow rounded-lg">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between p-3 border-b">
              <p>{user.name} - <span className="font-bold">{user.role}</span></p>
              <button className="text-red-500" onClick={() => deleteUser(user.id)}><FiTrash /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
 