import { useState } from "react";
import api from "./axios.jsx";

function Booking() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "Truck",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/bookings", formData);
      if (res.data.success) {
        setStatus("✅ Booking confirmed successfully!");
        setFormData({ customerName: "", phone: "", pickupLocation: "", dropLocation: "", vehicleType: "Truck" });
      }
    } catch {
      setStatus("❌ Failed to submit booking. Try again.");
    }
  };

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>🚚 Book a Delivery</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} type="text" name="customerName" placeholder="Your Name"
          value={formData.customerName} onChange={handleChange} required />
        <input style={styles.input} type="tel" name="phone" placeholder="Phone Number"
          value={formData.phone} onChange={handleChange} required />
        <input style={styles.input} type="text" name="pickupLocation" placeholder="Pickup Location"
          value={formData.pickupLocation} onChange={handleChange} required />
        <input style={styles.input} type="text" name="dropLocation" placeholder="Drop Location"
          value={formData.dropLocation} onChange={handleChange} required />
        <select style={styles.input} name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
          <option value="Truck">Truck</option>
          <option value="Bike">Bike</option>
          <option value="Van">Van</option>
        </select>
        <button style={styles.btn} type="submit">Confirm Booking</button>
      </form>
      {status && <p style={{ marginTop: "14px", fontWeight: "bold", color: status.startsWith("✅") ? "green" : "red" }}>{status}</p>}
    </div>
  );
}

const styles = {
  wrap:  { maxWidth: "480px", margin: "40px auto", padding: "20px" },
  title: { fontSize: "26px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" },
  form:  { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px 14px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "15px" },
  btn:   { padding: "12px", background: "#f97316", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
};

export default Booking;
