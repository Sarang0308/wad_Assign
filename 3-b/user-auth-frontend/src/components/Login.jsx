import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <p style={styles.text}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f3f4f6" },
  form: { padding: 30, background: "#fff", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 300 },
  heading: { textAlign: "center", marginBottom: 20 },
  input: { width: "100%", padding: 10, margin: "10px 0", borderRadius: 5, border: "1px solid #ccc" },
  button: { width: "100%", padding: 10, backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: 5, fontWeight: "bold" },
  text: { marginTop: 10, textAlign: "center" },
  link: { color: "#3b82f6", textDecoration: "underline", cursor: "pointer" },
  error: { color: "#ef4444", textAlign: "center" }
};

export default Login;
