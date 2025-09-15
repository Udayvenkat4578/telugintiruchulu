// Components/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addingItemId, setAddingItemId] = useState(null);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) => i.id === item.id && i.sizeLabel === item.sizeLabel
      );
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += item.quantity;
        return updatedCart;
      }
      return [...prevCart, item];
    });

    setAddingItemId(item.id + "-" + item.sizeLabel);
    setIsCartOpen(true);

    setTimeout(() => setAddingItemId(null), 5000);
  };

  const removeFromCart = (id, sizeLabel) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.sizeLabel === sizeLabel))
    );
  };

  const clearCart = () => setCart([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        addingItemId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
