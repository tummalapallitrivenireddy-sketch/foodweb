import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { id: 1, name: "palakpaneer",          price: 200, image: "/palakpaneer.jpg" },
      { id: 2, name: "veg pizza",             price: 100, image: "/veg pizza.jpg" },
      { id: 3, name: "paneer butter masala",  price: 300, image: "/paneer butter masala.jpg" },
      { id: 4, name: "veg biryani",           price: 400, image: "/veg biryani.jpg" },
      { id: 5, name: "veg burger",            price: 250, image: "/veg burger.jpg" },
      { id: 6, name: "veg manchurian",        price: 350, image: "/veg manchurian.jpg" },
    ],
    nonveg: [
      { id: 1, name: "chicken shawarma", price: 500, image: "/chicken shawarma.jpg" },
      { id: 2, name: "seekh kabab",      price: 300, image: "/seekh kabab.jpg" },
      { id: 3, name: "chicken biryani",  price: 500, image: "/chicken biryani.jpg" },
      { id: 4, name: "mutton biryani",   price: 600, image: "/mutton biryani.jpg" },
      { id: 5, name: "prawns fry",       price: 400, image: "/prawns.jpg" },
      { id: 6, name: "chicken 65",       price: 450, image: "/chicken 65.jpg" },
    ],
  },
  reducers: {},
});

const store = configureStore({
  reducer: { products: productSlice.reducer },
});

export default store;
