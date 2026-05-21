import React, { useState } from "react";
import Sidebar from "./osidebar";

export default function OrganizerProfile() {
  const [profile, setProfile] = useState({
    name: "John Organizer",
    email: "organizer@example.com",
    phone: "+91 9876543210",
    organization: "Tech Events Co.",
    bio: "Passionate about organizing meaningful events.",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...form });
    setEditing(false);
  };

  return (
    <>
      <Sidebar />

      <div style={{
        marginLeft: "clamp(200px, 18vw, 280px)",
        width: "calc(100% - clamp(200px, 18vw, 280px))",
        boxSizing: "border-box",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        padding: "40px",
        fontFamily: "sans-serif",
      }}>

        <h2 style={{ marginBottom: "8px", fontSize: "26px" }}>My Profile</h2>
        <p style={{ color: "#6b7280", marginBottom: "32px" }}>
          Manage your personal information
        </p>

        <div style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "600px",
          border: "1px solid #e5e7eb",
        }}>

          {!editing ? (
            <>
              {Object.entries(profile).map(([key, val]) => (
                <div key={key} style={{ marginBottom: "20px" }}>
                  <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "4px" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: "500", margin: 0 }}>{val}</p>
                </div>
              ))}

              <button
                onClick={() => setEditing(true)}
                style={{
                  marginTop: "8px",
                  padding: "10px 24px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #6366f1, #9333ea)",
                  color: "#fff",
                }}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {Object.keys(form).map((key) => (
                <div key={key} style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#6b7280", fontSize: "13px", marginBottom: "6px" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "15px",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #6366f1, #9333ea)",
                    color: "#fff",
                  }}
                >
                  Save Changes
                </button>

                <button
                  onClick={() => { setForm({ ...profile }); setEditing(false); }}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: "#fff",
                    color: "#374151",
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}