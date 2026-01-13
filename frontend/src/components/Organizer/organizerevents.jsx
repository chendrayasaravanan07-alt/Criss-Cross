import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

export default function OrganizerEvents() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("My Events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Innovation Challenge 2025",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      registrations: 156,
      capacity: 200,
      image:
        "https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Web3 Summit Hackathon",
      date: "Jan 22–24, 2025",
      location: "Virtual",
      registrations: 342,
      capacity: 500,
      image:
        "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "AI Innovation Challenge 2025",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      registrations: 156,
      capacity: 200,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c"    },
    {
      id: 4,
      title: "Web3 Summit Hackathon",
      date: "Jan 22–24, 2025",
      location: "Virtual",
      registrations: 342,
      capacity: 500,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    },
  ]);

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEditOpen = (event) => {
  setSelectedEvent({ ...event });
};

const handleEditFieldChange = (field, value) => {
  setSelectedEvent((prev) => ({ ...prev, [field]: value }));
};

const handleSave = () => {
  setEvents((prev) =>
    prev.map((e) =>
      e.id === selectedEvent.id ? selectedEvent : e
    )
  );
  setSelectedEvent(null);
};

const getEventEndDate = (dateRange) => {
  // "Jan 15–17, 2025"
  const [month, days, year] = dateRange.replace(",", "").split(" ");

  const endDay = days.includes("–")
    ? days.split("–")[1]
    : days;

  return new Date(`${month} ${endDay}, ${year}`);
};

const getEventStatus = (event) => {
  const today = new Date();
  const endDate = getEventEndDate(event.date);
  return endDate < today ? "completed" : "upcoming";
};

const filteredEvents = events.filter((event) => {
  const matchesSearch = event.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const status = getEventStatus(event);

  if (activeTab === "upcoming") return status === "upcoming" && matchesSearch;
  if (activeTab === "completed") return status === "completed" && matchesSearch;

  return matchesSearch; // all
});


const upcomingCount = events.filter(
  (e) => getEventStatus(e) === "upcoming"
).length;

const completedCount = events.filter(
  (e) => getEventStatus(e) === "completed"
).length;

const [showCreateModal, setShowCreateModal] = useState(false);

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
  registrationLink: ""
});

const handleCreateEvent = () => {
  const formattedDate = `${new Date(newEvent.startDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric"
  })}–${new Date(newEvent.endDate).getDate()}, ${new Date(
    newEvent.endDate
  ).getFullYear()}`;

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
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
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
    registrationLink: ""
  });
};



  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          margin: 0;
        }

        .layout {
          display: flex;
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: clamp(200px, 18vw, 280px);
          background: #1f1f2e;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .menu-item {
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .menu-item.active {
          background: linear-gradient(90deg, #6366f1, #9333ea);
        }

        .sidebar-footer {
          margin-top: auto;
          font-size: 14px;
          opacity: 0.8;
        }

        .search-row {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}

.search-box {
  flex: 1;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
}

.filter-btn {
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  font-weight: 500;
}
  .tabs {
  display: flex;
  gap: 10px;
  background: white;
  padding: 6px;
  border-radius: 14px;
  width: fit-content;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
}

.tab {
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #475569;
}

.tab.active {
  background: linear-gradient(90deg, #6366f1, #9333ea);
  color: white;
}

        /* Content */
        .content {
          margin-left: clamp(200px, 18vw, 280px);
          padding: 24px;
          width: calc(100vw - clamp(200px, 18vw, 280px));
          min-height: 100vh;
          background: #f5f6fa;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .create-btn {
          background: linear-gradient(90deg, #6366f1, #9333ea);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card img {
          height: 160px;
          width: 100%;
          object-fit: cover;
        }

        .card-body {
          padding: 16px;
          flex: 1;
        }

        .meta {
          font-size: 14px;
          color: #666;
          margin: 6px 0;
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .actions button {
          flex: 1;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid #ddd;
          background: #fff;
        }

        .delete {
          color: red;
          border-color: #fca5a5;
        }

        input {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 420px;
  border-radius: 16px;
  padding: 24px;
  max-height: 90vh;      
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
}

.modal h2 {
  margin-bottom: 8px;
}

.modal label {
  font-size: 14px;
  color: #555;
}

.modal input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.save-btn {
  background: linear-gradient(90deg, #6366f1, #9333ea);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
}


      `}</style>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
         
          
        </aside>

        {/* Content */}
        <main className="content">
          <div className="header">

            <div>
              <h2 style={{padding:"5px"}}><b>My Events</b></h2>
              <p style={{ color: "#666" }}>
                Manage all your hackathon events
              </p>
            </div>

            <button className="create-btn" onClick={() => setShowCreateModal(true)}>
              <Plus size={18} />
              Create New Event
            </button>
          </div>
          <div className="search-row">
  <div className="search-box">
    🔍
    <input
      placeholder="Search events..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <button className="filter-btn">Filters</button>
</div>



<div className="tabs">
  <div
    className={`tab ${activeTab === "all" ? "active" : ""}`}
    onClick={() => setActiveTab("all")}
  >
    All Events ({events.length})
  </div>

  <div
    className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
    onClick={() => setActiveTab("upcoming")}
  >
    Upcoming ({upcomingCount})
  </div>

  <div
    className={`tab ${activeTab === "completed" ? "active" : ""}`}
    onClick={() => setActiveTab("completed")}
  >
    Completed ({completedCount})
  </div>
</div>



          <div className="grid">
            {filteredEvents.map((event) => (
              <div key={event.id} 
                className="card" 
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <img src={event.image} alt={event.title} />

                <div className="card-body">
  <h3>{event.title}</h3>

  <div className="meta">
    <Calendar size={14} /> {event.date}
  </div>

  <div className="meta">
    <MapPin size={14} /> {event.location}
  </div>

  <div className="meta">
    <Users size={14} /> {event.registrations}/{event.capacity}
  </div>

  <div className="actions" onClick={(e) => e.stopPropagation()}>
    <button onClick={() => handleEditOpen(event)}>
      <Edit size={14} /> Edit
    </button>

    <button
      className="delete"
      onClick={() => handleDelete(event.id)}
    >
      <Trash2 size={14} /> Delete
    </button>
  </div>
</div>

              </div>
            ))}
          </div>
          {selectedEvent && (
  <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Edit Event</h2>

      <label>Title</label>
      <input
        value={selectedEvent.title}
        onChange={(e) =>
          handleEditFieldChange("title", e.target.value)
        }
      />

      <label>Date</label>
      <input
        value={selectedEvent.date}
        onChange={(e) =>
          handleEditFieldChange("date", e.target.value)
        }
      />

      <label>Location</label>
      <input
        value={selectedEvent.location}
        onChange={(e) =>
          handleEditFieldChange("location", e.target.value)
        }
      />

      <label>Registrations</label>
      <input
        type="number"
        value={selectedEvent.registrations}
        onChange={(e) =>
          handleEditFieldChange("registrations", e.target.value)
        }
      />

      <label>Capacity</label>
      <input
        type="number"
        value={selectedEvent.capacity}
        onChange={(e) =>
          handleEditFieldChange("capacity", e.target.value)
        }
      />

      <div className="modal-actions">
        <button onClick={() => setSelectedEvent(null)}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
  
  {showCreateModal && (
  <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Create New Event</h2>

      <label>Event Title</label>
      <input
        value={newEvent.title}
        onChange={(e) =>
          setNewEvent({ ...newEvent, title: e.target.value })
        }
      />

      <label>Start Date</label>
      <input
        type="date"
        onChange={(e) =>
          setNewEvent({ ...newEvent, startDate: e.target.value })
        }
      />

      <label>End Date</label>
      <input
        type="date"
        onChange={(e) =>
          setNewEvent({ ...newEvent, endDate: e.target.value })
        }
      />

      <label>Location</label>
      <input
        value={newEvent.location}
        onChange={(e) =>
          setNewEvent({ ...newEvent, location: e.target.value })
        }
      />

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

      <label>Capacity</label>
      <input
        type="number"
        value={newEvent.capacity}
        onChange={(e) =>
          setNewEvent({ ...newEvent, capacity: e.target.value })
        }
      />

      <label>Prize Pool</label>
      <input
        value={newEvent.prizePool}
        onChange={(e) =>
          setNewEvent({ ...newEvent, prizePool: e.target.value })
        }
      />

      <label>Category</label>
      <input
        list="categories"
        placeholder="Select or type"
        value={newEvent.category}
        onChange={(e) =>
          setNewEvent({ ...newEvent, category: e.target.value })
        }
      />
      <datalist id="categories">
        <option value="AI" />
        <option value="Web3" />
        <option value="Blockchain" />
        <option value="IoT" />
        <option value="FinTech" />
        <option value="Healthcare" />
      </datalist>

      <label>Registration Link</label>
      <input
        value={newEvent.registrationLink}
        onChange={(e) =>
          setNewEvent({ ...newEvent, registrationLink: e.target.value })
        }
      />

      <label>Image URL</label>
      <input
        value={newEvent.image}
        onChange={(e) =>
          setNewEvent({ ...newEvent, image: e.target.value })
        }
      />

      <div className="modal-actions">
        <button onClick={() => setShowCreateModal(false)}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleCreateEvent}>
          + Create Event
        </button>
      </div>
    </div>
  </div>
)}


        </main>
      </div>
    </>
  );
}
