import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    try {
      await api.post("/register/", { username, password });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Register</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;