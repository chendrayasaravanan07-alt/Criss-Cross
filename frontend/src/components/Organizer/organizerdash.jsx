import React from "react";
import { FaCalendarAlt, FaUsers, FaEye, FaArrowUp } from "react-icons/fa";
import Sidebar from "./osidebar";

export default function OrganizerDash() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{
        marginLeft: "18%",
        padding: "3%",
        background: "#f3f4f6",
        minHeight: "100vh",
        width: "82%",
        boxSizing: "border-box",
      }}>
        {/* Header */}
        <h1 style={{ fontSize: "3.2vh", fontWeight: "600" }}>Dashboard</h1>
        <p style={{ color: "#6b7280", marginTop: "-0.5%" }}>
          Welcome back! Here's what's happening with your events
        </p>

        {/* Stats */}
        <div style={statsGrid}>
          <StatCard icon={<FaCalendarAlt />} value="12"     label="Total Events"        color="#6366F1" />
          <StatCard icon={<FaUsers />}       value="2,847"  label="Total Participants"   color="#22C55E" />
          <StatCard icon={<FaEye />}         value="18,549" label="Total Views"          color="#A855F7" />
        </div>

        {/* Top Performing Events */}
        <div style={card}>
          <h3 style={{ marginBottom: "2%" }}>🏆 Top Performing Events</h3>
          <EventRow rank="#1" title="AI Innovation Challenge 2025"  users="156" views="2847" percent="92%" />
          <EventRow rank="#2" title="Web3 Summit Hackathon"         users="342" views="4521" percent="87%" />
          <EventRow rank="#3" title="Healthcare Innovation Sprint"  users="128" views="1893" percent="84%" />
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, value, label, color }) => (
  <div style={statCard}>
    <div style={statTop}>
      <div style={{ ...iconBox, background: `${color}15`, color }}>{icon}</div>
    </div>
    <h2 style={{ margin: "2% 0 0", fontSize: "3.5vh" }}>{value}</h2>
    <p style={{ color: "#6b7280", marginTop: "1%", fontSize: "1.6vh" }}>{label}</p>
  </div>
);

const EventRow = ({ rank, title, users, views, percent }) => (
  <div style={eventRow}>
    <div style={rankBadge}>{rank}</div>
    <div style={{ flex: 1 }}>
      <p style={{ margin: 0, fontWeight: 500, fontSize: "1.7vh" }}>{title}</p>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "3%",
        marginTop: "0.8%",
        color: "#6b7280",
        fontSize: "1.4vh",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "1%" }}>
          <FaUsers size={14} /> {users}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1%" }}>
          <FaEye size={14} /> {views}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "1%", color: "#16A34A" }}>
          <FaArrowUp size={12} /> {percent}
        </span>
      </div>
    </div>
  </div>
);

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2%",
  marginTop: "2.5%",
};

const statCard = {
  background: "#fff",
  padding: "3%",
  borderRadius: "1.8vh",
  boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
};

const statTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBox = {
  fontSize: "2.2vh",
  padding: "1.2%",
  borderRadius: "1.2vh",
};

const card = {
  marginTop: "3%",
  background: "#fff",
  padding: "3%",
  borderRadius: "1.8vh",
};

const eventRow = {
  display: "flex",
  alignItems: "center",
  gap: "2%",
  padding: "1.8% 0",
  borderBottom: "1px solid #eee",
};

const rankBadge = {
  background: "linear-gradient(135deg, #6366F1, #A855F7)",
  color: "#fff",
  width: "4.5vh",
  height: "4.5vh",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "1.5vh",
  flexShrink: 0,
};