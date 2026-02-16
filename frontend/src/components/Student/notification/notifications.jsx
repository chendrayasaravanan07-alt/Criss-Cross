import React, { useState } from "react";
import "./notification.css";
import initialNotifications from "./notification";

/* ---------------- SIDEBAR ICONS ---------------- */
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

/* ---------------- NOTIFICATION ICONS ---------------- */
import { HiSparkles } from "react-icons/hi2";
import { FiClock, FiCheckCircle, FiCalendar, FiCheck } from "react-icons/fi";

/* =====================================================
   🔥 SIDEBAR (INLINE — NOT SEPARATE COMPONENT)
===================================================== */

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

function Sidebar() {
  const [active, setActive] = useState("Notifications");

  const sidebarStyle = {
    height: "100vh",
    width: "260px",
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
  });

  const iconStyle = {
    marginRight: "12px",
    fontSize: "18px",
  };

  const handleLogout = () => {
    console.log("Logout");
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
            onClick={() => setActive(item.name)}
            style={menuItemStyle(active === item.name)}
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
            onClick={() =>
              item.isLogout ? handleLogout() : setActive(item.name)
            }
            style={{
              ...menuItemStyle(active === item.name),
              ...(item.isLogout ? { color: "#ff6b6b" } : {}),
            }}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   🔥 GROUPING LOGIC (UNCHANGED)
===================================================== */

const groupNotifications = (notifications) => {
  const today = [];
  const thisWeek = [];
  const earlier = [];

  notifications.forEach((n) => {
    const time = n.time.toLowerCase();

    if (time.includes("hour") || time.includes("min")) {
      today.push(n);
    } else if (time.includes("day") || time.includes("yesterday")) {
      thisWeek.push(n);
    } else {
      earlier.push(n);
    }
  });

  return { today, thisWeek, earlier };
};

/* =====================================================
   🔥 MAIN NOTIFICATION PAGE (UNCHANGED — ONLY WRAPPED)
===================================================== */

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  const { today, thisWeek, earlier } = groupNotifications(filtered);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const renderCard = (item) => (
    <div
      key={item.id}
      className={`notification-card ${item.unread ? "unread" : ""}`}
    >
      <div className="card-top">
        <div className={`icon-box ${item.type}`}>
          {item.type === "event" && <HiSparkles />}
          {item.type === "warning" && <FiClock />}
          {item.type === "success" && <FiCheckCircle />}
          {item.type === "calendar" && <FiCalendar />}
        </div>

        <div className="card-center">
          <h3>{item.title}</h3>
          <p>{item.message}</p>

          {item.tag && <span className="tag">{item.tag}</span>}
          <span className="time">{item.time}</span>
        </div>

        {item.unread && (
          <button
            className="mark-read-btn"
            onClick={() => markAsRead(item.id)}
          >
            <FiCheck />
          </button>
        )}
      </div>

      {item.action && (
        <div className="card-action">
          <button>View Event</button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="notification-page">
        <div className="header header-row">
          <div>
            <h1>Notifications</h1>
            <p>Stay updated with your hackathon activities</p>
          </div>

          <button className="mark-all-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        <div className="tabs">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All ({notifications.length})
          </button>

          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread ({notifications.filter((n) => n.unread).length})
          </button>
        </div>

        <div className="notification-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <h2>No notifications</h2>
              <p>You’re all caught up!</p>
            </div>
          ) : (
            <>
              {today.length > 0 && (
                <>
                  <h2 className="section-title">Today</h2>
                  {today.map(renderCard)}
                </>
              )}

              {thisWeek.length > 0 && (
                <>
                  <h2 className="section-title">This Week</h2>
                  {thisWeek.map(renderCard)}
                </>
              )}

              {earlier.length > 0 && (
                <>
                  <h2 className="section-title">Earlier</h2>
                  {earlier.map(renderCard)}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
