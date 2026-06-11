function About() {
  return (
    <div className="min-h-screen p-6" style={{ paddingBottom: "100px", backgroundColor: "transparent" }}>
      
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          About Us 🧑‍🍳
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Welcome to our Food Store! We are passionate about serving delicious,
          fresh, and high-quality food to our customers. Our goal is to bring
          tasty meals right to your doorstep with fast delivery and great service.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Quality Food 🍲
          </h2>
          <p className="text-gray-600">
            We use fresh ingredients to ensure best taste and health.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">
            Fast Delivery 🚀
          </h2>
          <p className="text-gray-600">
            We deliver your food quickly and safely to your doorstep.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Customer Satisfaction ❤️
          </h2>
          <p className="text-gray-600">
            Our customers are our priority and we value their happiness.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;