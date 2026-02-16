import React from "react";
import { FaCalendarAlt, FaUsers, FaEye, FaArrowUp } from "react-icons/fa";
import Sidebar from "./sidebar";

export default function OrganizerDash() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <h1 style={{ fontSize: "28px", fontWeight: "600" }}>
          Dashboard
        </h1>

        <p style={{ color: "#6b7280", marginTop: "-5px" }}>
          Welcome back! Here's what's happening with your events
        </p>

        {/* Stats */}
        <div style={statsGrid}>
          <StatCard
            icon={<FaCalendarAlt />}
            value="12"
            label="Total Events"
            badge="+2 this month"
            color="#6366F1"
          />

          <StatCard
            icon={<FaUsers />}
            value="2,847"
            label="Total Participants"
            badge="+342 this week"
            color="#22C55E"
          />

          <StatCard
            icon={<FaEye />}
            value="18,549"
            label="Total Views"
            badge="+1,234 today"
            color="#A855F7"
          />
        </div>

        {/* Top Performing Events */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>
            🏆 Top Performing Events
          </h3>

          <EventRow
            rank="#1"
            title="AI Innovation Challenge 2025"
            users="156"
            views="2847"
            percent="92%"
          />

          <EventRow
            rank="#2"
            title="Web3 Summit Hackathon"
            users="342"
            views="4521"
            percent="87%"
          />

          <EventRow
            rank="#3"
            title="Healthcare Innovation Sprint"
            users="128"
            views="1893"
            percent="84%"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ icon, value, label, badge, color }) => (
  <div style={statCard}>
    <div style={statTop}>
      <div style={{ ...iconBox, background: `${color}15`, color }}>
        {icon}
      </div>
      <span style={badgeStyle}>
        <FaArrowUp size={10} /> {badge}
      </span>
    </div>

    <h2 style={{ margin: "10px 0 0" }}>{value}</h2>
    <p style={{ color: "#6b7280", marginTop: "4px" }}>{label}</p>
  </div>
);

const EventRow = ({ rank, title, users, views, percent }) => (
  <div style={eventRow}>
    <div style={rankBadge}>{rank}</div>

    <div style={{ flex: 1 }}>
      <p style={{ margin: 0, fontWeight: 500 }}>{title}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "4px",
          color: "#6b7280",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <FaUsers size={14} /> {users}
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <FaEye size={14} /> {views}
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#16A34A",
          }}
        >
          <FaArrowUp size={12} /> {percent}
        </span>
      </div>
    </div>
  </div>
);

/* ================= STYLES ================= */

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "25px",
};

const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
};

const statTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBox = {
  fontSize: "20px",
  padding: "10px",
  borderRadius: "10px",
};

const badgeStyle = {
  fontSize: "12px",
  background: "#E8F9EE",
  color: "#16A34A",
  padding: "4px 8px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const card = {
  marginTop: "30px",
  background: "#fff",
  padding: "20px",
  borderRadius: "14px",
};

const eventRow = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "14px 0",
  borderBottom: "1px solid #eee",
};

const rankBadge = {
  background: "linear-gradient(135deg, #6366F1, #A855F7)",
  color: "#fff",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
};