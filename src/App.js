import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CategoriesMain from "./Components/CategoriesMain";
import ProductDetail from "./Components/ProductDetail";
import CartPage from "./Components/CartPage";
import MiniCart from "./Components/MiniCart";
import { CartProvider } from "./Components/CartContext";
import { WishlistProvider } from "./Components/WishlistContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import WishlistPage from "./Components/WishlistPage";
import AboutUs from "./Components/AboutUs";
import Checkout from "./Components/CheckoutPage"; // ✅ Added

import Payment from "./Components/Payment"; // ✅ Added
function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <MiniCart />
          <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/categories" element={<CategoriesMain />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/Aboutus" element={<AboutUs />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} /> {/* ✅ Added */}
                <Route path="/wishlist" element={<WishlistPage />} /> {/* ✅ Added */}
                <Route path="*" element={<div className="p-6">Not found</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}
export default App;