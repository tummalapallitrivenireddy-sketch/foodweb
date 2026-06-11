// Navbar.jsx
// Shows navigation links + a cart badge that shows how many items are in the cart

import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  // cartCount comes from App.jsx — it's the total quantity of all cart items

  return (
    <nav
      className="bg-red-600 text-white p-4"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}
    >
      <ul className="flex gap-8 justify-center font-semibold">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/veg">Veg Items</Link></li>
        <li><Link to="/nonveg">Non Veg Items</Link></li>

        {/* ✅ CART LINK with badge showing item count */}
        <li style={{ position: "relative" }}>
          <Link to="/cart">
            🛒 Cart
            {/* Only show the red badge if cart has items */}
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-14px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "1px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;