import { useSelector } from "react-redux";

function NonVegitems({ addToCart }) {
  const nonVegItems = useSelector((state) => state.products.nonveg);

  return (
    <div className="p-6" style={{ paddingBottom: "100px" }}>
      <h1 className="text-4xl font-bold text-center mb-8">🍗 Non Veg Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nonVegItems.map((item) => (
          <div key={item.id} className="border rounded-lg shadow-lg p-4 text-center">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold mt-3">{item.name}</h3>
            <p className="text-red-600 font-semibold">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-3"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonVegitems;
