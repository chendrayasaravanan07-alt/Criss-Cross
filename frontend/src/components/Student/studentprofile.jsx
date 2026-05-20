import React, { useState } from "react";
import Sidebar from "./sidebar";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    degree: "Computer Science",
    bio: "Passionate about AI and building innovative solutions.",
    email: "alex.morgan@university.edu",
    location: "San Francisco, CA",
    image: "https://i.pravatar.cc/150?img=12",
  });

  const [skills, setSkills] = useState([
    "React", "Node.js", "Python", "Machine Learning",
    "UI/UX Design", "Docker", "AWS"
  ]);

  const [interests, setInterests] = useState([
    "AI & ML", "Web Dev", "Healthcare", "Sustainability"
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: URL.createObjectURL(file) });
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: "18vw",
          width: "calc(100% - 18vw)",
          padding: "30px",
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
                  <h2>{profile.name}</h2>
                  <p>{profile.degree}</p>
                  <p>{profile.bio}</p>
                  <p>📧 {profile.email}</p>
                  <p>📍 {profile.location}</p>
                </>
              )}
            </div>

            <button
              style={styles.editBtnLeft}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Events Count */}
        <div style={styles.card}>
          <h2>3</h2>
          <p>Events Participated</p>
        </div>

        {/* Skills */}
        <div style={styles.section}>
          <h3>💡 Skills</h3>
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
          <h3>⭐ Interests</h3>
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
    borderRadius: "16px",
    marginBottom: "25px",
    position: "relative",
  },
  banner: {
    height: "120px",
    background: "linear-gradient(90deg, #6366f1, #ec4899)",
    borderRadius: "16px 16px 0 0",
  },
  profileRow: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "16px",
    border: "4px solid white",
    marginTop: "-60px",
    objectFit: "cover",
  },
  uploadBtn: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editBtnLeft: {
    height: "40px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "60px",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    width: "260px",
    marginBottom: "20px",
  },
  section: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px",
  },
  tags: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  tag: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "500",
  },
  addBox: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
  },
  addInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};

export default StudentProfile;