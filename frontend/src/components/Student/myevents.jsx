import React, { useState, useMemo } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Sidebar from "./sidebar";

/* ─── Image Optimizer ────────────────────────────────────── */
const optimize = (url) =>
  `${url}?w=400&h=210&fit=crop&q=70&auto=format`;

/* ─── Static Data (outside component) ───────────────────── */
const eventsData = [
  {
    id: 1,
    title: "AI Innovation Challenge 2025",
    organizer: "TechCorp Global",
    prize: "$50,000",
    date: "Jan 15–17, 2025",
    location: "San Francisco, CA",
    participants: "200+ participants",
    status: "Upcoming",
    team: "Code Crushers",
    members: 4,
    image: optimize("https://images.unsplash.com/photo-1518770660439-4636190af475"),
  },
  {
    id: 2,
    title: "Climate Tech Challenge",
    organizer: "Green Future Foundation",
    prize: "$35,000",
    date: "Dec 15–17, 2024",
    location: "Virtual",
    participants: "300+ participants",
    status: "Ongoing",
    team: "Solo Participation",
    members: 1,
    image: optimize("https://images.unsplash.com/photo-1509395176047-4a66953fd231"),
  },
  {
    id: 3,
    title: "Web3 Summit Hackathon",
    organizer: "Blockchain Foundation",
    prize: "$30,000",
    date: "Jan 22–24, 2025",
    location: "Virtual",
    participants: "500+ participants",
    status: "Upcoming",
    team: "Blockchain Builders",
    members: 3,
    image: optimize("https://images.unsplash.com/photo-1515879218367-8466d910aaa4"),
  },
  {
    id: 4,
    title: "Smart City Hackathon",
    organizer: "GovTech India",
    prize: "$20,000",
    date: "Nov 10–12, 2024",
    location: "Bengaluru, India",
    participants: "400+ participants",
    status: "Completed",
    team: "Urban Coders",
    members: 5,
    image: optimize("https://images.unsplash.com/photo-1504384308090-c894fdcc538d"),
  },
];

const TABS = ["All", "Upcoming", "Ongoing", "Completed"];

const STATUS_COLOR = {
  upcoming:  "#4f46e5",
  ongoing:   "#16a34a",
  completed: "#6b7280",
};

/* ─── Styles (defined once outside, never re-created) ────── */
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f6f7fb",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  page: {
    flex: 1,
    padding: "40px",
    overflowX: "hidden",
    marginLeft: "280px",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 700,
    margin: "0 0 4px",
  },
  pageSubtitle: {
    color: "#6b7280",
    margin: "0 0 28px",
  },
  tabs: {
    display: "inline-flex",
    gap: 6,
    padding: 6,
    background: "#fff",
    borderRadius: 18,
    marginBottom: 30,
  },
  tab: {
    padding: "12px 22px",
    borderRadius: 14,
    border: "none",
    background: "transparent",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  },
  tabActive: {
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px,1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 10px 28px rgba(0,0,0,.08)",
  },
  cardImage: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: 210,
    objectFit: "cover",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: 12,
    padding: "6px 14px",
    background: "#fff",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  cardBody: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 4px",
  },
  organizer: {
    fontSize: 13,
    color: "#6b7280",
    margin: "0 0 12px",
  },
  meta: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 14px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#374151",
  },
  metaIcon: {
    color: "#9ca3af",
    flexShrink: 0,
  },
  teamBox: {
    background: "#f3f4f6",
    borderRadius: 14,
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    marginBottom: 14,
  },
  btn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#fff",
  },
};

/* ─── EventCard (memoized) ───────────────────────────────── */
const EventCard = React.memo(({ event }) => {
  const statusKey = event.status.toLowerCase();
  return (
    <div style={styles.card}>
      {/* Image */}
      <div style={styles.cardImage}>
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          width="400"
          height="210"
          style={styles.img}
        />
        <span style={{ ...styles.badge, left: 12, color: STATUS_COLOR[statusKey] }}>
          {event.status}
        </span>
        <span style={{ ...styles.badge, right: 12 }}>{event.prize}</span>
      </div>

      {/* Body */}
      <div style={styles.cardBody}>
        <h3 style={styles.eventTitle}>{event.title}</h3>
        <p style={styles.organizer}>{event.organizer}</p>

        <ul style={styles.meta}>
          <li style={styles.metaItem}>
            <FaCalendarAlt style={styles.metaIcon} />
            {event.date}
          </li>
          <li style={styles.metaItem}>
            <FaMapMarkerAlt style={styles.metaIcon} />
            {event.location}
          </li>
          <li style={styles.metaItem}>
            <FaUsers style={styles.metaIcon} />
            {event.participants}
          </li>
        </ul>

        <div style={styles.teamBox}>
          <span>Team <strong>{event.team}</strong></span>
          <span>Members <strong>{event.members}</strong></span>
        </div>

        <button
          style={{
            ...styles.btn,
            background:
              event.status === "Ongoing"
                ? "#22c55e"
                : "linear-gradient(135deg,#4f46e5,#9333ea)",
          }}
        >
          <FaExternalLinkAlt />
          {event.status === "Ongoing" ? "Join Now" : "View Details"}
        </button>
      </div>
    </div>
  );
});

/* ─── Main Page ──────────────────────────────────────────── */
export default function MyEvents() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents = useMemo(
    () =>
      activeTab === "All"
        ? eventsData
        : eventsData.filter((e) => e.status === activeTab),
    [activeTab]
  );

  return (
    <div style={styles.layout}>
      <Sidebar />

      <main style={styles.page}>
        <h1 style={styles.pageTitle}>My Events</h1>
        <p style={styles.pageSubtitle}>
          Manage and track your registered hackathons
        </p>

        {/* Tabs */}
        <div style={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : {}),
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredEvents.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No events in this category.</p>
        ) : (
          <div style={styles.grid}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}