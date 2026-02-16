import React, { useState } from "react";
import Sidebar from "./asidebar";
export default function EventApprovals() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Innovation Challenge 2025",
      organizer: "TechCorp Events",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    },
    {
      id: 2,
      title: "Sustainable Cities Hackathon",
      organizer: "Green Future Initiative",
      date: "Feb 1–3, 2025",
      location: "Virtual",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c" ,
    },

    {
      id: 1,
      title: "AI Innovation Challenge 2025",
      organizer: "TechCorp Events",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    },
    {
      id: 2,
      title: "Sustainable Cities Hackathon",
      organizer: "Green Future Initiative",
      date: "Feb 1–3, 2025",
      location: "Virtual",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c" ,
    },
  ]);

  const updateStatus = (id, status) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status } : e
      )
    );
  };

  const pending = events.filter(e => e.status === "pending").length;
  const approved = events.filter(e => e.status === "approved").length;
  const rejected = events.filter(e => e.status === "rejected").length;

  return (
    <div className="container">
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          margin: 0;
        }

        .container {
          display: flex;
          min-height: 100vh;
          max-width: 100vw;
          background: #f4f6fb;
        }


        /* Main */
        .main {
          margin-left: 18vw;   /* SAME width as Sidebar */
          flex: 1;
          padding: 30px;
          min-height: 100vh;
        }

        .subtitle {
          color: #666;
          margin-bottom: 20px;
        }

        /* Stats */
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .stat {
          background: white;
          padding: 20px;
          border-radius: 12px;
        }

        .stat h3 {
          font-size: 26px;
          margin: 0;
        }

        /* Search */
        .search {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          margin-bottom: 25px;
        }

        /* Cards */
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .card {
          max-width: 550px;
          background: white;
          border-radius: 14px;
          overflow: hidden;
        }

        .card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .card-body {
          padding: 15px;
        }

        .card-body h4 {
          margin: 0 0 6px;
        }

        .org {
          color: #555;
          font-size: 14px;
        }

        .info {
          font-size: 13px;
          color: #777;
          margin: 8px 0;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: white;
        }

        .approve {
          background: #22c55e;
        }

        .reject {
          background: #ef4444;
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar/>

      {/* Main */}
      <main className="main">
        <h1>Event Approvals</h1>
        <p className="subtitle">
          Review and approve pending hackathon events
        </p>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <h3>{pending}</h3>
            <p>Pending Approval</p>
          </div>
          <div className="stat">
            <h3>{approved}</h3>
            <p>Approved</p>
          </div>
          <div className="stat">
            <h3>{rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Search */}
        <input
          className="search"
          placeholder="🔍 Search events or organizers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cards */}
        <div className="cards">
          {events
            .filter(e => e.status === "pending" &&
            (
              e.title.toLowerCase().includes(search.toLowerCase()) ||
              e.organizer.toLowerCase().includes(search.toLowerCase())
            ))
            .map(event => (
              <div key={event.id} className="card">
                <img src={event.image} alt="event" />
                <div className="card-body">
                  <h4>{event.title}</h4>
                  <p className="org">{event.organizer}</p>
                  <p className="info">
                    {event.date} • {event.location}
                  </p>

                  <div className="actions">
                    <button
                      className="btn approve"
                      onClick={() =>
                        updateStatus(event.id, "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn reject"
                      onClick={() =>
                        updateStatus(event.id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
