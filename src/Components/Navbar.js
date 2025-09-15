import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { cart, closeCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate("/categories", { state: { search: searchQuery } });
    setSearchOpen(false);
    setSearchQuery("");
  };

  // ✅ Hide search if we are on categories page
  const hideSearch = location.pathname === "/categories";

  // Toggle search (auto-close menu)
  const toggleSearch = () => {
    if (menuOpen) setMenuOpen(false);
    setSearchOpen((prev) => !prev);
  };

  // Toggle menu (auto-close search)
  const toggleMenu = () => {
    if (searchOpen) setSearchOpen(false);
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile left - Hamburger / X */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Logo (center on mobile, left on desktop) */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MyShop
            </Link>
          </div>

          {/* Right side (mobile: search + cart) */}
          <div className="flex items-center gap-4 md:hidden">
            {!hideSearch && (
              <button
                onClick={toggleSearch}
                className="text-gray-600 text-xl"
              >
                <FaSearch />
              </button>
            )}
            <Link to="/cart" className="relative">
              <button onClick={closeCart}>
                <FaShoppingCart className="text-2xl text-gray-700" />
              </button>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop search bar (hide if on categories) */}
          {!hideSearch && (
            <div className="hidden md:flex flex-1 justify-center">
              <form onSubmit={handleSearch} className="w-2/3 flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 bg-blue-600 text-white rounded-r-md"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/categories" className="hover:text-blue-600">
              Products
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact Us
            </Link>
          </div>

          {/* Cart (desktop only, already included above for mobile) */}
          <div className="hidden md:flex items-center ml-4">
            <Link to="/cart" className="relative">
              <button onClick={closeCart}>
                <FaShoppingCart className="text-2xl text-gray-700" />
              </button>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile search bar dropdown (overlay, not push) */}
      {!hideSearch && searchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 bg-blue-600 text-white rounded-r-md"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu dropdown (overlay, not push) */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden px-4 pb-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-600"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
