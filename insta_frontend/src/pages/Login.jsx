import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            const res = await api.post("/login/", { username, password });
            localStorage.setItem("access", res.data.access);
            navigate("/feed");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
  <div className="auth-wrapper">
    <div className="auth-box">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        New user? <a href="/register">Register</a>
      </p>
    </div>
  </div>
);

}

export default Login;

