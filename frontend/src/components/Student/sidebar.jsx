// Sidebar.jsx
import { FaHome, FaCompass, FaTrophy, FaBookmark, FaBell, FaUser, FaCog, FaLink } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const mainMenuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/student/dashboard" },
  { name: "Discover", icon: <FaCompass />, path: "/student/discover" },
  { name: "My Events", icon: <FaTrophy />, path: "/student/myevents" },
  { name: "Bookmarked", icon: <FaBookmark />, path: "/student/bookmarked" },
  { name: "Notifications", icon: <FaBell />, path: "/student/notifications" },
];

const bottomMenuItems = [
  { name: "Profile", icon: <FaUser />, path: "/student/profile" },
  { name: "Settings", icon: <FaCog />, path: "/student/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ active based on current URL
  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: "fixed",
    height: "100vh",
    width: "18vw",
    minWidth: "200px",
    backgroundColor: "#1f1f2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxSizing: "border-box",
    flexShrink: 0,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
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

  const menuContainerStyle = { flex: 1 };
  const bottomMenuContainerStyle = { marginTop: "auto" };

  const menuItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    background: active ? "linear-gradient(90deg, #7b61ff, #a17cff)" : "transparent",
    transition: "all 0.3s ease",
  });

  const iconStyle = { marginRight: "12px", fontSize: "18px" };
  const textStyle = { fontSize: "16px" };

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
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path))}
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
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path))}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div style={textStyle}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}