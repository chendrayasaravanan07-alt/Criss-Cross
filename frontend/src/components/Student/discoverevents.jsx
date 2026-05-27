import React, { useState } from "react";
import Sidebar from "./sidebar";

function DiscoverEvents() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const events = [
    {
      id: 1,
      title: "AI & ML Workshop",
      category: "Technical",
      date: "March 25, 2026",
      location: "Chennai",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=210&fit=crop",
    },
    {
      id: 2,
      title: "Hackathon 2026",
      category: "Hackathon",
      date: "April 10, 2026",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=210&fit=crop",
    },
    {
      id: 3,
      title: "Startup Networking",
      category: "Business",
      date: "March 30, 2026",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=210&fit=crop",
    },
    {
      id: 4,
      title: "Cultural Fest",
      category: "Cultural",
      date: "May 5, 2026",
      location: "Coimbatore",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=210&fit=crop",
    },
    {
      id: 5,
      title: "Web3 BuildFest",
      category: "Hackathon",
      date: "June 1, 2026",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=210&fit=crop",
    },
    {
      id: 6,
      title: "Data Science Sprint",
      category: "Technical",
      date: "May 20, 2026",
      location: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=210&fit=crop",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    Technical: { bg: "#eff6ff", color: "#2563eb" },
    Hackathon: { bg: "#f5f3ff", color: "#7c3aed" },
    Business: { bg: "#f0fdf4", color: "#16a34a" },
    Cultural: { bg: "#fff7ed", color: "#ea580c" },
  };

  return (
    <div style={s.layout}>
      <Sidebar />

      <div style={s.page}>
        {/* Header */}
        <h2 style={s.pageTitle}>Discover Events</h2>
        <p style={s.pageSubtitle}>Find events based on your interests</p>

        {/* Search & Filter */}
        <div style={s.filterRow}>
          <input
            type="text"
            placeholder="🔍  Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={s.select}
          >
            <option value="All">All Interests</option>
            <option value="Technical">Technical</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div style={s.grid}>
            {filteredEvents.map((event) => {
              const colors = categoryColors[event.category] || {
                bg: "#f3f4f6",
                color: "#374151",
              };
              return (
                <div
                  key={event.id}
                  style={s.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-0.4vh)";
                    e.currentTarget.style.boxShadow =
                      "0 1.5vh 3vh rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0.4vh 1vh rgba(0,0,0,0.05)";
                  }}
                >
                  {/* Image */}
                  <div style={s.imgWrap}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={s.img}
                      loading="lazy"
                    />
                    <span
                      style={{
                        ...s.categoryBadge,
                        background: colors.bg,
                        color: colors.color,
                      }}
                    >
                      {event.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={s.cardBody}>
                    <h3 style={s.cardTitle}>{event.title}</h3>
                    <p style={s.metaText}>📅 {event.date}</p>
                    <p style={s.metaText}>📍 {event.location}</p>

                    <button style={s.btn}>View Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={s.empty}>No events found.</p>
        )}
      </div>
    </div>
  );
}

const s = {
  layout: {
    display: "flex",
    minHeight: "100vh", // ✅ vh
    background: "#f8fafc",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  page: {
    marginLeft: "18vw", // ✅ vw
    width: "calc(100% - 18vw)", // ✅ %
    padding: "3%", // ✅ %
    boxSizing: "border-box",
  },
  pageTitle: {
    fontSize: "2.8vh", // ✅ vh
    fontWeight: 700,
    margin: "0 0 0.5% 0", // ✅ %
    color: "#111827",
  },
  pageSubtitle: {
    color: "#6b7280",
    fontSize: "1.5vh", // ✅ vh
    margin: "0 0 2.5% 0", // ✅ %
  },
  filterRow: {
    display: "flex",
    gap: "2%", // ✅ %
    marginBottom: "3%", // ✅ %
  },
  searchInput: {
    flex: 1,
    padding: "1.2vh 1.5vh", // ✅ vh
    borderRadius: "1.2vh", // ✅ vh
    border: "1px solid #e5e7eb",
    fontSize: "1.4vh", // ✅ vh
    outline: "none",
    background: "#fff",
  },
  select: {
    padding: "1.2vh 1.5vh", // ✅ vh
    borderRadius: "1.2vh", // ✅ vh
    border: "1px solid #e5e7eb",
    fontSize: "1.4vh", // ✅ vh
    background: "#fff",
    cursor: "pointer",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(28%, 1fr))", // ✅ %
    gap: "2%", // ✅ %
  },
  card: {
    background: "#fff",
    borderRadius: "1.6vh", // ✅ vh
    overflow: "hidden",
    boxShadow: "0 0.4vh 1vh rgba(0,0,0,0.05)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  imgWrap: {
    position: "relative",
    height: "20vh", // ✅ vh
    overflow: "hidden",
  },
  img: {
    width: "100%", // ✅ %
    height: "100%", // ✅ %
    objectFit: "cover",
    display: "block",
  },
  categoryBadge: {
    position: "absolute",
    top: "4%", // ✅ %
    left: "4%", // ✅ %
    padding: "0.5vh 1.2vh", // ✅ vh
    borderRadius: "99vh", // ✅ vh
    fontSize: "1.2vh", // ✅ vh
    fontWeight: 600,
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
    margin: "0 0 1% 0", // ✅ %
    color: "#111827",
  },
  metaText: {
    fontSize: "1.3vh", // ✅ vh
    color: "#6b7280",
    margin: "0.5% 0", // ✅ %
  },
  btn: {
    marginTop: "4%", // ✅ %
    padding: "1.2vh 0", // ✅ vh
    width: "100%", // ✅ %
    borderRadius: "1vh", // ✅ vh
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    color: "#fff",
    fontSize: "1.4vh", // ✅ vh
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: {
    color: "#9ca3af",
    marginTop: "5%", // ✅ %
    textAlign: "center",
    fontSize: "1.6vh", // ✅ vh
  },
};

export default DiscoverEvents;
