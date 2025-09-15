import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Categories from "./Components/Categories";
import CategoriesMain from "./Components/CategoriesMain";
import ProductDetail from "./Components/ProductDetail";
import CartPage from "./Components/CartPage";
import MiniCart from "./Components/MiniCart";
import { CartProvider } from "./Components/CartContext";
import { WishlistProvider } from "./Components/WishlistContext";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <MiniCart />
          <div className="bg-gray-50 min-h-screen">
                  <Navbar/>
            <main className="">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/categories" element={<CategoriesMain />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<div className="p-6">Not found</div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
