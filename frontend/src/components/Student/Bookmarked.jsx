import React, { useState, useMemo } from "react";
import Sidebar from "./sidebar";

/* ─── Image Optimizer ────────────────────────────────────── */
const optimize = (url) => {
  // strip any existing query string then add our params
  const base = url.split("?")[0];
  return `${base}?w=400&h=210&fit=crop&q=70&auto=format`;
};

/* ─── Static Data (outside component) ───────────────────── */
const bookmarks = [
  {
    id: 1,
    title: "Fintech Revolution 2025",
    org: "Financial Innovation Lab",
    date: "Jan 28–30, 2025",
    location: "London, UK",
    tag: "Finance",
    prize: "$60,000",
    daysLeft: "18 days left",
    image: optimize("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"),
  },
  {
    id: 2,
    title: "AR/VR Experience Jam",
    org: "Metaverse Collective",
    date: "Feb 28–Mar 2, 2025",
    location: "Virtual",
    tag: "AR/VR",
    prize: "$28,000",
    daysLeft: "41 days left",
    image: optimize("https://images.unsplash.com/photo-1593508512255-86ab42a8e620"),
  },
  {
    id: 3,
    title: "Data Science Marathon",
    org: "Analytics Pro Network",
    date: "Mar 22–24, 2025",
    location: "Chicago, IL",
    tag: "Data Science",
    prize: "$38,000",
    daysLeft: "64 days left",
    image: optimize("https://images.unsplash.com/photo-1551288049-bebda4e38f71"),
  },
  {
    id: 4,
    title: "Social Impact Hackathon",
    org: "Global Good Foundation",
    date: "Jan 25–27, 2025",
    location: "Virtual",
    tag: "Social Impact",
    prize: "$25,000",
    daysLeft: "15 days left",
    image: optimize("https://images.unsplash.com/photo-1509099836639-18ba1795216d"),
  },
  {
    id: 5,
    title: "Music Tech Innovation",
    org: "Audio Engineers Society",
    date: "Apr 12–14, 2025",
    location: "Nashville, TN",
    tag: "Music & Audio",
    prize: "$18,000",
    daysLeft: "85 days left",
    image: optimize("https://images.unsplash.com/photo-1511379938547-c1f69419868d"),
  },
  {
    id: 6,
    title: "Robotics Competition 2025",
    org: "Robotics International",
    date: "May 1–3, 2025",
    location: "Tokyo, Japan",
    tag: "Robotics",
    prize: "$65,000",
    daysLeft: "104 days left",
    image: optimize("https://images.unsplash.com/photo-1581091012184-5c7c9b2b7b2d"),
  },
  {
    id: 7,
    title: "Food Tech Summit",
    org: "Culinary Innovation Lab",
    date: "Feb 8–10, 2025",
    location: "San Diego, CA",
    tag: "Food Tech",
    prize: "$22,000",
    daysLeft: "21 days left",
    image: optimize("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"),
  },
  {
    id: 8,
    title: "Space Tech Challenge",
    org: "Aerospace Innovation Hub",
    date: "Apr 20–22, 2025",
    location: "Virtual",
    tag: "Space & Aerospace",
    prize: "$80,000",
    daysLeft: "93 days left",
    image: optimize("https://images.unsplash.com/photo-1451187580459-43490279c0fa"),
  },
  {
    id: 9,
    title: "Green Energy Innovators",
    org: "Renewable Energy Alliance",
    date: "Mar 28–30, 2025",
    location: "Berlin, Germany",
    tag: "Renewable Energy",
    prize: "$48,000",
    daysLeft: "70 days left",
    image: optimize("https://images.unsplash.com/photo-1509395176047-4a66953fd231"),
  },
];

/* ─── Styles (defined once, never re-created) ────────────── */
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9fafb",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  page: {
    marginLeft: "18vw",
    padding: "2rem",
    width: "calc(100% - 18vw)",
    boxSizing: "border-box",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  h1: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#6b7280",
    marginTop: "0.4rem",
    marginBottom: 0,
  },
  searchInput: {
    padding: "0.6rem 1rem",
    borderRadius: "0.6rem",
    border: "1px solid #e5e7eb",
    fontSize: "0.9rem",
    width: 260,
    outline: "none",
  },
  grid: {
    marginTop: "2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: "1rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardImageWrap: {
    position: "relative",
    height: "12rem",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  prize: {
    position: "absolute",
    top: "0.8rem",
    left: "0.8rem",
    background: "#fff",
    padding: "0.3rem 0.7rem",
    borderRadius: "1rem",
    fontWeight: 600,
    fontSize: "0.85rem",
  },
  cardBody: {
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    flex: 1,
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: 0,
  },
  org: {
    color: "#6b7280",
    fontSize: "0.9rem",
    margin: 0,
  },
  meta: {
    fontSize: "0.85rem",
    color: "#6b7280",
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  },
  tag: {
    alignSelf: "flex-start",
    background: "#eef2ff",
    color: "#4f46e5",
    fontSize: "0.75rem",
    padding: "0.3rem 0.7rem",
    borderRadius: "1rem",
  },
  cardFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  daysLeft: {
    color: "#f97316",
    fontSize: "0.85rem",
  },
  viewBtn: {
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    color: "#fff",
    border: "none",
    borderRadius: "0.7rem",
    padding: "0.6rem 1.2rem",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  empty: {
    color: "#9ca3af",
    marginTop: "3rem",
    textAlign: "center",
    fontSize: "1rem",
  },
};

/* ─── BookmarkCard (memoized) ────────────────────────────── */
const BookmarkCard = React.memo(({ item }) => (
  <div
    style={styles.card}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 1.5rem 3rem rgba(0,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
    }}
  >
    {/* Image */}
    <div style={styles.cardImageWrap}>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        width="400"
        height="192"
        style={styles.img}
      />
      <span style={styles.prize}>{item.prize}</span>
    </div>

    {/* Body */}
    <div style={styles.cardBody}>
      <h3 style={styles.cardTitle}>{item.title}</h3>
      <p style={styles.org}>{item.org}</p>

      <div style={styles.meta}>
        <span>{item.date}</span>
        <span>{item.location}</span>
      </div>

      <span style={styles.tag}>{item.tag}</span>

      <div style={styles.cardFooter}>
        <span style={styles.daysLeft}>{item.daysLeft}</span>
        <button style={styles.viewBtn}>View Details</button>
      </div>
    </div>
  </div>
));

/* ─── Main Page ──────────────────────────────────────────── */
export default function Bookmarked() {
  const [search, setSearch] = useState("");

  /* useMemo — only recomputes when search changes */
  const filtered = useMemo(
    () =>
      bookmarks.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.h1}>Bookmarked Events</h1>
            <p style={styles.subtitle}>Your saved hackathons for quick access</p>
          </div>
          <input
            type="text"
            placeholder="Search bookmarked events..."
            style={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={styles.empty}>No bookmarks match your search.</p>
        ) : (
          <div style={styles.grid}>
            {filtered.map((item) => (
              <BookmarkCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}