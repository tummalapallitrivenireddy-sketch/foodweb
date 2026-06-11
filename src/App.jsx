import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import About from "./Aboutus";
import Contact from "./Contact";
import Vegitems from "./Vegitems";
import NonVegitems from "./NonVegitems";
import Cart from "./Cart";
import Admin from "./adminLogin";

function App() {
  // cartItems = list of items, each has { id, name, price, image, quantity }
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART: if item already exists → increase quantity, else add new
  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // INCREMENT quantity of one item
  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x))
    );
  };

  // DECREMENT quantity — remove item if quantity reaches 0
  const decrement = (id) => {
    setCartItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, quantity: x.quantity - 1 } : x))
        .filter((x) => x.quantity > 0)
    );
  };

  // CART COUNT: total number of items (sum of all quantities)
  const cartCount = cartItems.reduce((sum, x) => sum + x.quantity, 0);

  return (
    <BrowserRouter>
      <AppLayout cartCount={cartCount} addToCart={addToCart} increment={increment} decrement={decrement} cartItems={cartItems} />
    </BrowserRouter>
  );
}

function AppLayout({ cartCount, addToCart, increment, decrement, cartItems }) {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      {!isAdmin && <Navbar cartCount={cartCount} />}

      <div style={{ paddingTop: isAdmin ? "0" : "70px", paddingBottom: isAdmin ? "0" : "80px" }}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/veg"     element={<Vegitems addToCart={addToCart} />} />
          <Route path="/nonveg"  element={<NonVegitems addToCart={addToCart} />} />
          <Route path="/cart"    element={<Cart cartItems={cartItems} increment={increment} decrement={decrement} />} />
          <Route path="/admin"   element={<Admin />} />
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
