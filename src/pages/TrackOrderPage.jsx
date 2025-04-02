import { useState } from "react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const mockOrderData = {
    "12345": {
      status: "Out for Delivery",
      estimatedDelivery: "March 15, 2025",
      progress: ["Order Placed", "Processed", "Shipped", "Out for Delivery"]
    },
    "67890": {
      status: "Delivered",
      estimatedDelivery: "March 10, 2025",
      progress: ["Order Placed", "Processed", "Shipped", "Delivered"]
    }
  };

  const handleTrackOrder = () => {
    if (mockOrderData[orderId]) {
      setOrderStatus(mockOrderData[orderId]);
    } else {
      setOrderStatus(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Track Your Order</h1>
        <p className="text-gray-600 text-center mb-4">Enter your Order ID to check the current status.</p>

        <div className="flex gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleTrackOrder}
          >
            Track
          </button>
        </div>

        {orderStatus ? (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Status: {orderStatus.status}</h2>
            <p className="text-gray-600">Estimated Delivery: {orderStatus.estimatedDelivery}</p>
            <div className="mt-4">
              {orderStatus.progress.map((step, index) => (
                <div key={index} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${index === orderStatus.progress.length - 1 ? "bg-green-500" : "bg-gray-400"}`}></span>
                  <span className="ml-2 text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ) : orderId ? (
          <p className="text-red-500 mt-4 text-center">Order ID not found. Please check and try again.</p>
        ) : null}
      </div>
    </div>
  );
}
