import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "430px",
    padding: "40px",
    borderRadius: "30px",
    backgroundColor: "#ffffff",
    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
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

  const secureBoxStyle = {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "15px",
    backgroundColor: "#fef3c7",
    border: "1px solid #facc15",
    color: "#92400e",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoBox}>
          <div style={iconStyle}>
            <FaShieldAlt />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Criss-Cross</h2>
            <p style={{ margin: 0, color: "#6b7280" }}>
              Admin Portal
            </p>
          </div>
        </div>

        {/* Heading */}
        <h2>Admin Access</h2>
        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Sign in to manage the platform
        </p>

        {/* Email */}
        <label>Email Address</label>
        <div style={inputContainer}>
          <FaEnvelope color="#9ca3af" />
          <input
            type="email"
            placeholder="admin@criss-cross.com"
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <label>Password</label>
        <div style={inputContainer}>
          <FaLock color="#9ca3af" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your admin password"
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
        <Link to="/admin" style={{ textDecoration: "none" }}>
        <button style={buttonStyle}>Sign In as Admin →</button>
        </Link>

        {/* Secure Notice */}
        <div style={secureBoxStyle}>
          <FaShieldAlt />
          This is a secure admin area. All actions are logged and monitored.
        </div>
      </div>
    </div>
  );
}
