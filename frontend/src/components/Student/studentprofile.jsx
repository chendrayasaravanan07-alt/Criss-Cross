import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import axios from "axios";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("studentToken");
  const storedStudent = localStorage.getItem("studentData") || localStorage.getItem("student");
  const studentData = storedStudent ? JSON.parse(storedStudent) : null;
  const studentId = studentData?._id || studentData?.id;

  const [profile, setProfile] = useState({
    name: "",
    degree: "",
    bio: "",
    email: "",
    location: "",
    image: "https://i.pravatar.cc/150?img=12",
  });

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    if (!studentId || !token) {
      console.warn("User is not logged in or token/ID is missing");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/student-profile/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          const data = res.data.data;
          setProfile({
            name: data.name || "",
            degree: data.degree || "",
            bio: data.bio || "",
            email: data.email || "",
            location: data.location || "",
            image: data.profileImage || "https://i.pravatar.cc/150?img=12",
          });
          setSkills(data.skills || []);
          setInterests(data.interests || []);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfile();
  }, [studentId, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const handleSave = async () => {
    if (!studentId || !token) {
      alert("Please log in to update your profile.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/student-profile/${studentId}`,
        {
          name: profile.name,
          degree: profile.degree,
          bio: profile.bio,
          email: profile.email,
          location: profile.location,
          profileImage: profile.image,
          skills: skills,
          interests: interests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
        const updatedStudent = res.data.data;
        if (localStorage.getItem("studentData")) {
          localStorage.setItem("studentData", JSON.stringify(updatedStudent));
        }
        if (localStorage.getItem("student")) {
          localStorage.setItem("student", JSON.stringify(updatedStudent));
        }
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: "18%",
          width: "82%",
          padding: "3%",
          boxSizing: "border-box",
        }}
      >
        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.banner}></div>

          <div style={styles.profileRow}>
            <div style={{ position: "relative" }}>
              <img src={profile.image} alt="avatar" style={styles.avatar} />
              {isEditing && (
                <label style={styles.uploadBtn}>
                  Change
                  <input type="file" hidden onChange={handleImageChange} />
                </label>
              )}
            </div>

            <div style={{ flex: 1 }}>
              {isEditing ? (
                <>
                  <input style={styles.input} name="name" value={profile.name} onChange={handleChange} />
                  <input style={styles.input} name="degree" value={profile.degree} onChange={handleChange} />
                  <textarea style={styles.textarea} name="bio" value={profile.bio} onChange={handleChange} />
                  <input style={styles.input} name="email" value={profile.email} onChange={handleChange} />
                  <input style={styles.input} name="location" value={profile.location} onChange={handleChange} />
                </>
              ) : (
                <>
                  <h2 style={{ fontSize: "2.2vh" }}>{profile.name}</h2>
                  <p style={{ fontSize: "1.5vh" }}>{profile.degree}</p>
                  <p style={{ fontSize: "1.4vh" }}>{profile.bio}</p>
                  <p style={{ fontSize: "1.4vh" }}>📧 {profile.email}</p>
                  <p style={{ fontSize: "1.4vh" }}>📍 {profile.location}</p>
                </>
              )}
            </div>

            <button
              style={styles.editBtnLeft}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Events Count */}
        <div style={styles.card}>
          <h2 style={{ fontSize: "2.5vh" }}>3</h2>
          <p style={{ fontSize: "1.4vh" }}>Events Participated</p>
        </div>

        {/* Skills */}
        <div style={styles.section}>
          <h3 style={{ fontSize: "1.8vh" }}>💡 Skills</h3>
          <div style={styles.tags}>
            {skills.map((s, i) => (
              <span key={i} style={styles.tag}>{s}</span>
            ))}
          </div>
          {isEditing && (
            <div style={styles.addBox}>
              <input
                placeholder="Add new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                style={styles.addInput}
              />
              <button onClick={addSkill} style={styles.addBtn}>Add</button>
            </div>
          )}
        </div>

        {/* Interests */}
        <div style={styles.section}>
          <h3 style={{ fontSize: "1.8vh" }}>⭐ Interests</h3>
          <div style={styles.tags}>
            {interests.map((item, idx) => (
              <span key={idx} style={styles.tag}>{item}</span>
            ))}
          </div>
          {isEditing && (
            <div style={styles.addBox}>
              <input
                placeholder="Add interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                style={styles.addInput}
              />
              <button onClick={addInterest} style={styles.addBtn}>Add</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "#fff",
    borderRadius: "2vh",
    marginBottom: "3%",
    position: "relative",
  },
  banner: {
    height: "15vh",
    background: "linear-gradient(90deg, #6366f1, #ec4899)",
    borderRadius: "2vh 2vh 0 0",
  },
  profileRow: {
    display: "flex",
    gap: "2%",
    padding: "2%",
    alignItems: "center",
  },
  avatar: {
    width: "12vh",
    height: "12vh",
    borderRadius: "1.5vh",
    border: "4px solid white",
    marginTop: "-8%",
    objectFit: "cover",
  },
  uploadBtn: {
    position: "absolute",
    bottom: "3%",
    right: "3%",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "1.2vh",
    padding: "0.5% 1%",
    borderRadius: "0.8vh",
    cursor: "pointer",
  },
  editBtnLeft: {
    height: "5vh",
    padding: "1% 2%",
    borderRadius: "1vh",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontSize: "1.4vh",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "1%",
    marginBottom: "1%",
    borderRadius: "0.8vh",
    border: "1px solid #ccc",
    fontSize: "1.4vh",
  },
  textarea: {
    width: "100%",
    height: "8vh",
    padding: "1%",
    marginBottom: "1%",
    borderRadius: "0.8vh",
    border: "1px solid #ccc",
    fontSize: "1.4vh",
  },
  card: {
    background: "#fff",
    padding: "2%",
    borderRadius: "2vh",
    width: "28%",
    marginBottom: "2%",
  },
  section: {
    background: "#fff",
    padding: "2%",
    borderRadius: "2vh",
    marginBottom: "2%",
  },
  tags: {
    display: "flex",
    gap: "1%",
    flexWrap: "wrap",
  },
  tag: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "0.6% 1.5%",
    borderRadius: "999px",
    fontSize: "1.3vh",
    fontWeight: "500",
  },
  addBox: {
    marginTop: "1%",
    display: "flex",
    gap: "1%",
  },
  addInput: {
    flex: 1,
    padding: "1%",
    borderRadius: "0.8vh",
    border: "1px solid #ccc",
    fontSize: "1.4vh",
  },
  addBtn: {
    padding: "1% 2%",
    borderRadius: "0.8vh",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1.4vh",
  },
};

export default StudentProfile;