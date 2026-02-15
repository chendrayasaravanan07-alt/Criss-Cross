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

export default function Participants() {
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");

  /* ---------------- Sidebar Data ---------------- */

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

  /* ---------------- Participants Data ---------------- */

  const participantsData = [{
    id: 1,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    event: "AI Innovation Challenge 2025",
    date: "Dec 15, 2024",
    location: "San Francisco, CA",
    org: "Stanford University",
    type: "Team",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@university.edu",
    event: "Web3 Summit Hackathon",
    date: "Dec 18, 2024",
    location: "Boston, MA",
    org: "MIT",
    type: "Team",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    email: "sarah.t@college.edu",
    event: "AI Innovation Challenge 2025",
    date: "Dec 10, 2024",
    location: "Berkeley, CA",
    org: "UC Berkeley",
    type: "Solo",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "David Park",
    email: "d.park@university.com",
    event: "Web3 Summit Hackathon",
    date: "Dec 20, 2024",
    location: "Atlanta, GA",
    org: "Georgia Tech",
    type: "Team",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 5,
    name: "Jessica Liu",
    email: "j.liu@school.edu",
    event: "Startup Weekend 2025",
    date: "Dec 12, 2024",
    location: "Pittsburgh, PA",
    org: "Carnegie Mellon",
    type: "Team",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 6,
    name: "Alex Johnson",
    email: "alex.j@college.edu",
    event: "AI Innovation Challenge 2025",
    date: "Dec 22, 2024",
    location: "Ithaca, NY",
    org: "Cornell University",
    type: "Solo",
    status: "Registered",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
  },];

  const filteredParticipants = participantsData.filter((p) =>
    `${p.name} ${p.email} ${p.event}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ---------------- Sidebar Style ---------------- */

  const sidebarStyle = {
    height: "100vh",
    width: "260px",
    position: "fixed",
    left: 0,
    top: 0,
    backgroundColor: "#1f1f2e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxSizing: "border-box",
  };

  const menuItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    background: isActive
      ? "linear-gradient(90deg, #7b61ff, #a17cff)"
      : "transparent",
  });

  return (
    <>
      <style>{css}</style>

      {/* ---------------- Sidebar ---------------- */}
      <div style={sidebarStyle}>
        <div style={{ fontSize: "22px", marginBottom: "40px" }}>
          <FaLink /> Criss-Cross
        </div>

        <div style={{ flex: 1 }}>
          {mainMenuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              style={menuItemStyle(active === item.name)}
            >
              <div style={{ marginRight: "10px" }}>{item.icon}</div>
              {item.name}
            </div>
          ))}
        </div>

        <div>
          {bottomMenuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              style={menuItemStyle(active === item.name)}
            >
              <div style={{ marginRight: "10px" }}>{item.icon}</div>
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Participants Page ---------------- */}
      <div className="participants-page">
        <div className="participants-header">
          <h1>Registered Participants</h1>
          <p>View and manage all registered participants</p>
        </div>

        <div className="stats-card">
          <span className="stats-number">{filteredParticipants.length}</span>
          <span className="stats-text">Registered Participants</span>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Download Report</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Event</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredParticipants.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="user">
                      <img src={p.avatar} alt={p.name} />
                      <div>
                        <strong>{p.name}</strong>
                        <span>{p.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{p.event}</strong>
                    <span className="sub">{p.date}</span>
                  </td>

                  <td>
                    <strong>{p.location}</strong>
                    <span className="sub">{p.org}</span>
                  </td>

                  <td>
                    <span className={`badge ${p.type.toLowerCase()}`}>
                      {p.type}
                    </span>
                  </td>

                  <td>
                    <span className="status">{p.status}</span>
                  </td>
                </tr>
              ))}

              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty">
                    No participants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}


/* ---------------- CSS ---------------- */

const css = `
.participants-page {
  width: calc(100% - 260px);
  margin-left: 260px;
  padding: 3%;
  min-height: 100vh;
  background: #f9fafb;
}

.participants-header h1 {
  font-size: 3vh;
}

.participants-header p {
  margin-top: 0.5%;
  color: #6b7280;
}

.stats-card {
  margin-top: 3%;
  width: 30%;
  background: white;
  padding: 3%;
  border-radius: 2vh;
  display: flex;
  align-items: center;
  gap: 2%;
}

.stats-number {
  font-size: 3vh;
  font-weight: 600;
}

.stats-text {
  color: #6b7280;
}

.toolbar {
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
  gap: 2%;
}

.toolbar input {
  width: 55%;
  padding: 1.5% 3%;
  border-radius: 2vh;
  border: 0.2vh solid #e5e7eb;
}

.toolbar button {
  padding: 1.5% 3%;
  border-radius: 2vh;
  border: none;
  cursor: pointer;
  color: white;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
}

.table-container {
  margin-top: 3%;
  background: white;
  border-radius: 2vh;
  padding: 2%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding-bottom: 1.5%;
  color: #6b7280;
}

td {
  padding: 2% 0;
  border-top: 0.1vh solid #e5e7eb;
}

.user {
  display: flex;
  gap: 1vh;
  align-items: center;
}

.user img {
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
}

.user span {
  display: block;
  font-size: 1.4vh;
  color: #6b7280;
}

.sub {
  display: block;
  font-size: 1.4vh;
  color: #6b7280;
}

.badge {
  padding: 0.5vh 1.5vh;
  border-radius: 2vh;
  font-size: 1.4vh;
}

.badge.team {
  background: #f3e8ff;
  color: #9333ea;
}

.badge.solo {
  background: #e0f2fe;
  color: #2563eb;
}

.status {
  background: #ecfdf5;
  color: #16a34a;
  padding: 0.5vh 1.5vh;
  border-radius: 2vh;
  font-size: 1.4vh;
}

.empty {
  text-align: center;
  padding: 3%;
  color: #6b7280;
}

@media (max-width: 900px) {
  .participants-page {
    width: 100%;
    margin-left: 0;
  }

  .toolbar {
    flex-direction: column;
  }

  .toolbar input {
    width: 100%;
  }
}
`;
