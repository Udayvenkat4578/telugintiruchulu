import React, { useEffect, useMemo, useState } from "react";
import { db } from "./firebase"; 
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ProductCard from "./ProductCard";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

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
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <input
          value={search}
          onChange={(e) => {setSearch(e.target.value);
                setActiveCategory("");
          }}
          placeholder="Search by product name or category..."
          className="w-full border-2 p-3 rounded mb-4"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => {setActiveCategory("");
                setSearch("");
            }}
            className={`border-2 px-3 py-1 ${
              activeCategory === ""
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {setActiveCategory(c);
                setSearch("");
              }}
              className={`border-2 px-3 py-1 ${
                activeCategory === c
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
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
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading more...
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
