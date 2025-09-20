import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { motion } from "framer-motion";
import options from "../Assets/options.png";
import imagealt from "../Assets/imagealt.png"




const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wish = isWishlisted?.(product?.id);

  // compute price range safely
  const sizeList = Array.isArray(product?.sizes) ? product.sizes : [];
  const prices = sizeList.map((s) => Number(s.price) || 0);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const priceRange = min === max ? `₹${min}` : `₹${min} - ₹${max}`;

  return (
    <div className="pb-2 bg-white border-2 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image container with padding for uniform gap */}
      <div className="relative p-3 pt-3 flex justify-center items-center">
        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product?.name || "Product"}
            className="w-full h-52 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-md">
                        <img src={imagealt} alt="noimage"/>

          </div>
        )}

        {/* Wishlist Heart */}
{toggleWishlist && (
  <motion.button
    onClick={() => toggleWishlist(product.id)}
    aria-label="Toggle wishlist"
    whileTap={{ scale: 0.8 }}
    className="absolute top-3 right-3 p-2 transition-all "
  >
    {wish ? (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        key="filled"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        fill="red"  // filled heart when wishlisted
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <path d="M12 21s-7.2-4.35-9.2-6.3A5.4 5.4 0 0 1 2 9.75 4.9 4.9 0 0 1 6.75 5 5.4 5.4 0 0 1 12 7.1 5.4 5.4 0 0 1 17.25 5 4.9 4.9 0 0 1 22 9.75a5.4 5.4 0 0 1-0.8 5.94C19.2 16.65 12 21 12 21z"/>
      </motion.svg>
    ) : (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        key="outlined"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        fill="white"  // white heart when not wishlisted
        stroke="grey"  // red outline
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <path d="M12 21s-7.2-4.35-9.2-6.3A5.4 5.4 0 0 1 2 9.75 4.9 4.9 0 0 1 6.75 5 5.4 5.4 0 0 1 12 7.1 5.4 5.4 0 0 1 17.25 5 4.9 4.9 0 0 1 22 9.75a5.4 5.4 0 0 1-0.8 5.94C19.2 16.65 12 21 12 21z"/>
      </motion.svg>
    )}
  </motion.button>
)}
      </div>

      {/* Text section */}
      <div className="p-3 text-center">
        <h3 className="font-gothic text-gray-800 text-md">{product?.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product?.category}</p>
        <p className="text-md font-gothic text-gray-600 mt-1">{priceRange}</p>

        {/* Select Options button */}
        <div className="flex justify-center">
        <div className="mt-3 flex items-center justify-between ">
          <Link
            to={`/product/${product?.id}`}
            className="flex items-center font-medium gap-2 text-sm bg-red-600 hover:scale-105 transition text-white px-3 py-1 rounded"
          >
            <img src={options} className="h-4 w-4" alt="options" />
            Select Options
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;