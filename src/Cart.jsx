// Cart.jsx
// Shows all cart items with + / - buttons to change quantity
// Also shows total price at the bottom

function Cart({ cartItems, increment, decrement }) {
  // Calculate total bill: sum of (price × quantity) for all items
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6" style={{ paddingBottom: "100px" }}>
      <h1 className="text-4xl font-bold text-center mb-8">🛒 Cart Items</h1>

      {/* If cart is empty, show message */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">Cart is Empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.category}`}
                className="border rounded-lg shadow-lg p-4 text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded"
                />

                <h3 className="text-xl font-bold mt-3">{item.name}</h3>
                <p className="text-green-600 font-semibold">₹{item.price}</p>

                {/* ✅ INCREMENT / DECREMENT buttons */}
                <div className="flex justify-center items-center gap-4 mt-3">
                  {/* Minus button → decrease quantity */}
                  <button
                    onClick={() => decrement(item.id, item.category)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-lg font-bold"
                  >
                    −
                  </button>

                  {/* Show current quantity */}
                  <span className="text-xl font-bold">{item.quantity}</span>

                  {/* Plus button → increase quantity */}
                  <button
                    onClick={() => increment(item.id, item.category)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for this item */}
                <p className="mt-2 text-gray-600">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ Total bill at the bottom */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-orange-600">
              Total: ₹{total}
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;