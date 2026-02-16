import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Sidebar from "./sidebar";


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
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
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
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
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
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
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
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
];

export default function MyEvents() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    activeTab === "All"
      ? eventsData
      : eventsData.filter((e) => e.status === activeTab);

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="page">
        <h1 className="page-title">My Events</h1>
        <p className="page-subtitle">
          Manage and track your registered hackathons
        </p>

        <div className="tabs">
          {["All", "Upcoming", "Ongoing", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid">
          {filteredEvents.map((event) => (
            <div className="card" key={event.id}>
              <div className="image">
                <img src={event.image} alt={event.title} />
                <span className={`status ${event.status.toLowerCase()}`}>
                  {event.status}
                </span>
                <span className="price">{event.prize}</span>
              </div>

              <div className="content">
                <h3 className="event-title">{event.title}</h3>
                <p className="org">{event.organizer}</p>

                <div className="meta">
                  <span><FaCalendarAlt /> {event.date}</span>
                  <span><FaMapMarkerAlt /> {event.location}</span>
                  <span><FaUsers /> {event.participants}</span>
                </div>

                <div className="team-box">
                  <span>Team <strong>{event.team}</strong></span>
                  <span>Members <strong>{event.members}</strong></span>
                </div>

                <button className={`btn ${event.status === "Ongoing" ? "join" : "view"}`}>
                  <FaExternalLinkAlt /> {event.status === "Ongoing" ? "Join Now" : "View Details"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* STYLES */}
      <style>{`
        body {
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
          background: #f6f7fb;
        }

        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        .page {
          flex: 1;
          padding: 40px;
          overflow-x: hidden;
          margin-left: 280px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
        }

        .page-subtitle {
          color: #6b7280;
          margin-bottom: 28px;
        }

        .tabs {
          display: inline-flex;
          gap: 6px;
          padding: 6px;
          background: #fff;
          border-radius: 18px;
          margin-bottom: 30px;
        }

        .tab {
          padding: 12px 22px;
          border-radius: 14px;
          border: none;
          background: transparent;
          font-weight: 600;
          cursor: pointer;
        }

        .tab.active {
          background: linear-gradient(135deg,#4f46e5,#9333ea);
          color: white;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(0,0,0,.08);
        }

        .image {
          position: relative;
        }

        .image img {
          width: 100%;
          height: 210px;
          object-fit: cover;
        }

        .status, .price {
          position: absolute;
          top: 12px;
          padding: 6px 14px;
          background: white;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .status { left: 12px; }
        .price { right: 12px; }

        .content {
          padding: 20px;
        }

        .event-title {
          font-size: 16px;
          font-weight: 700;
        }

        .org {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .meta span {
          display: flex;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .team-box {
          background: #f3f4f6;
          border-radius: 14px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          margin: 14px 0;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .btn.view {
          background: linear-gradient(135deg,#4f46e5,#9333ea);
          color: white;
        }

        .btn.join {
          background: #22c55e;
          color: white;
        }
      `}</style>
    </div>
  );
}
