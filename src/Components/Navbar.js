import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext"; 
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import logo from "../Assets/logo.png";

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hideSearch = location.pathname === "/categories" || location.pathname === "/wishlist";

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate("/categories", { state: { search: searchQuery } });
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Toggle handlers (mutually exclusive)
  const toggleSearch = () => { setSearchOpen(!searchOpen); setMenuOpen(false); };
  const toggleMenu = () => { setMenuOpen(!menuOpen); setSearchOpen(false); };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden py-7">
            <button onClick={toggleMenu} className="text-gray-600 text-2xl">
              {menuOpen ? <FaTimes className="text-red-500" /> : <FaBars className="text-red-500" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <img src={logo} className="sm:h-12 h-24 sm:pt-0 pt-5" alt="Logo" />
              <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-red-500">Telugintiruchulu</h2>
                <p className="text-xs text-gray-600">Flavours that tell a Story</p>
              </div>
            </Link>
          </div>

          {/* Mobile right icons */}
          <div className="flex items-center gap-4 md:hidden">
            {!hideSearch && <button onClick={toggleSearch} className="text-gray-600 text-xl"><FaSearch className="text-red-500" /></button>}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-red-500" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>}
            </Link>
          </div>

          {/* Desktop search */}
          {!hideSearch && (
            <div className="hidden md:flex flex-1 justify-center md:pr-11 pr-0 mr-11">
              <form onSubmit={handleSearch} className="w-full h-11 flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-red-300 focus:outline-none rounded-l-md placeholder:text-red-400"
                />
                <button type="submit" className="px-4 bg-red-500 text-white rounded-r-md">
                  <FaSearch className="h-5 w-full hover:scale-110" />
                </button>
              </form>
            </div>
          )}

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/" className="hover:text-red-600 font-gothic text-sm text-gray-800">Home</Link>
            <Link to="/categories" className="hover:text-red-600 font-gothic text-sm text-gray-800">Products</Link>
            <Link to="/aboutus" className="hover:text-red-600 font-gothic text-sm text-gray-800">About Us</Link>
          </div>

          {/* Desktop Wishlist & Cart */}
          <div className="hidden md:flex items-center gap-4 ml-4 pr-4">
            <Link to="/wishlist" className="relative">
              <FaHeart className="text-2xl text-red-500" />
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-red-500" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>}
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile search overlay */}
      {!hideSearch && searchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-red-300 rounded-l-md focus:outline-none placeholder:text-red-400"
            />
            <button type="submit" className="px-4 bg-red-500 text-white rounded-r-md">
              <FaSearch className="h-5 w-full hover:scale-110" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden px-4 pb-3">
          <div className="flex flex-col px-7 py-6">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-red-600 font-gothic text-md text-gray-800">Home</Link>
            <Link to="/categories" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-red-600 font-gothic text-md text-gray-800">Products</Link>
            <Link to="/aboutus" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-red-600 font-gothic text-md text-gray-800">About Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
