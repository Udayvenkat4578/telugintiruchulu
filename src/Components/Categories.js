// src/components/Categories.js
import React, { useEffect, useMemo, useState } from "react";
import { db } from "./firebase"; 
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

const tips = [
  "Did you know? Our pickles are sun-dried for that authentic Andhra taste!",
  "Pro tip: Heat ghee and mix it with our podis for maximum flavor!",
  "Our sweets are prepared in small batches to ensure freshness always.",
  "Try pairing our crunchy snacks with evening tea – perfect combo!",
  "Festivals feel incomplete without our traditional Andhra delicacies.",
];

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [randomTip, setRandomTip] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const snap = await getDocs(q);
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(items);

      // set random tip on each fetch
      setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // responsive limit setter
  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(8); // lg screen
      } else if (window.innerWidth >= 768) {
        setVisibleCount(6); // md screen
      } else {
        setVisibleCount(6); // sm always 6
      }
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  // derive categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return Array.from(set);
  }, [products]);

  // filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!q) return true;
      const inName = (p.name || "").toLowerCase().includes(q);
      const inCategory = (p.category || "").toLowerCase().includes(q);
      return inName || inCategory;
    });
  }, [products, search, activeCategory]);

  // load more handler
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6); // load 6 more each time
      setLoadingMore(false);
    }, 800); // simulate delay animation
  };

  return (
    <div className="container mx-auto text-center py-10">
      <h2 className="text-2xl md:text-4xl font-gothic text-center mb-1 text-gray-800 flex items-center justify-center gap-2">
        <Sparkles size={24} color="#ff0000" />
        Our Products
        <Sparkles size={24} color="#ff0000" />
      </h2>
      <p className="text-gray-500 text-md font-gothic text-center mb-6">
        Crafted with love, served with joy.
      </p>

      <div className="max-w-2xl mx-auto">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveCategory("");
          }}
          placeholder="Search by product name or category..."
          className="sm:w-96 w-72 border-2 p-3 rounded mb-4 placeholder:font-medium placeholder:text-md"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => {
              setActiveCategory("");
              setSearch("");
            }}
            className={`border-2 px-3 py-1 font-semibold text-gray-700 rounded-sm transition ${
              activeCategory === ""
                ? "bg-red-500 text-white border-red-500"
                : "bg-gray-100 border-gray-200 hover:bg-red-100"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActiveCategory(c);
                setSearch("");
              }}
              className={`border-2 px-3 py-1 font-semibold text-gray-700 rounded-sm transition ${
                activeCategory === c
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-100 border-gray-200 hover:bg-red-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        // 🔥 Better loading with dots + random tip
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading products...</p>
          {randomTip && (
            <p className="text-gray-500 text-sm mt-2 italic max-w-md px-4">
              💡 {randomTip}
            </p>
          )}
        </div>
      ) : filtered.length === 0 ? (
        // 🔥 Friendly no products found
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-600 font-semibold text-lg mb-2">
            Oops! We couldn’t find anything matching your search 😔 
          </p>
          <p className="text-gray-500 mb-4">
            But don’t worry 😊, we have plenty of sweets, snacks & pickles waiting!
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("");
            }}
            className="px-6 py-2 bg-red-600 text-white rounded hover:scale-105 transition"
          >
            Explore All Products
          </button>
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
              sm:gap-6 gap-4 px-2 sm:px-2 md:px-4 lg:px-4 mx-1 sm:mx-3 md:mx-4 lg:mx-4"
          >
            {filtered.slice(0, visibleCount).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-2 bg-red-600 text-white rounded hover:scale-105 transition"
              >
                {loadingMore ? "Loading more..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
