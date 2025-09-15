// Components/MiniCart.js
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const MiniCart = () => {
  const { cart, isCartOpen, closeCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg">Your Cart</h2>
        <button onClick={closeCart} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} className="flex gap-3 items-center mb-4 border-b pb-2">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.sizeLabel}</p>
                <p className="text-sm font-semibold">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t flex justify-between gap-2">
        <Link
          to="/cart"
          className="flex-1 text-center bg-blue-600 text-white py-2 rounded"
        >
          <button onClick={closeCart} >Checkout</button>
        </Link>
        <button
          onClick={closeCart}
          className="flex-1 text-center bg-gray-200 py-2 rounded"
        >
          Shop More
        </button>
      </div>
    </div>
  );
};

export default MiniCart;
