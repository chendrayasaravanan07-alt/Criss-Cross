import React, { useState, useMemo } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Sidebar from "./sidebar";

const optimize = (url) =>
  `${url}?w=400&h=210&fit=crop&q=70&auto=format`;

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

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",           // ✅ outer div height in vh
    background: "#f6f7fb",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  page: {
    flex: 1,
    padding: "2% 3%",             // ✅ padding in %
    overflowX: "hidden",
    marginLeft: "18vw",           // ✅ margin in %/vw
    width: "calc(100% - 18vw)",   // ✅ width in %
    boxSizing: "border-box",
  },
  pageTitle: {
    fontSize: "3.2vh",            // ✅ font-size in vh
    fontWeight: 700,
    margin: "0 0 0.5% 0",        // ✅ margin in %
  },
  pageSubtitle: {
    color: "#6b7280",
    margin: "0 0 2.5% 0",        // ✅ margin in %
  },
  tabs: {
    display: "inline-flex",
    gap: "0.5%",                  // ✅ gap in %
    padding: "0.5%",              // ✅ padding in %
    background: "#fff",
    borderRadius: "2vh",          // ✅ border-radius in vh
    marginBottom: "2.5%",         // ✅ margin in %
  },
  tab: {
    padding: "1.2vh 2.2vh",       // ✅ padding in vh
    borderRadius: "1.5vh",        // ✅ border-radius in vh
    border: "none",
    background: "transparent",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1.4vh",            // ✅ font-size in vh
  },
  tabActive: {
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(30%, 1fr))", // ✅ width in %
    gap: "2%",                    // ✅ gap in %
  },
  card: {
    background: "#fff",
    borderRadius: "2.2vh",        // ✅ border-radius in vh
    overflow: "hidden",
    boxShadow: "0 10px 28px rgba(0,0,0,.08)",
  },
  cardImage: {
    position: "relative",
  },
  img: {
    width: "100%",                // ✅ width in %
    height: "22vh",               // ✅ height in vh
    objectFit: "cover",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: "3%",                    // ✅ top in %
    padding: "0.6vh 1.4vh",       // ✅ padding in vh
    background: "#fff",
    borderRadius: "99vh",         // ✅ border-radius in vh
    fontSize: "1.2vh",            // ✅ font-size in vh
    fontWeight: 600,
  },
  cardBody: {
    padding: "4%",                // ✅ padding in %
  },
  eventTitle: {
    fontSize: "1.6vh",            // ✅ font-size in vh
    fontWeight: 700,
    margin: "0 0 1% 0",          // ✅ margin in %
  },
  organizer: {
    fontSize: "1.3vh",            // ✅ font-size in vh
    color: "#6b7280",
    margin: "0 0 3% 0",          // ✅ margin in %
  },
  meta: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 3% 0",          // ✅ margin in %
    display: "flex",
    flexDirection: "column",
    gap: "1%",                    // ✅ gap in %
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "2%",                    // ✅ gap in %
    fontSize: "1.3vh",            // ✅ font-size in vh
    color: "#374151",
  },
  metaIcon: {
    color: "#9ca3af",
    flexShrink: 0,
  },
  teamBox: {
    background: "#f3f4f6",
    borderRadius: "1.4vh",        // ✅ border-radius in vh
    padding: "3% 4%",             // ✅ padding in %
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.3vh",            // ✅ font-size in vh
    marginBottom: "3%",           // ✅ margin in %
  },
  btn: {
    width: "100%",                // ✅ width in %
    padding: "1.4vh 0",           // ✅ padding in vh
    borderRadius: "1.4vh",        // ✅ border-radius in vh
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2%",                    // ✅ gap in %
    fontSize: "1.4vh",            // ✅ font-size in vh
    color: "#fff",
  },
};

const EventCard = React.memo(({ event }) => {
  const statusKey = event.status.toLowerCase();
  return (
    <div style={styles.card}>
      <div style={styles.cardImage}>
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          style={styles.img}
        />
        <span style={{ ...styles.badge, left: "3%", color: STATUS_COLOR[statusKey] }}>
          {event.status}
        </span>
        <span style={{ ...styles.badge, right: "3%" }}>{event.prize}</span>
      </div>

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

        {filteredEvents.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: "1.4vh" }}>No events in this category.</p>
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