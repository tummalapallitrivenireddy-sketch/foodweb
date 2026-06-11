// Products.jsx
// This page fetches all products saved by the admin from the backend server
// and displays them as cards with an "Add to Cart" button.
// Visit this page at: http://localhost:5173/products

import { useState, useEffect } from "react";

const API = "http://localhost:5000"; // Backend server address

function Products({ addToCart }) {
  const [products, setProducts] = useState([]); // Products fetched from server
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  // Fetch products from server when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("❌ Cannot connect to server. Make sure server.js is running.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6" style={{ paddingBottom: "100px" }}>
      <h1 className="text-4xl font-bold text-center mb-8">🍽️ All Products</h1>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500 text-lg mt-10">Loading products...</p>
      )}

      {/* Error state — shown when server is not running */}
      {error && (
        <div style={{ textAlign:"center", marginTop:"40px" }}>
          <p style={{ color:"red", fontSize:"18px" }}>{error}</p>
          <button
            onClick={fetchProducts}
            style={{ marginTop:"16px", padding:"10px 24px", background:"#f97316",
              color:"white", border:"none", borderRadius:"8px", cursor:"pointer", fontSize:"15px" }}
          >
            🔄 Try Again
          </button>
        </div>
      )}

      {/* No products yet */}
      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign:"center", marginTop:"40px" }}>
          <p style={{ fontSize:"18px", color:"#888" }}>
            No products added yet.
          </p>
          <p style={{ color:"#aaa", marginTop:"8px" }}>
            Go to <b>/admin</b> and add products first.
          </p>
        </div>
      )}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <>
          {/* Category filter counts */}
          <div style={{ display:"flex", justifyContent:"center", gap:"16px", marginBottom:"24px" }}>
            <span style={{ background:"#d1fae5", color:"#065f46", padding:"6px 16px", borderRadius:"20px", fontWeight:"bold" }}>
              🥦 Veg: {products.filter(p => p.category === "veg").length}
            </span>
            <span style={{ background:"#fee2e2", color:"#991b1b", padding:"6px 16px", borderRadius:"20px", fontWeight:"bold" }}>
              🍗 Non-Veg: {products.filter(p => p.category === "nonveg").length}
            </span>
            <span style={{ background:"#fef3c7", color:"#92400e", padding:"6px 16px", borderRadius:"20px", fontWeight:"bold" }}>
              Total: {products.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow-lg p-4 text-center"
                style={{ position:"relative" }}
              >
                {/* Category badge on top-left */}
                <span style={{
                  position:"absolute", top:"10px", left:"10px",
                  background: item.category === "veg" ? "#d1fae5" : "#fee2e2",
                  color:      item.category === "veg" ? "#065f46" : "#991b1b",
                  padding:"3px 10px", borderRadius:"20px", fontSize:"12px", fontWeight:"bold"
                }}>
                  {item.category === "veg" ? "🥦 Veg" : "🍗 Non-Veg"}
                </span>

                {/* Product image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => { e.target.src = "https://placehold.co/300x200?text=" + item.name; }}
                />

                <h3 className="text-xl font-bold mt-3 capitalize">{item.name}</h3>

                <p className={`font-semibold text-lg mt-1 ${item.category === "veg" ? "text-green-600" : "text-red-600"}`}>
                  ₹{item.price}
                </p>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-3"
                  style={{ width:"100%", fontWeight:"bold", fontSize:"15px" }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;