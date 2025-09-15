import React, { useEffect, useMemo, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ProductCardMain from "./ProductCardMain";
import { useLocation } from "react-router-dom";

const Categories = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(location.state?.search || ""); // ✅ pre-fill from Navbar
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

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

  // derive categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => (p.category || "Uncategorized")));
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

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <input
          value={search}
          onChange={(e) => {setSearch(e.target.value);
                setActiveCategory("");
          }}
          placeholder="Search by product name or category..."
          className="w-full border-2 p-3 rounded mb-4"
        />

        {/* category buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 ">
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
              }

              }
                          

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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 
          px-2 sm:px-2 md:px-4 lg:px-4 mx-1 sm:mx-3 md:mx-4 lg:mx-4"
        >
          {filtered.map((p) => (
            <ProductCardMain key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
