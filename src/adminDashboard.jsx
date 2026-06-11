import { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // LOAD from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("products");

    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // ADD PRODUCT
  function addProduct(e) {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("All fields required");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      image, // example: egg-noodles.jpg
    };

    const updated = [...products, newProduct];

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");
    setImage("");
  }

  // DELETE PRODUCT
  function deleteProduct(id) {
    const updated = products.filter((item) => item.id !== id);

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  return (
    <div className="min-h-screen bg-orange-50 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <form
        onSubmit={addProduct}
        className="max-w-xl bg-white p-6 rounded shadow mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          Add Product
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Image name (egg-noodles.jpg)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-orange-600 text-white px-4 py-2">
          Save Product
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow rounded"
          >
            {/* IMAGE */}
            <img
              src={
                product.image
                  ? `/${product.image}`
                  : "https://via.placeholder.com/300"
              }
              alt={product.name}
              className="h-40 w-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300";
              }}
            />

            {/* NAME */}
            <h3 className="text-xl font-bold mt-2">
              {product.name}
            </h3>

            {/* PRICE */}
            <p className="text-gray-700">
              ₹{product.price}
            </p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;