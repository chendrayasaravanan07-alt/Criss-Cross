import React, { useState } from "react";
import {
  FaThLarge,
  FaUsers,
  FaCheckCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard", icon: <FaThLarge /> },
  { name: "User Management", icon: <FaUsers /> },
  { name: "Event Approvals", icon: <FaCheckCircle /> },
  { name: "Settings", icon: <FaCog /> },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const sidebarStyle = {
    height: "100vh",
    width: "18vw",
    minWidth: "200px",
    backgroundColor: "#1b1c2b", // image background
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
<<<<<<< HEAD
    boxSizing: "border-box",
    position: "fixed",
=======
    position: "fixed",
    boxSizing: "border-box",
>>>>>>> be8858ffda51e2cf67823161203aa2df557aa349
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
  };

  const logoIconStyle = {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    backgroundColor: "#2a2b3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: "#ffffff",
  };

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "700",
    color: "#8f7bff", // brand purple
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#cfcfe6",
  };

  const menuItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
    marginBottom: "14px",
    borderRadius: "14px",
    cursor: "pointer",
    backgroundColor: isActive ? "#9b7bff" : "transparent", // active purple pill
    color: "#ffffff",
    fontSize: "16px",
    transition: "0.25s",
  });

  const bottomSection = {
    marginTop: "auto",
  };

  const userCard = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  };

  const avatarStyle = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "#2a2b3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  };

  const logoutBtn = {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    backgroundColor: "transparent",
    border: "none",
    color: "#ff5c5c", // logout red
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <div style={logoIconStyle}>
          <FaShieldAlt />
        </div>
        <div>
          <div style={titleStyle}>Criss-Cross</div>
          <div style={subtitleStyle}>Admin Portal</div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ flex: 1 }}>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            style={menuItemStyle(active === item.name)}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={bottomSection}>
        <div style={userCard}>
          <div style={avatarStyle}>
            <FaUserCircle size={26} />
          </div>
          <div>
            <div style={{ fontWeight: "600" }}>Admin User</div>
            <div style={{ fontSize: "13px", color: "#cfcfe6" }}>
              System Administrator
            </div>
          </div>
        </div>

        <button style={logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}