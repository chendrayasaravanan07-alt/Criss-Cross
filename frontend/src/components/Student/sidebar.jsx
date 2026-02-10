// Sidebar.jsx
import { useState } from "react";
import {
  FaHome,
  FaCompass,
  FaTrophy,
  FaBookmark,
  FaBell,
  FaUser,
  FaCog,
  FaLink,
  FaSignOutAlt,
} from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard", icon: <FaHome /> },
  { name: "Discover", icon: <FaCompass /> },
  { name: "My Events", icon: <FaTrophy /> },
  { name: "Bookmarked", icon: <FaBookmark /> },
  { name: "Notifications", icon: <FaBell /> },
];

const bottomMenuItems = [
  { name: "Profile", icon: <FaUser /> },
  { name: "Settings", icon: <FaCog /> },
  { name: "Logout", icon: <FaSignOutAlt />, isLogout: true },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const sidebarStyle = {
    height: "100vh",
    width: "18vw",
    minWidth: "200px",
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

  const menuContainerStyle = {
    flex: 1,
  };

  const bottomMenuContainerStyle = {
    marginTop: "auto",
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

  const logoutStyle = {
    color: "#ff6b6b",
  };

  const iconStyle = {
    marginRight: "12px",
    fontSize: "18px",
  };

  const textStyle = {
    fontSize: "16px",
  };

  const handleLogout = () => {
    console.log("User logged out");
    // clear tokens / localStorage here
    // navigate to login page
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <FaLink style={logoIconStyle} />
        <span style={logoTextStyle}>Criss-Cross</span>
      </div>

      {/* Main Menu */}
      <div style={menuContainerStyle}>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActive(item.name)}
            style={menuItemStyle(active === item.name)}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div style={textStyle}>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div style={bottomMenuContainerStyle}>
        {bottomMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() =>
              item.isLogout ? handleLogout() : setActive(item.name)
            }
            style={{
              ...menuItemStyle(active === item.name),
              ...(item.isLogout ? logoutStyle : {}),
            }}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div style={textStyle}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
