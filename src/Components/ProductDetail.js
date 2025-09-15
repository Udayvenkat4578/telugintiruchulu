import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { useCart } from "./CartContext";
import MiniCart from "./MiniCart";
import ProductCardMain from "./ProductCardMain";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);

  // Load main product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const prod = { id: snap.id, ...snap.data() };
          setProduct(prod);
          setSelectedCategory(prod.category); // default selected category
        }
      } catch (err) {
        console.error("Error loading product:", err);
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
        snap.forEach((doc) => {
          cats.add(doc.data().category);
        });
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

  if (!product) return <div className="p-8 text-center">Loading product...</div>;

  const prices = (product.sizes || []).map((s) => Number(s.price) || 0);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  const priceRange = min === max ? `₹${min}` : `₹${min} - ₹${max}`;

  const handleAddToCart = () => {
    if (!selectedSize && (product.sizes || []).length > 0) {
      alert("Please select a size.");
      return;
    }
    const price = selectedSize ? Number(selectedSize.price) : (prices[0] || 0);
    const item = {
      id: product.id,
      name: product.name,
      category: product.category,
      imageUrl: product.imageUrl,
      sizeLabel: selectedSize ? selectedSize.label : (product.sizes?.[0]?.label || "1"),
      price,
      quantity,
    };
    addToCart(item);
    setAdding(true);
    setMiniCartOpen(true);
    setTimeout(() => setAdding(false), 3000);
    setQuantity(1);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded" />
          ) : (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <p className="text-lg font-semibold mt-4">{priceRange}</p>

          {/* Sizes */}
          <div className="mt-6">
            <h4 className="font-medium">Weights / Sizes</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {(product.sizes || []).map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1 rounded border ${selectedSize === s ? "bg-blue-600 text-white" : ""}`}
                >
                  {s.label} - ₹{s.price}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded">-</button>
            <div className="px-3">{quantity}</div>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border rounded">+</button>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`px-4 py-2 rounded text-white ${adding ? "bg-green-500" : "bg-blue-600"}`}
            >
              {adding ? "Added!" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">You may also like</h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded border ${
                  selectedCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Horizontal scrolling products */}
          <div className="flex overflow-x-auto gap-4 py-2">
            {categoryProducts.map((p) => (
              <div key={p.id} className="flex-none w-60">
                <ProductCardMain product={p} />
              </div>
            ))}
            {categoryProducts.length === 0 && <p className="text-gray-500 px-4">No products found in this category.</p>}
          </div>
        </div>
      )}

      {/* MiniCart */}
      <MiniCart open={miniCartOpen} onClose={() => setMiniCartOpen(false)} />
    </div>
  );
};

export default ProductDetail;
