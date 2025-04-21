import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("No session found.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Error fetching user data");
        } else {
          setUser(data);
        }
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Dashboard</h2>
        {error && <p style={styles.error}>{error}</p>}
        {user ? (
          <div style={styles.userInfo}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          !error && <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    width: "400px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center",
    color: "#1f2937",
  },
  userInfo: {
    fontSize: "1rem",
    lineHeight: "1.8",
    color: "#374151",
  },
  logoutButton: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#ef4444",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: "15px",
  },
};

export default Dashboard;
