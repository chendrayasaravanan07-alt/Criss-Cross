import { NavLink } from "react-router-dom";
import { FaHome, FaCompass, FaTrophy, FaBookmark, FaBell, FaUser, FaCog, FaLink } from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard", path: "/", icon: <FaHome /> },
  { name: "Discover", path: "/discover", icon: <FaCompass /> },
  { name: "My Events", path: "/myevents", icon: <FaTrophy /> },
  { name: "Bookmarked", path: "/bookmarked", icon: <FaBookmark /> },
  { name: "Notifications", path: "/notifications", icon: <FaBell /> },
];

const bottomMenuItems = [
  { name: "Profile", path: "/profile", icon: <FaUser /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

export default function Sidebar() {
  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <FaLink style={logoIconStyle} />
        <span style={logoTextStyle}>Criss-Cross</span>
      </div>

      {/* Menu */}
      <div style={{ flex: 1 }}>
        {mainMenuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...menuItemStyle,
              background: isActive
                ? "linear-gradient(90deg, #7b61ff, #a17cff)"
                : "transparent",
            })}
          >
            <span style={{ marginRight: 12 }}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Bottom Menu */}
      <div>
        {bottomMenuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...menuItemStyle,
              background: isActive
                ? "linear-gradient(90deg, #7b61ff, #a17cff)"
                : "transparent",
            })}
          >
            <span style={{ marginRight: 12 }}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

/* STYLES */
const sidebarStyle = {
  position: "fixed",       // ✅ FIXED POSITION
  top: 0,
  left: 0,
  height: "100vh",
  width: "18vw",
  minWidth: "200px",
  background: "#1f1f2e",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
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
  color: "#a17cff",
};

const logoTextStyle = {
  color: "#a17cff",
};

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  marginBottom: "10px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#fff",
  transition: "0.3s",
};
