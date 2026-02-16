import React, { useState } from "react";
import {
  FaHome,
  FaCompass,
  FaTrophy,
  FaBookmark,
  FaBell,
  FaUser,
  FaCog,
  FaLink,
  FaSignOutAlt,
} from "react-icons/fa";

/* ---------------- SIDEBAR DATA ---------------- */
const mainMenuItems = [
  { name: "Dashboard", icon: <FaHome /> },
  { name: "Discover", icon: <FaCompass /> },
  { name: "My Events", icon: <FaTrophy /> },
  { name: "Bookmarked", icon: <FaBookmark /> },
  { name: "Notifications", icon: <FaBell /> },
];

const bottomMenuItems = [
  { name: "Profile", icon: <FaUser /> },
  { name: "Settings", icon: <FaCog /> },
  { name: "Logout", icon: <FaSignOutAlt />, isLogout: true },
];

/* ---------------- MOCK BOOKMARK DATA ---------------- */
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
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
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
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
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
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
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
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
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
    image:
      "https://images.unsplash.com/photo-1581091012184-5c7c9b2b7b2d",
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
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ---------------- SIDEBAR COMPONENT ---------------- */
function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const sidebarStyle = {
     minHeight: "100vh",   // ⭐ Instead of height
  width: "18vw",
  minWidth: "200px",
  backgroundColor: "#1f1f2e",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "2%",
  boxSizing: "border-box",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "12%",
    fontSize: "140%",
    fontWeight: "bold",
  };

  const logoIconStyle = {
    marginRight: "6%",
    fontSize: "160%",
    background: "linear-gradient(90deg, #7b61ff, #a17cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const logoTextStyle = {
    background: "linear-gradient(90deg, #7b61ff, #a17cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const menuItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "4% 6%",
    marginBottom: "3%",
    borderRadius: "999px",
    cursor: "pointer",
    background: isActive
      ? "linear-gradient(90deg, #7b61ff, #a17cff)"
      : "rgba(255,255,255,0.04)",
    transition: "all 0.25s ease",
  });

  const iconStyle = {
    marginRight: "8%",
    fontSize: "110%",
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <FaLink style={logoIconStyle} />
        <span style={logoTextStyle}>Criss-Cross</span>
      </div>

      <div style={{ flex: 1 }}>
        {mainMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActive(item.name)}
            style={menuItemStyle(active === item.name)}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>

      <div>
        {bottomMenuItems.map((item) => (
          <div
            key={item.name}
            onClick={() =>
              item.isLogout ? handleLogout() : setActive(item.name)
            }
            style={{
              ...menuItemStyle(active === item.name),
              ...(item.isLogout ? { color: "#ff6b6b" } : {}),
            }}
          >
            <div style={iconStyle}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MAIN BOOKMARK PAGE ---------------- */
export default function Bookmarked() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="bookmark-page">
        <style>{css}</style>

        <div className="bookmark-header">
          <div>
            <h1>Bookmarked Events</h1>
            <p>Your saved hackathons for quick access</p>
          </div>

          <input
            type="text"
            placeholder="Search bookmarked events..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bookmark-grid">
          {bookmarks.map((item) => (
            <div className="bookmark-card" key={item.id}>
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <span className="prize">{item.prize}</span>
              </div>

              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="org">{item.org}</p>

                <div className="meta">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </div>

                <span className="tag">{item.tag}</span>

                <div className="card-footer">
                  <span className="time">{item.daysLeft}</span>
                  <button className="view-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- CSS (UNCHANGED) ---------------- */
const css = `
.bookmark-page {
  margin-left: 0;
  padding: 2rem;
  background: #f9fafb;
  min-height: 100vh;
  width: 100%;
}

.bookmark-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.bookmark-header p {
  color: #6b7280;
  margin-top: 0.4rem;
}

.bookmark-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 2rem;
}

.bookmark-card {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bookmark-card:hover {
  transform: translateY(-0.4rem);
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.08);
}

.card-image {
  position: relative;
  height: 12rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prize {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  background: #ffffff;
  padding: 0.3rem 0.7rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.85rem;
}

.card-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-body h3 {
  font-size: 1.1rem;
  font-weight: 700;
}

.org {
  color: #6b7280;
  font-size: 0.9rem;
}

.meta {
  font-size: 0.85rem;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tag {
  align-self: flex-start;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: 1rem;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  color: #f97316;
  font-size: 0.85rem;
}

.bookmark-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
  width: 260px;
  outline: none;
}

.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
}

.view-btn {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: #ffffff;
  border: none;
  border-radius: 0.7rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.view-btn:hover {
  opacity: 0.9;
}
`;
