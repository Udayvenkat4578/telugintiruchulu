// src/Components/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart_v1")) || [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.sizeLabel === item.sizeLabel
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
    setIsCartOpen(true); // open mini cart on add
  };

  const removeFromCart = (id, sizeLabel) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.sizeLabel === sizeLabel))
    );
  };

  const updateQuantity = (id, sizeLabel, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.sizeLabel === sizeLabel
          ? { ...item, quantity: newQty }
          : item
      )
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
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
