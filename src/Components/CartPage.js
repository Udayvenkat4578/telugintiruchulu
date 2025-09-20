import React from "react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import emptycart from "../Assets/emptycart.png";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="py-6 ">
        <div className="p-6 text-center text-gray-500">
          <h2 className="text-2xl font-gothic font-medium mb-4 text-gray-700">
            Your Cart is Empty
            <span className="text-red-500 pl-4 text-[16px] font-gothic">
              <Link to="/categories">Add items?</Link>
            </span>
          </h2>

          <div className="flex items-center justify-center">
            <img src={emptycart} className="h-64 w-96 object-contain" alt="Empty Cart" />
          </div>
          {wishlist.length > 0 && (
            <h2 className="text-lg font-medium mt-4 text-gray-600">
              Explore Your Wishlisted Products,{" "}
              <span className="text-red-500 font-gothic">
                <Link to="/wishlist">Here!</Link>
              </span>
            </h2>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Heading + Clear Cart */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between sm:items-center mb-4 gap-2">
        <h1 className="text-3xl font-gothic font-bold text-center sm:text-start">Your Cart</h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-700  text-white rounded hover:bg-gray-800 text-sm"
        >
          Clear Cart
        </button>
      </div>

      {/* Explore Wishlist */}
      {wishlist.length > 0 && (
        <div className="mb-4 text-sm text-gray-600 font-gothic">
          Explore your wishlisted products{" "}
          <Link to="/wishlist" className="text-red-500 font-gothic">
            here!
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id + item.sizeLabel}
              className="flex flex-col sm:flex-row items-center justify-between border rounded p-3 bg-white shadow-sm gap-4"
            >
              <div className="flex items-center gap-4 w-full">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-gothic">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.sizeLabel} × {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.sizeLabel, item.quantity - 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.sizeLabel, item.quantity + 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <p className="font-gothic mt-1 text-gray-600">₹{item.price * item.quantity}</p>
                </div>

                {/* Trash button always on right */}
                <button
                  onClick={() => removeFromCart(item.id, item.sizeLabel)}
                  className="ml-4 px-3 py-1 sm:mr-7 mr-0 bg-red-500 text-white rounded hover:bg-red-600 flex-shrink-0"
                >
                  <p className="sm:flex hidden">remove</p>
                  <div className="sm:hidden flex"> <FaTrash size={16} /></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-64 p-4 border rounded bg-gray-50 flex flex-col gap-2">
          <h2 className="text-lg font-gothic font-semibold mb-2">Summary</h2>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id + item.sizeLabel} className="text-sm">
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
          <p className=" font-medium mt-2">
            Total: <span className="text-green-600 font-semibold">₹</span>
            <span className="text-green-500 font-gothic text-lg ">{total}</span>
          </p>
          <button
            onClick={() => navigate("/checkout", { state: { cartTotal: total } })}
            className="mt-4 w-full bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700"
          >
            Checkout
          </button>
          <Link
            to="/categories"
            className="mt-2 w-full text-center block bg-gray-200 text-gray-700 rounded px-4 py-2 hover:bg-gray-300"
          >
            Shop More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
