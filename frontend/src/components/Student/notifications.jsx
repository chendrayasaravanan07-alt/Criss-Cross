import React, { useState } from "react";
import Sidebar from "../Student/sidebar";  // ✅ uses the real shared sidebar

/* ---------------- NOTIFICATION ICONS ---------------- */
import { HiSparkles } from "react-icons/hi2";
import { FiClock, FiCheckCircle, FiCalendar, FiCheck } from "react-icons/fi";

/* =====================================================
   GROUPING LOGIC
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

/* =====================================================
   SAMPLE DATA (replace with your real data/import)
===================================================== */
const initialNotifications = [
  {
    id: 1, type: "event", unread: true,
    title: "New AI Hackathon Posted!",
    message: "AI & Robotics Summit 2025 - $75,000 prize pool. Matches your interests in AI & Machine Learning.",
    tag: "AI & Robotics Summit 2025", time: "2 hours ago", action: true,
  },
  {
    id: 2, type: "warning", unread: true,
    title: "Registration Deadline Approaching",
    message: "Only 2 days left to register for AI Innovation Challenge 2025 (Bookmarked Event). Don't miss out!",
    tag: "AI Innovation Challenge 2025", time: "5 hours ago", action: true,
  },
  {
    id: 3, type: "success", unread: true,
    title: "Successfully Registered!",
    message: "You have successfully registered for Web3 & Blockchain Hackathon 2025.",
    tag: "Web3 & Blockchain Hackathon", time: "1 day ago", action: false,
  },
  {
    id: 4, type: "calendar", unread: false,
    title: "Event Starting Tomorrow",
    message: "Climate Tech Innovation Challenge starts tomorrow at 9:00 AM. Don't forget to join!",
    tag: "Climate Tech Challenge", time: "2 days ago", action: true,
  },
];

/* =====================================================
   MAIN NOTIFICATION PAGE
===================================================== */
export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "unread"
    ? notifications.filter((n) => n.unread)
    : notifications;

  const { today, thisWeek, earlier } = groupNotifications(filtered);

  const markAsRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const renderCard = (item) => (
    <div key={item.id} style={{
      background: item.unread ? "#f0f4ff" : "#fff",
      border: item.unread ? "1.5px solid #a5b4fc" : "1px solid #e5e7eb",
      borderRadius: 16, padding: "18px 20px", marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        {/* Icon */}
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          background: item.type === "event"   ? "#ede9fe"
                    : item.type === "warning"  ? "#fff7ed"
                    : item.type === "success"  ? "#f0fdf4"
                    : "#eff6ff",
          color:      item.type === "event"   ? "#7c3aed"
                    : item.type === "warning"  ? "#ea580c"
                    : item.type === "success"  ? "#16a34a"
                    : "#2563eb",
        }}>
          {item.type === "event"   && <HiSparkles />}
          {item.type === "warning" && <FiClock />}
          {item.type === "success" && <FiCheckCircle />}
          {item.type === "calendar"&& <FiCalendar />}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#111827" }}>
            {item.title}
          </h3>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
            {item.message}
          </p>
          {item.tag && (
            <span style={{
              fontSize: 12, padding: "3px 10px", borderRadius: 20,
              background: "#ede9fe", color: "#6d28d9", marginRight: 8,
            }}>
              {item.tag}
            </span>
          )}
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{item.time}</span>
        </div>

        {/* Mark read button */}
        {item.unread && (
          <button onClick={() => markAsRead(item.id)} style={{
            background: "none", border: "1px solid #d1d5db", borderRadius: 8,
            padding: "6px 8px", cursor: "pointer", color: "#6b7280", flexShrink: 0,
          }}>
            <FiCheck />
          </button>
        )}
      </div>

      {/* Action button */}
      {item.action && (
        <div style={{ marginTop: 12 }}>
          <button style={{
            width: "100%", padding: "10px 0", borderRadius: 10, border: "none",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14,
          }}>
            View Event
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fc", fontFamily: "Inter, sans-serif" }}>
      <Sidebar />

      <div style={{ marginLeft: "18vw", minWidth: 0, flex: 1, padding: "32px 28px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#111827" }}>Notifications</h1>
            <p style={{ margin: "4px 0 0", color: "#6b7280" }}>Stay updated with your hackathon activities</p>
          </div>
          <button onClick={markAllAsRead} style={{
            background: "none", border: "1px solid #e5e7eb", borderRadius: 10,
            padding: "8px 16px", cursor: "pointer", color: "#6b7280", fontSize: 13,
          }}>
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {["all", "unread"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)} style={{
              padding: "8px 20px", borderRadius: 20, border: "1px solid #e5e7eb",
              cursor: "pointer", fontWeight: 500, fontSize: 14,
              background: filter === tab ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" : "#fff",
              color: filter === tab ? "#fff" : "#374151",
            }}>
              {tab === "all"
                ? `All (${notifications.length})`
                : `Unread (${notifications.filter((n) => n.unread).length})`}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <h2>No notifications</h2>
            <p>You're all caught up!</p>
          </div>
        ) : (
          <>
            {today.length > 0 && (
              <>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 12 }}>Today</h2>
                {today.map(renderCard)}
              </>
            )}
            {thisWeek.length > 0 && (
              <>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 12 }}>This Week</h2>
                {thisWeek.map(renderCard)}
              </>
            )}
            {earlier.length > 0 && (
              <>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 12 }}>Earlier</h2>
                {earlier.map(renderCard)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}