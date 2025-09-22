import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import imagealt from "../Assets/imagealt.png"

const ProductCard = ({ product }) => {
  const { addToCart, addingItemId } = useCart();

  const defaultSize =
    (product.sizes || []).find((s) => s.label.toLowerCase() === "250g") ||
    product.sizes?.[0] ||
    null;

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => setSelectedSize(defaultSize), [product]);

  const handleAdd = () => {
    if (!selectedSize) {
      alert("Please select a size/weight");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      imageUrl: product.imageUrl,
      sizeLabel: selectedSize.label,
      price: Number(selectedSize.price),
      quantity,
    });
    setQuantity(1); // reset quantity after add
  };

  const isAdding =
    addingItemId === product.id + "-" + selectedSize?.label;

  return (
    <div className="border rounded shadow-sm p-2 bg-white flex flex-col">
      <Link to={`/product/${product.id}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
        ) : (
          <div className="w-full  bg-gray-100 flex items-center justify-center rounded">
            <img src={imagealt} alt="noimage"/>
          </div>
        )}
      </Link>

      <div className="mt-3 flex-1">
        <h3 className="font-gothic text-gray-800 text-lg ">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>

        {selectedSize && (
          <p className="text-base font-gothic text-gray-700 mt-1">
            ₹{selectedSize.price}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {(product.sizes || []).map((s) => (
            <button
              key={s.label}
              onClick={() => setSelectedSize(s)}
              className={`px-2 py-1 rounded-sm border text-xs ${
                selectedSize?.label === s.label
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {s.label}-₹{s.price}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded  hover:bg-red-500 transition hover:text-white"
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded hover:bg-red-500 transition hover:text-white"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          className={`px-4 py-2 rounded-sm text-white transition ${
            isAdding ? "bg-green-500" : "bg-red-600 hover:scale-105"
          }`}
        >
          {isAdding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

