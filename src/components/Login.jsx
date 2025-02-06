import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors

  // Check if the user is already logged in using localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "/dashboard"; // Redirect to dashboard if already logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend API for authentication
      const response = await axios.post("http://localhost:8080/login", null, {
        params: {
          username: username,
          password: password,
        },
      });

      // If login is successful, set the flag in localStorage and redirect
      if (response.data === "Login successful") {
        localStorage.setItem("isLoggedIn", "true"); // Set login flag to true
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      console.error("Login error", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
