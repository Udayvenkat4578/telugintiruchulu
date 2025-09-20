// src/Components/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Store wishlist as array of string IDs
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist_v1")) || [];
      console.log("Initial wishlist:", stored);
      return stored.map(String); // ensure all IDs are strings
    } catch (err) {
      console.error("Failed to parse wishlist from localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist_v1", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    const idStr = String(productId);
    setWishlist((prev) =>
      prev.includes(idStr) ? prev.filter((id) => id !== idStr) : [...prev, idStr]
    );
  };

  const isWishlisted = (productId) => wishlist.includes(String(productId));

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
