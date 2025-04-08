import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ViewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API call to fetch orders
    const fetchUserOrders = async () => {
      try {
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = {
          ok: true,
          data: [
            {
              orderId: 'ORDER-789012',
              orderDate: '2025-04-07',
              totalAmount: 75.50,
              items: [
                { name: 'T-Shirt', quantity: 2 },
                { name: 'Jeans', quantity: 1 },
              ],
              status: 'Delivered',
            },
            {
              orderId: 'ORDER-345678',
              orderDate: '2025-04-03',
              totalAmount: 1999.99,
              items: [
                { name: 'Laptop', quantity: 1 },
              ],
              status: 'Shipped',
            },
            // ... more orders
          ],
        };

        if (response.ok) {
          setOrders(response.data);
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (err) {
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10 font-poppins">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <button onClick={handleGoBack} className="mb-4 text-gray-600 hover:text-gray-800 flex items-center">
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>

        {loading && <p className="text-center text-gray-500">Loading orders...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.orderId} className="border rounded-md p-4">
                <h3 className="text-lg font-semibold text-gray-800">Order ID: {order.orderId}</h3>
                <p className="text-gray-600">Order Date: {order.orderDate}</p>
                <p className="text-gray-600">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                {order.items.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-700">
                    <li className="font-semibold">Items:</li>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} ({item.quantity})
                      </li>
                    ))}
                  </ul>
                )}
                {/* <button
                  onClick={() => navigate(`/order/${order.orderId}`)} // Example: Navigate to order details page
                  className="mt-3 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-sm font-semibold"
                >
                  View Details
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;