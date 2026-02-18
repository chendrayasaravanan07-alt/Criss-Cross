import React, { useState } from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaShieldAlt,
  FaBan,
  FaSearch,
} from "react-icons/fa";

export default function UserManagement() {
  const usersData = [
    {
      id: 1,
      name: "Emily Rodriguez",
      email: "emily.r@stanford.edu",
      role: "Student",
      organization: "Stanford University",
      events: 12,
      joinDate: "Dec 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      role: "Organizer",
      organization: "TechCorp Events",
      events: 24,
      joinDate: "Nov 8, 2024",
      status: "Active",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      
      {/* 🔵 20% Sidebar Div */}
      <div style={{ width: "20%", background: "#111827", color: "white" }}>
        {/* You can import Sidebar component here */}
        {/* <Sidebar /> */}
      </div>

      {/* 🔵 80% Main Content */}
      <div style={{ width: "80%", padding: "30px" }}>
        <h2 style={{ marginBottom: "5px" }}>User Management</h2>
        <p style={{ color: "gray", marginBottom: "30px" }}>
          Manage all users across the platform
        </p>

        {/* 🔹 Stats Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <StatCard icon={<FaUsers />} count="6" label="Total Users" />
          <StatCard icon={<FaUserGraduate />} count="3" label="Students" />
          <StatCard icon={<FaShieldAlt />} count="3" label="Organizers" />
          <StatCard icon={<FaBan />} count="1" label="Suspended" />
        </div>

        {/* 🔹 Search & Filters */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#f1f5f9",
              padding: "10px 15px",
              borderRadius: "10px",
            }}
          >
            <FaSearch style={{ marginRight: "10px", color: "gray" }} />
            <input
              type="text"
              placeholder="Search by name or email..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select style={selectStyle}>
            <option>All Roles</option>
            <option>Student</option>
            <option>Organizer</option>
          </select>

          <select style={selectStyle}>
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>

        {/* 🔹 Table */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th style={thStyle}>USER</th>
                <th style={thStyle}>ROLE</th>
                <th style={thStyle}>ORGANIZATION</th>
                <th style={thStyle}>EVENTS</th>
                <th style={thStyle}>JOIN DATE</th>
                <th style={thStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}>
                    <strong>{user.name}</strong>
                    <br />
                    <span style={{ color: "gray" }}>{user.email}</span>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        background:
                          user.role === "Student"
                            ? "#dbeafe"
                            : "#ede9fe",
                        color:
                          user.role === "Student"
                            ? "#1d4ed8"
                            : "#7c3aed",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={tdStyle}>{user.organization}</td>
                  <td style={tdStyle}>{user.events}</td>
                  <td style={tdStyle}>{user.joinDate}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        background:
                          user.status === "Active"
                            ? "#dcfce7"
                            : "#fee2e2",
                        color:
                          user.status === "Active"
                            ? "#15803d"
                            : "#b91c1c",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Components */

function StatCard({ icon, count, label }) {
  return (
    <div
      style={{
        flex: 1,
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          background: "#e0f2fe",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{ margin: 0 }}>{count}</h3>
        <p style={{ margin: 0, color: "gray" }}>{label}</p>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontSize: "14px",
  color: "gray",
};

const tdStyle = {
  padding: "15px",
  fontSize: "14px",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};
