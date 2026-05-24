import React, { useState, useMemo } from "react";
import Sidebar from "./sidebar";

const optimize = (url) => {
  const base = url.split("?")[0];
  return `${base}?w=400&h=210&fit=crop&q=70&auto=format`;
};

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
    image: optimize(
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1581091012184-5c7c9b2b7b2d",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    ),
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
    image: optimize(
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    ),
  },
];

const BookmarkCard = React.memo(({ item }) => (
  <div
    style={s.card}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-0.4vh)";
      e.currentTarget.style.boxShadow = "0 1.5vh 3vh rgba(0,0,0,0.10)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 0.2vh 0.8vh rgba(0,0,0,0.06)";
    }}
  >
    {/* Image */}
    <div style={s.imgWrap}>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        style={s.img}
      />
      <span style={s.prize}>{item.prize}</span>
    </div>

    {/* Body */}
    <div style={s.cardBody}>
      <h3 style={s.cardTitle}>{item.title}</h3>
      <p style={s.org}>{item.org}</p>

      <div style={s.meta}>
        <span>{item.date}</span>
        <span>{item.location}</span>
      </div>

      <span style={s.tag}>{item.tag}</span>

      <div style={s.cardFooter}>
        <span style={s.daysLeft}>{item.daysLeft}</span>
        <button style={s.viewBtn}>View Details</button>
      </div>
    </div>
  </div>
));

export default function Bookmarked() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      bookmarks.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div style={s.layout}>
      <Sidebar />

      <div style={s.page}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.h1}>Bookmarked Events</h1>
            <p style={s.subtitle}>Your saved hackathons for quick access</p>
          </div>
          <input
            type="text"
            placeholder="Search bookmarked events..."
            style={s.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={s.empty}>No bookmarks match your search.</p>
        ) : (
          <div style={s.grid}>
            {filtered.map((item) => (
              <BookmarkCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  layout: {
    display: "flex",
    minHeight: "100vh", // ✅ vh
    background: "#f9fafb",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  page: {
    marginLeft: "18vw", // ✅ vw
    width: "calc(100% - 18vw)", // ✅ %
    padding: "3%", // ✅ %
    boxSizing: "border-box",
    minHeight: "100vh", // ✅ vh
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%", // ✅ %
  },
  h1: {
    fontSize: "2.8vh", // ✅ vh
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1.5vh", // ✅ vh
    marginTop: "0.5%", // ✅ %
    marginBottom: 0,
  },
  searchInput: {
    padding: "1.2vh 1.5vh", // ✅ vh
    borderRadius: "1.2vh", // ✅ vh
    border: "1px solid #e5e7eb",
    fontSize: "1.4vh", // ✅ vh
    width: "22%", // ✅ %
    outline: "none",
    background: "#fff",
  },
  grid: {
    marginTop: "2%", // ✅ %
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(28%, 1fr))", // ✅ %
    gap: "2%", // ✅ %
  },
  card: {
    background: "#fff",
    borderRadius: "1.6vh", // ✅ vh
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0.2vh 0.8vh rgba(0,0,0,0.06)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  imgWrap: {
    position: "relative",
    height: "20vh", // ✅ vh
  },
  img: {
    width: "100%", // ✅ %
    height: "100%", // ✅ %
    objectFit: "cover",
    display: "block",
  },
  prize: {
    position: "absolute",
    top: "4%", // ✅ %
    left: "4%", // ✅ %
    background: "#fff",
    padding: "0.5vh 1vh", // ✅ vh
    borderRadius: "99vh", // ✅ vh
    fontWeight: 600,
    fontSize: "1.2vh", // ✅ vh
  },
  cardBody: {
    padding: "4% 5%", // ✅ %
    display: "flex",
    flexDirection: "column",
    gap: "1.5%", // ✅ %
    flex: 1,
  },
  cardTitle: {
    fontSize: "1.6vh", // ✅ vh
    fontWeight: 700,
    margin: 0,
  },
  org: {
    color: "#6b7280",
    fontSize: "1.3vh", // ✅ vh
    margin: 0,
  },
  meta: {
    fontSize: "1.3vh", // ✅ vh
    color: "#6b7280",
    display: "flex",
    flexDirection: "column",
    gap: "0.5%", // ✅ %
  },
  tag: {
    alignSelf: "flex-start",
    background: "#eef2ff",
    color: "#4f46e5",
    fontSize: "1.2vh", // ✅ vh
    padding: "0.4vh 1vh", // ✅ vh
    borderRadius: "99vh", // ✅ vh
  },
  cardFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "3%", // ✅ %
  },
  daysLeft: {
    color: "#f97316",
    fontSize: "1.3vh", // ✅ vh
  },
  viewBtn: {
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    color: "#fff",
    border: "none",
    borderRadius: "1vh",
    padding: "0.8vh 1.5vh",
    fontSize: "1.3vh",
    cursor: "pointer",
    marginBottom: "3%", // ✅ moves button up
    alignSelf: "flex-end", // ✅ keeps it to the right
  },
  empty: {
    color: "#9ca3af",
    marginTop: "5%", // ✅ %
    textAlign: "center",
    fontSize: "1.6vh", // ✅ vh
  },
};
