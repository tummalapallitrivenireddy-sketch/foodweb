function Home() {
  return (
    <div className="min-h-screen p-6" style={{ paddingBottom: "100px", backgroundColor: "transparent" }}>
      
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-black mb-4">
          Good food n Good Mood! 
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Discover best Veg items, bestest Non-Veg dishes, and yummy meals
          Delicious food made for you. Satisfy your hungry today anytime, anywhere.
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-green-700 transition">
          Explore Menu
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Fresh Veg Items 🥦
          </h2>
          <p className="text-gray-600">
            Healthy and fresh vegetables cooked with pure ingredients.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Non-Veg Specials 🍗
          </h2>
          <p className="text-gray-600">
            Spicy and tasty chicken, mutton and seafood dishes.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">
            Fast Delivery 🚀
          </h2>
          <p className="text-gray-600">
            Delicious food,Delivered Fresh to your doorstep in Minutes.S
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;