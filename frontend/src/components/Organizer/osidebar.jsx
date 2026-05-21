import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaLink,
} from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/organizer" },
  { name: "My Events", icon: <FaCalendarAlt />, path: "/organizer/myevents" },
  { name: "Participants", icon: <FaUsers />, path: "/organizer/participants" },
  { name: "Settings", icon: <FaCog />, path: "/organizer/settings" },
];

const bottomMenuItems = [
  { name: "Profile", icon: <FaUserCircle />, path: "/organizer/profile" },
  { name: "Logout", icon: <FaSignOutAlt />, isLogout: true },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarStyle = {
    height: "100vh",
    width: "18vw",
    minWidth: "200px",
     position: "fixed", 
    backgroundColor: "#1f1f2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxSizing: "border-box",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const logoIconStyle = {
    marginRight: "10px",
    fontSize: "28px",
    background: "linear-gradient(90deg, #7b61ff, #a17cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const logoTextStyle = {
    background: "linear-gradient(90deg, #7b61ff, #a17cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const menuItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    background: isActive
      ? "linear-gradient(90deg, #7b61ff, #a17cff)"
      : "transparent",
    transition: "all 0.3s ease",
  });

  const iconStyle = {
    marginRight: "12px",
    fontSize: "18px",
  };

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/selection");
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <FaLink style={logoIconStyle} />
        <span style={logoTextStyle}>Criss-Cross</span>
      </div>

      {/* Main Menu */}
      <div style={{ flex: 1 }}>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={menuItemStyle(location.pathname === item.path)}
          >
            <div style={iconStyle}>{item.icon}</div>
            {item.name}
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div>
        {bottomMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() =>
              item.isLogout ? handleLogout() : navigate(item.path)
            }
            style={{
              ...menuItemStyle(location.pathname === item.path),
              ...(item.isLogout ? { color: "#ff6b6b" } : {}),
            }}
          >
            <div style={iconStyle}>{item.icon}</div>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}