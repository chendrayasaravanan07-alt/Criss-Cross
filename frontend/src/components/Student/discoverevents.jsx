import React, { useState } from "react";

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
    },
    {
      id: 2,
      title: "Hackathon 2026",
      category: "Hackathon",
      date: "April 10, 2026",
      location: "Bangalore",
    },
    {
      id: 3,
      title: "Startup Networking",
      category: "Business",
      date: "March 30, 2026",
      location: "Mumbai",
    },
    {
      id: 4,
      title: "Cultural Fest",
      category: "Cultural",
      date: "May 5, 2026",
      location: "Coimbatore",
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

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      
      {/* 🔵 20% Sidebar */}
      <div style={{ width: "20%", background: "#111827" }}>
        {/* <Sidebar /> */}
      </div>

      {/* 🔵 80% Main Content */}
      <div style={{ width: "80%", padding: "30px" }}>
        <h2>Discover Events</h2>
        <p style={{ color: "gray", marginBottom: "25px" }}>
          Find events based on your interests
        </p>

        {/* 🔹 Search & Filter Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <option value="All">All Interests</option>
            <option value="Technical">Technical</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        {/* 🔹 Events Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ marginBottom: "10px" }}>{event.title}</h3>
                <p style={{ color: "#2563eb", fontWeight: "bold" }}>
                  {event.category}
                </p>
                <p style={{ marginTop: "10px" }}>
                  📅 {event.date}
                </p>
                <p>📍 {event.location}</p>

                <button
                  style={{
                    marginTop: "15px",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscoverEvents;
