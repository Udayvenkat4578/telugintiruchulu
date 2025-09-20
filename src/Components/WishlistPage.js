// src/WishlistPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useWishlist } from "./WishlistContext";
import ProductCard from "./ProductCard";

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setLoading(true);
      try {
        const items = [];
        for (const id of wishlist) {
          const snap = await getDoc(doc(db, "products", id));
          if (snap.exists()) {
            items.push({ id: snap.id, ...snap.data() });
          }
        }
        setProducts(items);
      } catch (err) {
        console.error("Error fetching wishlist products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [wishlist]);

  if (loading) return <p className="text-center text-gray-500"><div className="flex flex-col items-center justify-center min-h-[60vh]  px-4">
  <div className="flex items-center justify-center gap-2 mb-6">
    <svg className="w-8 h-8 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <h2 className="text-3xl font-gothic text-red-500">Loading Wishlist</h2>
    <svg className="w-8 h-8 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </div>

  <div className="flex space-x-2 mb-6">
    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-400"></div>
  </div>

  <p className="text-gray-700 text-center text-lg italic max-w-md font-medium">
    Fetching your favorite products… please wait!
  </p>
</div>
</p>;

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Your Wishlist is Empty ❤️</h2>
        <p className="text-gray-500 mt-2">Browse products and add them to your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Wishlist ❤️</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
