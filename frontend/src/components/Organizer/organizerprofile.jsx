import React, { useState, useEffect } from "react";
import Sidebar from "./osidebar";
import axios from "axios";

export default function OrganizerProfile() {
  const token = localStorage.getItem("organizerToken");
  const storedOrganizer = localStorage.getItem("organizer");
  const organizerData = storedOrganizer ? JSON.parse(storedOrganizer) : null;
  const organizerId = organizerData?.id || organizerData?._id;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    bio: "",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  useEffect(() => {
    if (!organizerId || !token) {
      console.warn("Organizer not logged in or token/ID is missing");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/organizer-profile/${organizerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          const data = res.data.data;
          const loadedProfile = {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            organization: data.organization || "",
            bio: data.bio || "",
          };
          setProfile(loadedProfile);
          setForm(loadedProfile);
        }
      } catch (error) {
        console.error("Error fetching organizer profile:", error);
      }
    };

    fetchProfile();
  }, [organizerId, token]);

  const handleSave = async () => {
    if (!organizerId || !token) {
      alert("Please log in to update your profile.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/organizer-profile/${organizerId}`,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          bio: form.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
        const updatedOrganizer = res.data.data;
        const savedProfile = {
          name: updatedOrganizer.name || "",
          email: updatedOrganizer.email || "",
          phone: updatedOrganizer.phone || "",
          organization: updatedOrganizer.organization || "",
          bio: updatedOrganizer.bio || "",
        };
        setProfile(savedProfile);
        setForm(savedProfile);

        // Update local storage
        if (localStorage.getItem("organizer")) {
          const localOrg = JSON.parse(localStorage.getItem("organizer"));
          localStorage.setItem("organizer", JSON.stringify({
            ...localOrg,
            name: updatedOrganizer.name,
            email: updatedOrganizer.email,
          }));
        }
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
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