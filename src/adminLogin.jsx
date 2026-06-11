import { useState, useEffect } from "react";
import api from "./axios.jsx";
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("products"); // "products" | "contacts" | "bookings"

  // Products state
  const [name, setName]         = useState("");
  const [price, setPrice]       = useState("");
  const [image, setImage]       = useState("");
  const [category, setCategory] = useState("veg");
  const [products, setProducts] = useState([]);
  const [msg, setMsg]           = useState("");
  const [loading, setLoading]   = useState(false);

  // Contacts & Bookings state
  const [contacts, setContacts]   = useState([]);
  const [bookings, setBookings]   = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
      fetchContacts();
      fetchBookings();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch {
      setMsg("❌ Cannot connect to server.");
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get("/api/contact");
      setContacts(res.data.data || []);
    } catch {
      setContacts([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data.data || []);
    } catch {
      setBookings([]);
    }
  };

  const saveProduct = async () => {
    if (!name || !price || !image || !category) { setMsg("⚠️ Please fill in all fields"); return; }
    setLoading(true);
    try {
      const res = await api.post("/api/products", { name, price, image, category });
      if (res.data._id) {
        setMsg("✅ Product saved successfully!");
        setName(""); setPrice(""); setImage(""); setCategory("veg");
        fetchProducts();
      } else {
        setMsg("❌ Server rejected the request");
      }
    } catch {
      setMsg("❌ Server not reachable.");
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch {
      setMsg("❌ Delete failed");
    }
  };

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true); setLoginError("");
    } else {
      setLoginError("❌ Wrong username or password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginBox}>
          <h2 style={styles.loginTitle}>🔐 Admin Login</h2>
          <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={styles.input} />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={styles.input} />
          {loginError && <p style={{ color: "red", marginBottom: "10px" }}>{loginError}</p>}
          <button onClick={handleLogin} style={styles.btn}>Login</button>
          <p style={{ color: "#aaa", fontSize: "13px", marginTop: "12px" }}>
            Demo → username: <b>admin</b> | password: <b>admin123</b>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashWrap}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        {["products", "contacts", "bookings"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            ...styles.tabBtn,
            background: tab === t ? "#f97316" : "#e5e7eb",
            color: tab === t ? "white" : "#333",
          }}>
            {t === "products" ? "🍽️ Products" : t === "contacts" ? "📩 Contacts" : "📋 Bookings"}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS TAB ── */}
      {tab === "products" && (
        <>
          <div style={styles.formBox}>
            <h2 style={styles.sectionTitle}>➕ Add New Product</h2>
            <input type="text" placeholder="Product Name" value={name}
              onChange={(e) => setName(e.target.value)} style={styles.input} />
            <input type="number" placeholder="Price" value={price}
              onChange={(e) => setPrice(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Image URL e.g. /paneer.jpg" value={image}
              onChange={(e) => setImage(e.target.value)} style={styles.input} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              style={{ ...styles.input, background: "white" }}>
              <option value="veg">🥦 Veg</option>
              <option value="nonveg">🍗 Non-Veg</option>
            </select>
            <button onClick={saveProduct} disabled={loading}
              style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Saving..." : "💾 Save Product"}
            </button>
            {msg && <p style={{ marginTop: "10px", fontWeight: "bold",
              color: msg.startsWith("✅") ? "green" : msg.startsWith("⚠️") ? "orange" : "red" }}>{msg}</p>}
          </div>

          <div style={{ marginTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={styles.sectionTitle}>📋 Saved Products ({products.length})</h2>
              <button onClick={fetchProducts} style={styles.refreshBtn}>🔄 Refresh</button>
            </div>
            {products.length === 0 ? (
              <p style={{ color: "#888", textAlign: "center", padding: "30px" }}>No products yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ background: "#f97316", color: "white" }}>
                      <th style={styles.th}>#</th>
                      <th style={styles.th}>Image</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Category</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={p._id} style={{ background: i % 2 === 0 ? "#fff" : "#fef9f5" }}>
                        <td style={styles.td}>{i + 1}</td>
                        <td style={styles.td}>
                          <img src={p.image} alt={p.name}
                            style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                            onError={(e) => { e.target.style.display = "none"; }} />
                        </td>
                        <td style={{ ...styles.td, fontWeight: "600" }}>{p.name}</td>
                        <td style={{ ...styles.td, color: "green", fontWeight: "bold" }}>₹{p.price}</td>
                        <td style={styles.td}>
                          <span style={{
                            background: p.category === "veg" ? "#d1fae5" : "#fee2e2",
                            color: p.category === "veg" ? "#065f46" : "#991b1b",
                            padding: "3px 10px", borderRadius: "20px", fontSize: "13px"
                          }}>
                            {p.category === "veg" ? "🥦 Veg" : "🍗 Non-Veg"}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => deleteProduct(p._id)} style={styles.deleteBtn}>🗑️ Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── CONTACTS TAB ── */}
      {tab === "contacts" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={styles.sectionTitle}>📩 Contact Messages ({contacts.length})</h2>
            <button onClick={fetchContacts} style={styles.refreshBtn}>🔄 Refresh</button>
          </div>
          {contacts.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", padding: "30px" }}>No contact messages yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ background: "#f97316", color: "white" }}>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={c._id} style={{ background: i % 2 === 0 ? "#fff" : "#fef9f5" }}>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={{ ...styles.td, fontWeight: "600" }}>{c.name}</td>
                      <td style={styles.td}>{c.email}</td>
                      <td style={{ ...styles.td, maxWidth: "300px" }}>{c.description}</td>
                      <td style={{ ...styles.td, fontSize: "12px", color: "#888" }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── BOOKINGS TAB ── */}
      {tab === "bookings" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={styles.sectionTitle}>📋 Bookings ({bookings.length})</h2>
            <button onClick={fetchBookings} style={styles.refreshBtn}>🔄 Refresh</button>
          </div>
          {bookings.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", padding: "30px" }}>No bookings yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ background: "#f97316", color: "white" }}>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Pickup</th>
                    <th style={styles.th}>Drop</th>
                    <th style={styles.th}>Vehicle</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id} style={{ background: i % 2 === 0 ? "#fff" : "#fef9f5" }}>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={{ ...styles.td, fontWeight: "600" }}>{b.customerName}</td>
                      <td style={styles.td}>{b.phone}</td>
                      <td style={styles.td}>{b.pickupLocation}</td>
                      <td style={styles.td}>{b.dropLocation}</td>
                      <td style={styles.td}>{b.vehicleType}</td>
                      <td style={styles.td}>
                        <span style={{
                          background: b.status === "Pending" ? "#fef3c7" : "#d1fae5",
                          color: b.status === "Pending" ? "#92400e" : "#065f46",
                          padding: "3px 10px", borderRadius: "20px", fontSize: "13px"
                        }}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ ...styles.td, fontSize: "12px", color: "#888" }}>
                        {new Date(b.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  loginWrap:    { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" },
  loginBox:     { width: "380px", padding: "36px", border: "1px solid #ddd", borderRadius: "12px", textAlign: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
  loginTitle:   { fontSize: "26px", fontWeight: "bold", marginBottom: "20px" },
  dashWrap:     { maxWidth: "960px", margin: "20px auto", padding: "20px" },
  formBox:      { background: "#fffbf7", padding: "24px", borderRadius: "12px", border: "1px solid #f0e0d0" },
  sectionTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "4px" },
  input:        { display: "block", width: "100%", padding: "10px 14px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "15px", boxSizing: "border-box" },
  btn:          { width: "100%", padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
  logoutBtn:    { padding: "8px 18px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  refreshBtn:   { padding: "6px 14px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" },
  tabBtn:       { padding: "8px 18px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" },
  table:        { width: "100%", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden" },
  th:           { padding: "12px 14px", textAlign: "left", fontWeight: "bold" },
  td:           { padding: "10px 14px", borderBottom: "1px solid #f0f0f0" },
  deleteBtn:    { padding: "5px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "13px" },
};

export default Admin;
