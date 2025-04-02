import { createContext, useState, useContext } from "react";

export const CartContext = createContext({ cart: [] });

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (id, qty) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};












// 








// import { createContext, useContext, useState } from "react";

// const CartContext = createContext(null); // Ensure it's not undefined

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     return (
//         <CartContext.Provider value={{ cart, setCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error("useCart must be used within a CartProvider");
//     }
//     return context;
// };
