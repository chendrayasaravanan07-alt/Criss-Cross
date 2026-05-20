import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome, FaCompass, FaTrophy, FaBookmark,
  FaBell, FaUser, FaCog, FaLink, FaSignOutAlt
} from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard",     icon: <FaHome />,     path: "/student/dashboard" },
  { name: "Discover",      icon: <FaCompass />,  path: "/student/discover" },
  { name: "My Events",     icon: <FaTrophy />,   path: "/student/myevents" },
  { name: "Bookmarked",    icon: <FaBookmark />, path: "/student/bookmarked" },
  { name: "Notifications", icon: <FaBell />,     path: "/student/notifications" },
];

const bottomMenuItems = [
  { name: "Profile",  icon: <FaUser />,       path: "/student/profile" },
  { name: "Settings", icon: <FaCog />,        path: "/student/settings" },
  { name: "Logout",   icon: <FaSignOutAlt />, path: "/",  isLogout: true },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: "fixed",
    top: 0, left: 0,
    height: "100vh",
    width: "18vw",
    minWidth: "200px",
    backgroundColor: "#1f1f2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 100,
  };

  const menuItemStyle = (active, isLogout = false) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    background: active ? "linear-gradient(90deg, #7b61ff, #a17cff)" : "transparent",
    color: isLogout ? "#ff6b6b" : "#fff",
    transition: "background 0.2s ease",
  });

  const iconStyle = { marginRight: "12px", fontSize: "18px" };

  const logoTextStyle = {
    background: "linear-gradient(90deg, #7b61ff, #a17cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div style={sidebarStyle}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "40px", fontSize: "24px", fontWeight: "bold" }}>
        <FaLink style={{ ...logoTextStyle, marginRight: "10px", fontSize: "28px" }} />
        <span style={logoTextStyle}>Criss-Cross</span>
      </div>

      {/* Main Menu */}
      <div style={{ flex: 1 }}>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path))}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Bottom Menu */}
      <div>
        {bottomMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path), item.isLogout)}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>

    </div>
  );
}