import React, { useState } from "react";
import "./notification.css";
import initialNotifications from "./notification";

// ✅ import the SAME sidebar used in other student pages
import Sidebar from "../sidebar"; // adjust path if needed

import { HiSparkles } from "react-icons/hi2";
import { FiClock, FiCheckCircle, FiCalendar, FiCheck } from "react-icons/fi";

/* =====================================================
   GROUPING LOGIC (UNCHANGED)
===================================================== */
const groupNotifications = (notifications) => {
  const today = [];
  const thisWeek = [];
  const earlier = [];

  notifications.forEach((n) => {
    const time = n.time.toLowerCase();
    if (time.includes("hour") || time.includes("min")) today.push(n);
    else if (time.includes("day") || time.includes("yesterday")) thisWeek.push(n);
    else earlier.push(n);
  });

  return { today, thisWeek, earlier };
};

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
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
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
          <button className="mark-read-btn" onClick={() => markAsRead(item.id)}>
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
      {/* ✅ push content right (same as bookmarked fix) */}
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