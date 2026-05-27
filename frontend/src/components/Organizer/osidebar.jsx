import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome, FaCalendarAlt, FaUsers,
  FaUserCircle, FaCog, FaSignOutAlt, FaLink,
} from "react-icons/fa";

const mainMenuItems = [
  { name: "Dashboard",    icon: <FaHome />,        path: "/organizer" },
  { name: "My Events",    icon: <FaCalendarAlt />, path: "/organizer/myevents" },
  { name: "Participants", icon: <FaUsers />,        path: "/organizer/participants" },
  { name: "Settings",     icon: <FaCog />,          path: "/organizer/settings" },
];

const bottomMenuItems = [
  { name: "Profile", icon: <FaUserCircle />, path: "/organizer/profile" },
  { name: "Logout",  icon: <FaSignOutAlt />, isLogout: true },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",            // outer div height in vh ✅
    width: "18%",               // width in % ✅
    minWidth: "240px",          // enough so text never wraps
    backgroundColor: "#16162a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "3.5% 2% 3%",     // padding in % ✅
    boxSizing: "border-box",
    zIndex: 100,
    overflow: "hidden",
    fontFamily: "'Nunito', sans-serif",
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
    gap: "5%",                  // gap in % ✅
    padding: "1.8% 3%",        // padding in % ✅
    marginBottom: "0.8%",       // margin in % ✅
    borderRadius: "1.4vh",      // borderRadius in vh ✅
    cursor: "pointer",
    background: active
      ? "linear-gradient(135deg, rgba(123,97,255,0.25), rgba(161,124,255,0.15))"
      : "transparent",
    border: active ? "1px solid rgba(123,97,255,0.3)" : "1px solid transparent",
    color: isLogout ? "#ff6b6b" : active ? "#a17cff" : "#8888aa",
    transition: "all 0.2s ease",
    fontSize: "1.85vh",         // fontSize in vh ✅
    fontWeight: 500,
    position: "relative",
    whiteSpace: "nowrap",       // ← prevents text wrapping
    overflow: "hidden",
  });

  const iconStyle = {
    fontSize: "2.2vh",          // fontSize in vh ✅
    width: "2.2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,              // ← icon never shrinks
  };

  const sectionLabel = {
    fontSize: "1.25vh",         // fontSize in vh ✅
    fontWeight: 600,
    color: "#4a4a6a",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "0 3%",            // padding in % ✅
    marginBottom: "1.2%",       // margin in % ✅
  };

  const divider = {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "4% 0",             // margin in % ✅
  };

  const activeDot = {
    width: "0.8vh",             // vh ✅
    height: "0.8vh",            // vh ✅
    borderRadius: "50%",
    background: "#7b61ff",
    marginLeft: "auto",
    flexShrink: 0,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div style={sidebarStyle}>
        {/* Subtle glow circle */}
        <div style={glowCircle} />

        {/* ── Logo ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8%",              // gap in % ✅
          marginBottom: "10%",    // margin in % ✅
          padding: "0 2%",        // padding in % ✅
        }}>
          <div style={{
            width: "6.5vh",       // vh ✅
            height: "6.5vh",      // vh ✅
            borderRadius: "1.4vh",// borderRadius in vh ✅
            background: "linear-gradient(135deg, #7b61ff, #a17cff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.6vh",    // fontSize in vh ✅
            color: "#fff",
            flexShrink: 0,        // ← icon box never shrinks
            boxShadow: "0 0.4vh 1.5vh rgba(123,97,255,0.45)",
          }}>
            <FaLink />
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontSize: "2.2vh",  // fontSize in vh ✅
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
              whiteSpace: "nowrap", // ← "Criss-Cross" stays on one line
            }}>
              Criss-Cross
            </div>
            <div style={{
              fontSize: "1.4vh",  // fontSize in vh ✅
              color: "#6b6b8a",
              marginTop: "2%",    // margin in % ✅
              whiteSpace: "nowrap",
            }}>
              Organizer Portal
            </div>
          </div>
        </div>

        {/* ── Main Menu ── */}
        <div style={{ flex: 1 }}>
          <div style={sectionLabel}>Menu</div>
          {mainMenuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                style={menuItemStyle(active)}
              >
                <span style={iconStyle}>{item.icon}</span>
                <span>{item.name}</span>
                {active && <span style={activeDot} />}
              </div>
            );
          })}
        </div>

        <div style={divider} />

        {/* ── Account ── */}
        <div>
          <div style={sectionLabel}>Account</div>
          {bottomMenuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <div
                key={item.name}
                onClick={() => item.isLogout ? navigate("/selection") : navigate(item.path)}
                style={menuItemStyle(active, item.isLogout)}
              >
                <span style={iconStyle}>{item.icon}</span>
                <span>{item.name}</span>
                {active && <span style={activeDot} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}