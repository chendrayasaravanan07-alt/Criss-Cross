import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./osidebar";
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

export default function OrganizerEvents() {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Innovation Challenge 2025",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      registrations: 156,
      capacity: 200,
      image:
        "https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Web3 Summit Hackathon",
      date: "Jan 22–24, 2025",
      location: "Virtual",
      registrations: 342,
      capacity: 500,
      image:
        "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Healthcare Innovation Sprint",
      date: "Mar 10–12, 2025",
      location: "Boston, MA",
      registrations: 98,
      capacity: 150,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Climate Tech Challenge",
      date: "Apr 5–7, 2025",
      location: "Virtual",
      registrations: 210,
      capacity: 400,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    mode: "In-Person",
    capacity: "",
    prizePool: "",
    category: "",
    image: "",
    registrationLink: "",
  });

  const handleDelete = (id) => setEvents(events.filter((e) => e.id !== id));
  const handleEditOpen = (event) => setSelectedEvent({ ...event });
  const handleEditFieldChange = (field, value) =>
    setSelectedEvent((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    setEvents((prev) =>
      prev.map((e) => (e.id === selectedEvent.id ? selectedEvent : e)),
    );
    setSelectedEvent(null);
  };

  const getEventEndDate = (dateRange) => {
    const [month, days, year] = dateRange.replace(",", "").split(" ");
    const endDay = days.includes("–") ? days.split("–")[1] : days;
    return new Date(`${month} ${endDay}, ${year}`);
  };

  const getEventStatus = (event) =>
    getEventEndDate(event.date) < new Date() ? "completed" : "upcoming";

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const status = getEventStatus(event);
    if (activeTab === "upcoming") return status === "upcoming" && matchesSearch;
    if (activeTab === "completed")
      return status === "completed" && matchesSearch;
    return matchesSearch;
  });

  const upcomingCount = events.filter(
    (e) => getEventStatus(e) === "upcoming",
  ).length;
  const completedCount = events.filter(
    (e) => getEventStatus(e) === "completed",
  ).length;

  const handleCreateEvent = () => {
    const formattedDate = `${new Date(newEvent.startDate).toLocaleString("en-US", { month: "short", day: "numeric" })}–${new Date(newEvent.endDate).getDate()}, ${new Date(newEvent.endDate).getFullYear()}`;
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newEvent.title,
        date: formattedDate,
        location: newEvent.location,
        registrations: 0,
        capacity: newEvent.capacity,
        image:
          newEvent.image ||
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      },
    ]);
    setShowCreateModal(false);
    setNewEvent({
      title: "",
      startDate: "",
      endDate: "",
      location: "",
      mode: "In-Person",
      capacity: "",
      prizePool: "",
      category: "",
      image: "",
      registrationLink: "",
    });
  };

  const fillPct = (reg, cap) => Math.min(100, Math.round((reg / cap) * 100));

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: 'Inter', Arial, sans-serif; }
        body { margin: 0; }

        /* ── Layout ── */
        .oe-page {
          margin-left: 18%;
          width: 82%;
          min-height: 100vh;
          background: #f4f5fb;
          padding: 3%;
        }

        /* ── Top bar ── */
        .oe-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3%;
        }
        .oe-topbar h2 {
          font-size: 2.8vh;
          font-weight: 800;
          margin: 0 0 0.5% 0;
          color: #1e1b4b;
          letter-spacing: -0.03em;
        }
        .oe-topbar p { color: #6b7280; font-size: 1.5vh; margin: 0; }

        .oe-create-btn {
          display: flex;
          align-items: center;
          gap: 2%;
          padding: 1.3% 2.5%;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: #fff;
          border: none;
          border-radius: 1.5vh;
          font-size: 1.6vh;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 0.8vh 2vh rgba(99,102,241,0.35);
          white-space: nowrap;
          transition: opacity 0.2s;
        }
        .oe-create-btn:hover { opacity: 0.9; }

        /* ── Stats row ── */
        .oe-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2%;
          margin-bottom: 3%;
        }
        .oe-stat {
          background: #fff;
          border-radius: 1.8vh;
          padding: 3% 4%;
          display: flex;
          align-items: center;
          gap: 4%;
          box-shadow: 0 0.2vh 0.8vh rgba(0,0,0,0.05);
        }
        .oe-stat-icon {
          width: 5.5vh;
          height: 5.5vh;
          border-radius: 1.4vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2vh;
          flex-shrink: 0;
        }
        .oe-stat-num  { font-size: 2.8vh; font-weight: 800; color: #1e1b4b; margin: 0; }
        .oe-stat-label{ font-size: 1.4vh; color: #6b7280; margin: 0.5% 0 0; }

        /* ── Search ── */
        .oe-search-row { display: flex; gap: 2%; margin-bottom: 2.5%; }
        .oe-search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 2%;
          background: #fff;
          padding: 1.2% 2%;
          border-radius: 1.5vh;
          border: 1.5px solid #e5e7eb;
        }
        .oe-search-box input {
          border: none; outline: none;
          width: 100%; font-size: 1.5vh; color: #374151;
          background: transparent;
        }

        /* ── Tabs ── */
        .oe-tabs {
  display: flex;
  gap: 1%;
  background: #fff;
  padding: 0.7%;
  border-radius: 1.6vh;
  width: fit-content;
  margin-bottom: 3%;
  border: 1.5px solid #e5e7eb;
  max-width: 100%;       /* ← box never overflows its container */
  box-sizing: border-box;
}
.oe-tab {
  padding: 1.2% 2.2%;          /* ← was 0.8% 2% — more breathing room */
  border-radius: 1.2vh;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.8vh;          /* ← was 1.2vh — much more readable */
  color: #6b7280;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.oe-tab.active {
  background: linear-gradient(135deg, #7b61ff, #a17cff);
  color: #fff;
  font-weight: 700;
}

        /* ── Grid ── */
        .oe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
          gap: 2%;
        }

        /* ── Card ── */
        .oe-card {
          background: #fff;
          border-radius: 2vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0.3vh 1vh rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .oe-card:hover {
          transform: translateY(-0.4vh);
          box-shadow: 0 1.5vh 3vh rgba(99,102,241,0.12);
        }

        /* image wrapper */
        .oe-card-img-wrap { position: relative; height: 20vh; overflow: hidden; }
        .oe-card-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* gradient overlay */
        .oe-card-img-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,10,40,0.55) 0%, transparent 55%);
        }

        /* status pill on image */
        .oe-status-pill {
          position: absolute;
          top: 4%;
          left: 4%;
          z-index: 2;
          padding: 0.5vh 1.2vh;
          border-radius: 99vh;
          font-size: 1.2vh;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .oe-card-body { padding: 4% 5%; flex: 1; display: flex; flex-direction: column; }

        .oe-card-title {
          font-size: 1.7vh;
          font-weight: 700;
          color: #1e1b4b;
          margin: 0 0 2% 0;
          line-height: 1.3;
        }

        .oe-meta {
          font-size: 1.35vh;
          color: #6b7280;
          margin: 0.8% 0;
          display: flex;
          align-items: center;
          gap: 2%;
        }

        /* capacity bar */
        .oe-bar-wrap {
          margin: 3% 0 2%;
          background: #f3f4f6;
          border-radius: 99vh;
          height: 0.8vh;
          overflow: hidden;
        }
        .oe-bar-fill {
          height: 100%;
          border-radius: 99vh;
          background: linear-gradient(90deg, #6366f1, #9333ea);
          transition: width 0.4s ease;
        }
        .oe-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 1.2vh;
          color: #9ca3af;
          margin-bottom: 3%;
        }

        /* action buttons */
        .oe-actions {
          display: flex;
          gap: 3%;
          margin-top: auto;
          padding-top: 3%;
          border-top: 1px solid #f3f4f6;
        }
        .oe-btn-edit {
          flex: 1;
          padding: 1.3% 0;
          border-radius: 1vh;
          cursor: pointer;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6%;
          font-size: 1.4vh;
          font-weight: 600;
          color: #4f46e5;
          transition: background 0.2s;
        }
        .oe-btn-edit:hover { background: #eef2ff; border-color: #a5b4fc; }

        .oe-btn-delete {
          flex: 1;
          padding: 1.3% 0;
          border-radius: 1vh;
          cursor: pointer;
          border: 1.5px solid #fecaca;
          background: #fff5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6%;
          font-size: 1.4vh;
          font-weight: 600;
          color: #ef4444;
          transition: background 0.2s;
        }
        .oe-btn-delete:hover { background: #fee2e2; }

        /* ── Modal ── */
        .oe-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,10,40,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          backdrop-filter: blur(2px);
        }
        .oe-modal {
          background: #fff;
          width: 36%;
          border-radius: 2.5vh;
          padding: 4%;
          max-height: 88vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2%;
          box-shadow: 0 3vh 6vh rgba(0,0,0,0.2);
        }
        .oe-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1%;
        }
        .oe-modal-header h2 { font-size: 2.2vh; font-weight: 800; color: #1e1b4b; margin: 0; }
        .oe-modal-close {
          background: #f3f4f6; border: none; border-radius: 99vh;
          width: 3.5vh; height: 3.5vh; cursor: pointer;
          font-size: 1.6vh; color: #6b7280; display: flex;
          align-items: center; justify-content: center;
        }

        .oe-field { display: flex; flex-direction: column; gap: 1%; }
        .oe-field label { font-size: 1.3vh; font-weight: 600; color: #374151; }
        .oe-field input,
        .oe-field select {
          padding: 1.3% 2%;
          border-radius: 1.2vh;
          border: 1.5px solid #e5e7eb;
          font-size: 1.5vh;
          outline: none;
          background: #f9fafb;
          transition: border-color 0.2s;
        }
        .oe-field input:focus,
        .oe-field select:focus { border-color: #818cf8; background: #fff; }

        .oe-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 2%;
          margin-top: 2%;
        }
        .oe-modal-cancel {
          padding: 1.2% 3%;
          border-radius: 1.2vh;
          cursor: pointer;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-size: 1.5vh;
          font-weight: 600;
          color: #6b7280;
        }
        .oe-modal-save {
          padding: 1.2% 3%;
          border-radius: 1.2vh;
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: #fff;
          font-size: 1.5vh;
          font-weight: 600;
          box-shadow: 0 0.5vh 1.5vh rgba(99,102,241,0.35);
        }
      `}</style>

      <Sidebar />

      <main className="oe-page">
        {/* ── Top Bar ── */}
        <div className="oe-topbar">
          <div>
            <h2>My Events</h2>
            <p>Manage all your hackathon events</p>
          </div>
          <button
            className="oe-create-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} /> Create New Event
          </button>
        </div>

        {/* ── Stats Row ── */}
        <div className="oe-stats">
          {[
            {
              icon: "📋",
              label: "Total Events",
              value: events.length,
              bg: "#eef2ff",
              color: "#4f46e5",
            },
            {
              icon: "🚀",
              label: "Upcoming",
              value: upcomingCount,
              bg: "#f0fdf4",
              color: "#16a34a",
            },
            {
              icon: "✅",
              label: "Completed",
              value: completedCount,
              bg: "#fdf4ff",
              color: "#9333ea",
            },
          ].map((s, i) => (
            <div className="oe-stat" key={i}>
              <div
                className="oe-stat-icon"
                style={{ background: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <p className="oe-stat-num">{s.value}</p>
                <p className="oe-stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div className="oe-search-row">
          <div className="oe-search-box">
            <Search size={16} color="#9ca3af" />
            <input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="oe-tabs">
          {[
            { key: "all", label: `All Events (${events.length})` },
            { key: "upcoming", label: `Upcoming (${upcomingCount})` },
            { key: "completed", label: `Completed (${completedCount})` },
          ].map((t) => (
            <div
              key={t.key}
              className={`oe-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* ── Event Grid ── */}
        <div className="oe-grid">
          {filteredEvents.map((event) => {
            const status = getEventStatus(event);
            const pct = fillPct(event.registrations, event.capacity);
            return (
              <div
                key={event.id}
                className="oe-card"
                onClick={() => navigate(`/organizer/update-event/${event.id}`)}
              >
                {/* Image */}
                <div className="oe-card-img-wrap">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span
                    className="oe-status-pill"
                    style={{
                      background: status === "upcoming" ? "#eef2ff" : "#f0fdf4",
                      color: status === "upcoming" ? "#4f46e5" : "#16a34a",
                    }}
                  >
                    {status}
                  </span>
                </div>

                {/* Body */}
                <div className="oe-card-body">
                  <h3 className="oe-card-title">{event.title}</h3>
                  <div className="oe-meta">
                    <Calendar size={13} /> {event.date}
                  </div>
                  <div className="oe-meta">
                    <MapPin size={13} /> {event.location}
                  </div>
                  <div className="oe-meta">
                    <Users size={13} /> {event.registrations} / {event.capacity}{" "}
                    registered
                  </div>

                  {/* Capacity bar */}
                  <div className="oe-bar-label">
                    <span>Capacity</span>
                    <span>{pct}% filled</span>
                  </div>
                  <div className="oe-bar-wrap">
                    <div className="oe-bar-fill" style={{ width: `${pct}%` }} />
                  </div>

                  {/* Actions */}
                  <div
                    className="oe-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="oe-btn-edit"
                      onClick={() => handleEditOpen(event)}
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      className="oe-btn-delete"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Edit Modal ── */}
        {selectedEvent && (
          <div className="oe-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="oe-modal" onClick={(e) => e.stopPropagation()}>
              <div className="oe-modal-header">
                <h2>Edit Event</h2>
                <button
                  className="oe-modal-close"
                  onClick={() => setSelectedEvent(null)}
                >
                  ✕
                </button>
              </div>
              {[
                { label: "Title", field: "title", type: "text" },
                { label: "Date", field: "date", type: "text" },
                { label: "Location", field: "location", type: "text" },
                {
                  label: "Registrations",
                  field: "registrations",
                  type: "number",
                },
                { label: "Capacity", field: "capacity", type: "number" },
              ].map(({ label, field, type }) => (
                <div className="oe-field" key={field}>
                  <label>{label}</label>
                  <input
                    type={type}
                    value={selectedEvent[field]}
                    onChange={(e) =>
                      handleEditFieldChange(field, e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="oe-modal-actions">
                <button
                  className="oe-modal-cancel"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
                <button className="oe-modal-save" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Create Modal ── */}
        {showCreateModal && (
          <div className="oe-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="oe-modal" onClick={(e) => e.stopPropagation()}>
              <div className="oe-modal-header">
                <h2>Create New Event</h2>
                <button
                  className="oe-modal-close"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✕
                </button>
              </div>
              {[
                { label: "Event Title", key: "title", type: "text" },
                { label: "Start Date", key: "startDate", type: "date" },
                { label: "End Date", key: "endDate", type: "date" },
                { label: "Location", key: "location", type: "text" },
                { label: "Capacity", key: "capacity", type: "number" },
                { label: "Prize Pool", key: "prizePool", type: "text" },
                {
                  label: "Registration Link",
                  key: "registrationLink",
                  type: "text",
                },
                { label: "Image URL", key: "image", type: "text" },
              ].map(({ label, key, type }) => (
                <div className="oe-field" key={key}>
                  <label>{label}</label>
                  <input
                    type={type}
                    value={newEvent[key]}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div className="oe-field">
                <label>Mode</label>
                <select
                  value={newEvent.mode}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, mode: e.target.value })
                  }
                >
                  <option>In-Person</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="oe-field">
                <label>Category</label>
                <input
                  list="oe-cats"
                  placeholder="Select or type"
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                />
                <datalist id="oe-cats">
                  <option value="AI" />
                  <option value="Web3" />
                  <option value="Blockchain" />
                  <option value="IoT" />
                  <option value="FinTech" />
                  <option value="Healthcare" />
                </datalist>
              </div>
              <div className="oe-modal-actions">
                <button
                  className="oe-modal-cancel"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button className="oe-modal-save" onClick={handleCreateEvent}>
                  + Create Event
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
