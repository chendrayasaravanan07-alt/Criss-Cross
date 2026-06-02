import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/student/login",
      {
        email,
        password,
      }
    );

    if (res.data.success) {
      localStorage.setItem("studentToken", res.data.token);

      localStorage.setItem(
        "studentData",
        JSON.stringify(res.data.student)
      );

      alert("Login Successful");

      navigate("/student/dashboard");
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  };

  const cardStyle = {
    width: "35%",
    padding: "4%",
    borderRadius: "3vh",
    backgroundColor: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  };

  const logoBox = {
    display: "flex",
    alignItems: "center",
    gap: "3%",
    marginBottom: "4%",
  };

  const iconStyle = {
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    padding: "2%",
    borderRadius: "2.5vh",
    color: "white",
    fontSize: "2.2vh",
  };

  const inputContainer = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: "2vh",
    padding: "1.5%",
    marginBottom: "2.5%",
    backgroundColor: "#f9fafb",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    backgroundColor: "transparent",
    fontSize: "1.6vh",
    marginLeft: "2%",
  };

  const buttonStyle = {
    width: "100%",
    padding: "1.8%",
    borderRadius: "2vh",
    border: "none",
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    color: "white",
    fontSize: "2vh",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1.5%",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoBox}>
          <div style={iconStyle}>
            <FaLink />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "2.4vh" }}>Criss-Cross</h2>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "1.5vh" }}>Student Portal</p>
          </div>
        </div>

        {/* Welcome */}
        <h2 style={{ fontSize: "2.6vh", marginBottom: "1%" }}>Welcome Back!</h2>
        <p style={{ color: "#6b7280", marginBottom: "3%", fontSize: "1.5vh" }}>
          Sign in to discover amazing hackathons
        </p>

        {/* Email */}
        <label style={{ fontSize: "1.4vh" }}>Email Address</label>
        <div style={inputContainer}>
          <FaEnvelope color="#9ca3af" />
          <input
            type="email"
            placeholder="you@university.edu"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <label style={{ fontSize: "1.4vh" }}>Password</label>
        <div style={inputContainer}>
          <FaLock color="#9ca3af" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEye
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Remember + Forgot */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5%",
        }}>
          <label style={{ display: "flex", alignItems: "center", gap: "2%", fontSize: "1.4vh" }}>
            <input type="checkbox" />
            Remember me
          </label>
          <span style={{ color: "#2563eb", cursor: "pointer", fontSize: "1.4vh" }}>
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
  style={buttonStyle}
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Signing In..." : "Sign In →"}
</button>

        {/* Footer */}
        <p style={{ marginTop: "3%", textAlign: "center", fontSize: "1.4vh" }}>
          Don't have an account?{" "}
          <Link
            to="/student-reg"
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600", textDecoration: "none" }}
          >
            Create Student Account
          </Link>
        </p>
      </div>
    </div>
  );
}