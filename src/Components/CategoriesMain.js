import React, { useEffect, useState, useMemo } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ProductCardMain from "./ProductCardMain";
import { useLocation } from "react-router-dom";
import { Sparkles, Frown, RefreshCw } from "lucide-react";

// 🍯 Random Tips
const tips = [
  "✨ Pro Tip: Pickles taste best with hot rice and a spoon of ghee.",
  "🍯 Sweets stay fresh longer if stored in an airtight container.",
  "🌶️ Balance your meals – a little pickle goes a long way!",
  "🥥 Coconut sweets bring out real festival vibes.",
  "🔥 Podi + Ghee = Heaven with steaming idlis!",
  "🍪 Crunchy snacks stay crispy if stored away from moisture.",
];

const RandomTip = () => {
  const [tip, setTip] = useState("");
  useEffect(() => {
    const changeTip = () => {
      const random = tips[Math.floor(Math.random() * tips.length)];
      setTip(random);
    };
    changeTip();
    const interval = setInterval(changeTip, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="px-4 py-3 font-gothic text-lg text-red-500 max-w-md text-center">
      <p className="text-sm text-gray-700 font-medium italic">{tip}</p>
    </div>
  );
};

const Categories = () => {
  const location = useLocation();
  const searchFromNavbar = location.state?.search || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchFromNavbar);
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const snap = await getDocs(q);
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(items);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return Array.from(set);
  }, [products]);

  // Filtered products based on search or category
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const productName = (p.name || "").toLowerCase();
      const productCat = (p.category || "").toLowerCase();

      if (activeCategory && productCat !== activeCategory.toLowerCase()) return false;

      if (q) {
        const inName = productName.includes(q);
        const inCategory = productCat.includes(q);
        return inName || inCategory;
      }

      return true;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="py-4 text-2xl md:text-4xl font-gothic text-center mb-1 text-gray-800 flex items-center justify-center gap-2">
        <Sparkles size={24} color="#ff0000" />
        Everything We Offer
        <Sparkles size={24} color="#ff0000" />
      </h2>

      <div className="max-w-2xl mx-auto">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveCategory(""); }}
          placeholder="Search by product name or category..."
          className="w-full border-2 p-3 rounded mb-4"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => { setActiveCategory(""); setSearch(""); }}
            className={`border-2 px-3 py-1 font-semibold text-gray-700 ${activeCategory === "" ? "bg-red-500 text-white border-red-500" : "bg-gray-100 border-gray-200 rounded-sm"}`}
          >
            All
          </button>

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setActiveCategory(c); setSearch(""); }}
              className={`border-2 px-3 py-1 font-semibold text-gray-700 ${activeCategory?.toLowerCase() === c.toLowerCase() ? "bg-red-500 text-white border-red-500" : "bg-gray-100 border-gray-200 rounded-sm"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <p className="text-gray-600 text-lg font-semibold animate-pulse">Loading your favourites...</p>
          <RandomTip />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <Frown size={48} className="text-gray-400" />
          <p className="text-gray-600 text-lg font-semibold">Oops! No products match your search.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory(""); }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            <RefreshCw size={18} /> Explore More
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 sm:px-2 md:px-4 lg:px-4 mx-1 sm:mx-3 md:mx-4 lg:mx-4">
          {filtered.map((p) => (
            <ProductCardMain key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
