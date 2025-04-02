// import { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Add product to cart
//   const addToCart = (product) => {
//     setCartItems((prevCart) => {
//       const itemExists = prevCart.find((item) => item.id === product.id);
//       if (itemExists) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, qty: item.qty + 1 } : item
//         );
//       }
//       return [...prevCart, { ...product, qty: 1 }];
//     });
//   };

//   // Update quantity
//   const updateQuantity = (id, qty) => {
//     setCartItems((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
//       )
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

  
// src/components/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ImBin2 } from "react-icons/im";
import { toast } from "react-toastify";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    navigate('/checkout'); // Navigates to the checkout page
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 font-poppins">
      <h4 className="text-xl font-semibold mb-6 text-gray-600 text-center sm:text-left mt-20">
        Shopping Cart
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price Breakdown */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md order-last md:order-first">
          <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
          <p className="flex justify-between">
            <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (8%):</span> <span>${tax.toFixed(2)}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between font-bold text-lg">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </p>
          <button
            className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-800"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

        {/* Cart Table */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-3  text-red-500 rounded"
                    >
                      <ImBin2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;


