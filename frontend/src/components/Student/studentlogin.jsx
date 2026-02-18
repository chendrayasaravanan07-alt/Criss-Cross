import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  };

  const cardStyle = {
    width: "420px",
    padding: "40px",
    borderRadius: "25px",
    backgroundColor: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  };

  const logoBox = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  };

  const iconStyle = {
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    padding: "18px",
    borderRadius: "20px",
    color: "white",
    fontSize: "20px",
  };

  const inputContainer = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: "15px",
    padding: "14px",
    marginBottom: "20px",
    backgroundColor: "#f9fafb",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    flex: 1,
    backgroundColor: "transparent",
    fontSize: "15px",
    marginLeft: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(to right, #3b82f6, #9333ea)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
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
            <h2 style={{ margin: 0 }}>Criss-Cross</h2>
            <p style={{ margin: 0, color: "#6b7280" }}>Student Portal</p>
          </div>
        </div>

        {/* Welcome */}
        <h2>Welcome Back!</h2>
        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Sign in to discover amazing hackathons
        </p>

        {/* Email */}
        <label>Email Address</label>
        <div style={inputContainer}>
          <FaEnvelope color="#9ca3af" />
          <input
            type="email"
            placeholder="you@university.edu"
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <label>Password</label>
        <div style={inputContainer}>
          <FaLock color="#9ca3af" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            style={inputStyle}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" />
            Remember me
          </label>
          <span style={{ color: "#2563eb", cursor: "pointer" }}>
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <Link to="/student" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>Sign In →</button>
        </Link>
    

        {/* Footer */}
        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }}>
            Create Student Account
          </span>
        </p>
      </div>
    </div>
  );
}
