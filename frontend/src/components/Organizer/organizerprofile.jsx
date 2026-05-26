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
        marginLeft: "18%",
        width: "82%",
        boxSizing: "border-box",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        padding: "3%",
        fontFamily: "sans-serif",
      }}>

        <h2 style={{ marginBottom: "0.8%", fontSize: "3vh" }}>My Profile</h2>
        <p style={{ color: "#6b7280", marginBottom: "3%", fontSize: "1.6vh" }}>
          Manage your personal information
        </p>

        <div style={{
          backgroundColor: "#fff",
          borderRadius: "2vh",
          padding: "3%",
          maxWidth: "50%",
          border: "1px solid #e5e7eb",
        }}>

          {!editing ? (
            <>
              {Object.entries(profile).map(([key, val]) => (
                <div key={key} style={{ marginBottom: "2.5%" }}>
                  <p style={{ color: "#6b7280", fontSize: "1.4vh", marginBottom: "0.5%" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <p style={{ fontSize: "1.8vh", fontWeight: "500", margin: 0 }}>{val}</p>
                </div>
              ))}

              <button
                onClick={() => setEditing(true)}
                style={{
                  marginTop: "1%",
                  padding: "1.2% 3%",
                  borderRadius: "1.2vh",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.5vh",
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
                <div key={key} style={{ marginBottom: "2%" }}>
                  <label style={{
                    display: "block",
                    color: "#6b7280",
                    fontSize: "1.4vh",
                    marginBottom: "0.8%",
                  }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "1.2% 1.5%",
                      borderRadius: "1vh",
                      border: "1px solid #e5e7eb",
                      fontSize: "1.6vh",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: "2%", marginTop: "1%" }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "1.2% 3%",
                    borderRadius: "1.2vh",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5vh",
                    background: "linear-gradient(90deg, #6366f1, #9333ea)",
                    color: "#fff",
                  }}
                >
                  Save Changes
                </button>

                <button
                  onClick={() => { setForm({ ...profile }); setEditing(false); }}
                  style={{
                    padding: "1.2% 3%",
                    borderRadius: "1.2vh",
                    border: "1px solid #e5e7eb",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1.5vh",
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