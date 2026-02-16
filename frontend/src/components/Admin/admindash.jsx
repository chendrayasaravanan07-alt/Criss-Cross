import React from "react";
import Sidebar from "./asidebar";   // ✅ Import Sidebar
import {
  FaUsers,
  FaCalendarAlt,
  FaHeartbeat,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Admindash() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* ✅ Sidebar Component */}
      <Sidebar />

      {/* ✅ Main Content */}
      <div style={{ marginLeft: "260px",flex: 1, padding: "30px", background: "#f8fafc" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "5px" }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "#64748b", marginBottom: "25px" }}>
          Overview of platform activity and metrics
        </p>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {[
            [<FaUsers size={22} />, "12,847", "Total Users", "+342 this week"],
            [
              <FaCalendarAlt size={22} />,
              "248",
              "Total Events",
              "+18 pending approval",
            ],
            [
              <FaHeartbeat size={22} />,
              "56",
              "Active Events",
              "Happening now",
            ],
            [
              <FaExclamationCircle size={22} />,
              "18",
              "Pending Approvals",
              "Requires attention",
            ],
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 0 0 1px #e5e7eb",
              }}
            >
              <div style={{ marginBottom: "12px", color: "#2563eb" }}>
                {item[0]}
              </div>

              <h2>{item[1]}</h2>
              <p style={{ color: "#475569" }}>{item[2]}</p>
              <span style={{ color: "#64748b", fontSize: "14px" }}>
                {item[3]}
              </span>
            </div>
          ))}
        </div>

        {/* Platform Metrics */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            marginTop: "30px",
            boxShadow: "0 0 0 1px #e5e7eb",
          }}
        >
          <h3>Platform Metrics</h3>

          <div style={{ marginTop: "15px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Student Accounts</span>
              <span>11,234</span>
            </div>
            <div
              style={{
                background: "#e5e7eb",
                height: "10px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: "85%",
                  height: "100%",
                  background: "#2563eb",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Organizer Accounts</span>
              <span>1,613</span>
            </div>
            <div
              style={{
                background: "#e5e7eb",
                height: "10px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  background: "#9333ea",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Approvals */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            marginTop: "30px",
            boxShadow: "0 0 0 1px #e5e7eb",
          }}
        >
          <h3>Recent Approvals</h3>

          {[
            [
              "Healthcare Innovation Sprint",
              "by MedTech Solutions • Today",
              "Approved",
            ],
            [
              "Climate Tech Challenge",
              "by Green Future • Yesterday",
              "Approved",
            ],
            [
              "GameDev Jam 2025",
              "by Game Studios Inc • Yesterday",
              "Rejected",
            ],
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom:
                  i !== 2 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <div>
                <strong>{item[0]}</strong>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  {item[1]}
                </p>
              </div>
              <span
                style={{
                  background:
                    item[2] === "Approved"
                      ? "#dcfce7"
                      : "#fee2e2",
                  color:
                    item[2] === "Approved"
                      ? "#166534"
                      : "#991b1b",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  height: "fit-content",
                }}
              >
                {item[2]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}