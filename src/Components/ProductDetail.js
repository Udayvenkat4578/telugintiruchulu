// src/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import MiniCart from "./MiniCart";
import ProductCardMain from "./ProductCardMain";
import imagealt from "../Assets/imagealt.png";
import { Sparkles, Frown, RefreshCw } from "lucide-react";
import { ArrowDownWideNarrow } from "lucide-react";

const tips = [
  "Pickles taste best with hot rice and ghee 🍚✨",
  "Sweets are perfect for festive gifting 🎁",
  "Podis add magic to simple meals 🌶️",
  "Snacks are best enjoyed with friends ☕",
  "Homemade flavors, straight from tradition ❤️",
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart, openCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTip, setCurrentTip] = useState(tips[0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) {
          const prod = { id: snap.id, ...snap.data() };
          setProduct(prod);
          setSelectedCategory(prod.category);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  // Load all categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const cats = new Set();
        snap.forEach((doc) => cats.add(doc.data().category));
        setCategories(Array.from(cats));
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  // Load products of selected category
  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (!selectedCategory) return;
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", selectedCategory),
          limit(10)
        );
        const snap = await getDocs(q);
        const productsArr = [];
        snap.forEach((doc) => {
          if (doc.id !== id) productsArr.push({ id: doc.id, ...doc.data() });
        });
        setCategoryProducts(productsArr);
      } catch (err) {
        console.error("Error loading category products:", err);
      }
    };
    loadCategoryProducts();
  }, [selectedCategory, id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setShowSizeWarning(true);
      return;
    }

    const item = {
      id: product.id,
      name: product.name,
      category: product.category,
      imageUrl: product.imageUrl,
      sizeLabel: selectedSize?.label || product.sizes?.[0]?.label || "Standard",
      price: selectedSize ? Number(selectedSize.price) : Number(product.sizes?.[0]?.price) || 0,
      quantity,
    };

    addToCart(item);
    openCart();

    setAdding(true);
    setMiniCartOpen(true);
    setTimeout(() => setAdding(false), 2000);
    setQuantity(1);
    setSelectedSize(null);
    setShowSizeWarning(false);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{currentTip}</p>
    </div>
  );

  if (!product) return (
    <div className="p-8 text-center text-gray-500">
      <Frown size={48} className="mx-auto mb-4" />
      <p className="text-lg font-semibold">Product not found.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
      >
        Refresh
      </button>
    </div>
  );

  const prices = (product.sizes || []).map((s) => Number(s.price) || 0);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const priceRange = min === max ? `₹${min}` : `₹${min} - ₹${max}`;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-72 h-72 scale-110 object-cover rounded-lg shadow sm:mt-11 mt-6" />
          ) : (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg shadow">
              <img src={imagealt} alt="noimage" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="sm:pt-11 pt-2">
          <h1 className="text-2xl md:text-3xl font-gothic  text-gray-800">{product.name}</h1>
          <p className="text-md text-gray-500">{product.category}</p>
          <p className="text-2xl font-gothic mt-4 text-gray-700">{priceRange}</p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-gray-700">Weights / Sizes</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded border transition ${selectedSize === s ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300"}`}
                  >
                    {s.label} - ₹{s.price}
                  </button>
                ))}
              </div>
              {showSizeWarning && (
                <p className="text-red-600 font-medium mt-2">🥲 Please select a size before adding to cart</p>
              )}
            </div>
          )}

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-3">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-red-600 hover:text-white">-</button>
            <div className="px-3">{quantity}</div>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-red-600 hover:text-white">+</button>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className="mt-5 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`px-6 py-2 sm:text-lg text-md rounded text-white font-gothic ${adding ? "bg-green-600" : "bg-red-600 hover:bg-red-700"}`}
            >
              {adding ? "Added!" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`px-6 py-2 sm:text-lg text-md rounded font-gothic border ${isWishlisted(product.id) ? "bg-red-100 border-red-600 text-red-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}
            >
              {isWishlisted(product.id) ? "Wishlisted ❤️" : "Wishlist 🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Category Products */}
      {categories.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-gothic  mb-4 text-gray-700 flex flex-row items-center ">You may also like <ArrowDownWideNarrow className="pl-3 sm:w-12 w-10 sm:h-12 h-10 font-bold" /></h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded border whitespace-nowrap ${selectedCategory === cat ? "bg-red-600 text-white border-red-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex overflow-x-auto gap-4 py-2 ">
            {categoryProducts.length > 0 ? categoryProducts.map((p) => (
              <div key={p.id} className="flex-none w-60">
                <ProductCardMain product={p} />
              </div>
            )) : <p className="text-gray-500 px-4">No products found in this category.</p>}
          </div>
        </div>
      )}

      <MiniCart open={miniCartOpen} onClose={() => setMiniCartOpen(false)} />
    </div>
  );
};

export default ProductDetail;
