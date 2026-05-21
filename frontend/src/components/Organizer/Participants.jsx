import React, { useState } from "react";
import Sidebar from "./osidebar";

export default function Participants() {
  const [search, setSearch] = useState("");

  const participantsData = [
    {
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
    },
  ];

  const filteredParticipants = participantsData.filter((p) =>
    `${p.name} ${p.email} ${p.event}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDownloadReport = () => {
    const headers = ["Name", "Email", "Event", "Date", "Location", "Organization", "Type", "Status"];

    const rows = filteredParticipants.map((p) => [
      p.name,
      p.email,
      p.event,
      p.date,
      p.location,
      p.org,
      p.type,
      p.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `participants_report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{css}</style>

      <Sidebar />

      <div className="participants-page">
        <div className="participants-header">
          <h1>Registered Participants</h1>
          <p>View and manage all registered participants</p>
        </div>

        <div className="stats-card">
          <span className="stats-number">{filteredParticipants.length}</span>
          <span className="stats-text">
            {search ? "Matching Participants" : "Registered Participants"}
          </span>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleDownloadReport}>⬇ Download Report</button>
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

const css = `
.participants-page {
  margin-left: clamp(200px, 18vw, 280px);
  width: calc(100% - clamp(200px, 18vw, 280px));
  box-sizing: border-box;
  padding: 3%;
  min-height: 100vh;
  background: #f9fafb;
}

.participants-header h1 {
  font-size: 26px;
  margin-bottom: 4px;
}

.participants-header p {
  margin-top: 0;
  color: #6b7280;
}

.stats-card {
  margin-top: 24px;
  width: 260px;
  background: white;
  padding: 20px 24px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
}

.stats-number {
  font-size: 28px;
  font-weight: 700;
  color: #6366f1;
}

.stats-text {
  color: #6b7280;
  font-size: 14px;
}

.toolbar {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.toolbar input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  outline: none;
}

.toolbar button {
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(90deg, #6366f1, #9333ea);
  white-space: nowrap;
  transition: opacity 0.2s;
}

.toolbar button:hover {
  opacity: 0.9;
}

.table-container {
  margin-top: 24px;
  background: white;
  border-radius: 14px;
  padding: 16px 24px;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 0 0 14px 0;
  color: #6b7280;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 14px 0;
  border-top: 1px solid #f3f4f6;
  font-size: 14px;
}

.user {
  display: flex;
  gap: 10px;
  align-items: center;
}

.user img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user span {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.sub {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
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
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
`;