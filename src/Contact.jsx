import React, { useState } from "react";
import api from "./axios.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/contact", formData);
      if (response.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", description: "" });
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📬 Contact FoodHub</h1>
        <p style={styles.subtext}>Have a question or feedback? We'd love to hear from you!</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Message</label>
            <textarea
              name="description"
              placeholder="Write your message here..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              style={{ ...styles.input, resize: "vertical" }}
            />
          </div>

          <button type="submit" style={styles.btn}>Send Message 🚀</button>
        </form>

        {status === "success" && (
          <div style={{ ...styles.alert, background: "#d1fae5", color: "#065f46", border: "1px solid #6ee7b7" }}>
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div style={{ ...styles.alert, background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" }}>
            ❌ Failed to send message. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#8b2e21",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtext: {
    color: "#888",
    textAlign: "center",
    marginBottom: "28px",
    fontSize: "15px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#444" },
  input: {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    padding: "12px",
    background: "linear-gradient(90deg, #f97316, #a73b1a)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "6px",
  },
  alert: {
    marginTop: "20px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default Contact;
