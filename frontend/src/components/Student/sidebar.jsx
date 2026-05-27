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
  { name: "Notifications", icon: <FaBell />,     path: "/student/notifications", badge: 3 },
];

const bottomMenuItems = [
  { name: "Profile",  icon: <FaUser />,       path: "/student/profile" },
  { name: "Settings", icon: <FaCog />,        path: "/student/settings" },
  { name: "Logout",   icon: <FaSignOutAlt />, path: "/selection", isLogout: true },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "18%",
    minWidth: "220px",
    backgroundColor: "#16162a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "3.5% 2% 3%",
    boxSizing: "border-box",
    zIndex: 100,
    overflow: "hidden",
  };

  const glowCircle = {
    position: "absolute",
    top: "-8%",
    right: "-8%",
    width: "45%",
    height: "45%",
    borderRadius: "50%",
    background: "rgba(123,97,255,0.1)",
    pointerEvents: "none",
  };

  const menuItemStyle = (active, isLogout = false) => ({
    display: "flex",
    alignItems: "center",
    gap: "5%",
    padding: "1.8% 3%",
    marginBottom: "0.8%",
    borderRadius: "1.4vh",
    cursor: "pointer",
    background: active
      ? "linear-gradient(135deg, rgba(123,97,255,0.25), rgba(161,124,255,0.15))"
      : "transparent",
    border: active ? "1px solid rgba(123,97,255,0.3)" : "1px solid transparent",
    color: isLogout ? "#ff6b6b" : active ? "#a17cff" : "#8888aa",
    transition: "all 0.2s ease",
    fontSize: "1.85vh",        // ⬆ was 1.5vh
    fontWeight: 500,
    position: "relative",
  });

  const iconStyle = {
    fontSize: "2.2vh",         // ⬆ was 1.9vh
    width: "2.2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const sectionLabel = {
    fontSize: "1.25vh",        // ⬆ was 1vh
    fontWeight: 600,
    color: "#4a4a6a",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "0 3%",
    marginBottom: "1.2%",
  };

  const divider = {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "4% 0",
  };

  const badgeStyle = {
    marginLeft: "auto",
    background: "#7b61ff",
    color: "#fff",
    fontSize: "1.3vh",         // ⬆ was 1.1vh
    fontWeight: 700,
    padding: "0.2% 1.4%",
    borderRadius: "999px",
    lineHeight: 1.6,
  };

  const activeDot = {
    width: "0.8vh",            // ⬆ was 0.7vh
    height: "0.8vh",
    borderRadius: "50%",
    background: "#7b61ff",
    marginLeft: "auto",
    flexShrink: 0,
  };

  return (
    <div style={sidebarStyle}>
      {/* Subtle glow circle */}
      <div style={glowCircle} />

      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8%",
        marginBottom: "10%",
        padding: "0 2%",
      }}>
        <div style={{
          width: "6.5vh",       // ⬆ was 5.5vh
          height: "6.5vh",
          borderRadius: "1.4vh",
          background: "linear-gradient(135deg, #7b61ff, #a17cff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.6vh",    // ⬆ was 2.2vh
          color: "#fff",
          flexShrink: 0,
        }}>
          <FaLink />
        </div>
        <div>
          <div style={{
            fontSize: "2.2vh",  // ⬆ was 1.8vh
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.3px",
          }}>
            Criss-Cross
          </div>
          <div style={{
            fontSize: "1.4vh",  // ⬆ was 1.1vh
            color: "#6b6b8a",
            marginTop: "2%",
          }}>
            Student Portal
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div style={{ flex: 1 }}>
        <div style={sectionLabel}>Menu</div>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path))}
          >
            <span style={iconStyle}>{item.icon}</span>
            <span>{item.name}</span>
            {item.badge && <span style={badgeStyle}>{item.badge}</span>}
            {isActive(item.path) && !item.badge && <span style={activeDot} />}
          </div>
        ))}
      </div>

      <div style={divider} />

      {/* Bottom Menu */}
      <div>
        <div style={sectionLabel}>Account</div>
        {bottomMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={menuItemStyle(isActive(item.path), item.isLogout)}
          >
            <span style={iconStyle}>{item.icon}</span>
            <span>{item.name}</span>
            {isActive(item.path) && <span style={activeDot} />}
          </div>
        ))}
      </div>
    </div>
  );
}