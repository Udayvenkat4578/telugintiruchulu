// src/Components/MiniCart.jsx
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import bin from "../Assets/bin.png";

const MiniCart = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 z-50 bg-white shadow-lg transform transition-transform duration-300  will-change-transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-gothic font-bold text-lg">Your Cart</h2>
        <button onClick={closeCart} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-160px)] space-y-3">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id + item.sizeLabel} className="flex gap-3 items-center border-b pb-2">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.sizeLabel}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.sizeLabel, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.sizeLabel, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-semibold mt-1">
                  ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.sizeLabel)}
                className="text-red-500 text-lg font-bold"
              >
                <img src={bin} className="w-7 h-7" alt="delete" />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t flex flex-col gap-3">
          <p className="font-bold text-gray-700">Total: ₹{total}</p>
          <div className="flex gap-2">
            <Link
              to="/cart"
              onClick={closeCart}
              className="flex-1 bg-blue-600 text-white py-2 rounded text-center"
            >
              View Cart
            </Link>
            <Link
              to="/categories"
              onClick={closeCart}
              className="flex-1 bg-gray-200 py-2 rounded text-center"
            >
              Shop More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
