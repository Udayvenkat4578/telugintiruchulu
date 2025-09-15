// Components/CartPage.js
import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="p-6 text-center text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id + item.sizeLabel}
            className="flex items-center justify-between border rounded p-3 bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.sizeLabel} × {item.quantity}
                </p>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id, item.sizeLabel)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">Total: ₹{total}</p>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
