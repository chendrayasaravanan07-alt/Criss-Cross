import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaCheckCircle, FaRocket } from "react-icons/fa";
import Sidebar from "./sidebar.jsx";

export default function Studentdash() {
  const navigate = useNavigate();

  const [activeEvents]    = useState(24);
  const [completedEvents] = useState(3);
  const [registeredEvents]= useState(8);

  const recommendedData = [
    { title: "Web3 Hackathon",      location: "Virtual",          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
    { title: "HealthTech Challenge", location: "Boston, MA",       img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
    { title: "AI Challenge",         location: "San Francisco, CA",img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
  ];

  const progressData = [
    { day: "Mon", height: 50 },
    { day: "Tue", height: 80 },
    { day: "Wed", height: 40 },
    { day: "Thu", height: 90 },
    { day: "Fri", height: 70 },
    { day: "Sat", height: 100 },
    { day: "Sun", height: 60 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebarWrapper}>
        <Sidebar />
      </div>

      <div style={styles.contentWrapper}>
        <DashboardContent
          activeEvents={activeEvents}
          completedEvents={completedEvents}
          registeredEvents={registeredEvents}
          recommendedData={recommendedData}
          progressData={progressData}
          navigate={navigate}
        />
      </div>
    </div>
  );
}

function DashboardContent({ activeEvents, completedEvents, registeredEvents, recommendedData, progressData, navigate }) {
  return (
    <>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.welcome}>✨ Welcome back</p>
          <h1 style={styles.heading}>Hey Alex! 👋</h1>
          <p style={{ fontSize: "1.6vh" }}>Ready to explore exciting hackathons?</p>

          <div style={styles.heroStats}>
            <div style={styles.heroBox}>
              <FaTrophy />
              <div>
                <p style={styles.heroLabel}>Active Events</p>
                <h2 style={{ fontSize: "2.4vh", margin: 0 }}>{activeEvents}</h2>
              </div>
            </div>
            <div style={styles.heroBox}>
              <FaCheckCircle />
              <div>
                <p style={styles.heroLabel}>Completed</p>
                <h2 style={{ fontSize: "2.4vh", margin: 0 }}>{completedEvents}</h2>
              </div>
            </div>
            <div style={styles.heroBox}>
              📅
              <div>
                <p style={styles.heroLabel}>Registered</p>
                <h2 style={{ fontSize: "2.4vh", margin: 0 }}>{registeredEvents}</h2>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.heroSide}>
          <FaRocket style={{ fontSize: "3vh" }} />
          <p style={{ fontSize: "1.6vh", margin: 0 }}>Your Next</p>
          <strong style={{ fontSize: "1.8vh" }}>Adventure</strong>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        {[
          { label: "Active Events",  value: activeEvents,    color: "#6366f1", icon: "🏆" },
          { label: "Registered",     value: registeredEvents, color: "#22c55e", icon: "📅" },
          { label: "Bookmarks",      value: 15,              color: "#f97316", icon: "⭐" },
        ].map((item, i) => (
          <div key={i} style={styles.statCard}>
            <div>
              <p style={styles.statLabel}>{item.label}</p>
              <h2 style={styles.statValue}>{item.value}</h2>
            </div>
            <div style={{ ...styles.statIcon, backgroundColor: item.color }}>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* RECOMMENDED */}
      <div style={styles.recommendedMain}>
        <div style={styles.recommendedHeader}>
          <h2 style={styles.recommendedTitle}>Recommended For You</h2>
          <span onClick={() => navigate("/student/discover")} style={styles.seeMore}>See more →</span>
        </div>

        <div style={styles.horizontalScroll}>
          {recommendedData.map((item, index) => (
            <div key={index} onClick={() => navigate("/student/discover")} style={styles.recommendCard}>
              <img src={item.img} alt={item.title} style={styles.recommendImage} />
              <div style={styles.recommendBody}>
                <h3 style={{ fontSize: "1.4vh", margin: "0 0 1% 0" }}>{item.title}</h3>
                <p style={styles.recommendLocation}>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div style={styles.progressCard}>
        <div style={styles.progressHeader}>
          <div>
            <h3 style={styles.progressTitle}>Your Progress</h3>
            <span style={styles.progressSubtitle}>Events participated over time</span>
          </div>
          <span style={styles.progressLink}>View details →</span>
        </div>

        <div style={styles.progressGraph}>
          {progressData.map((item, index) => (
            <div key={index} style={styles.progressBarWrap}>
              <div style={{ ...styles.progressBar, height: `${item.height * 0.2}vh` }} />
              <span style={styles.progressDay}>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── STYLES ──
const styles = {
  // Layout
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",           // ✅ vh
    backgroundColor: "#f3f4f6",
  },
  sidebarWrapper: {
    position: "fixed",
    left: 0, top: 0, bottom: 0,
    width: "18vw",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
    zIndex: 10,
  },
  contentWrapper: {
    marginLeft: "18vw",           // ✅ vw
    width: "calc(100% - 18vw)",   // ✅ %
    padding: "3%",                // ✅ %
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "2.5%",                  // ✅ %
  },

  // Hero
  hero: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
    color: "#fff",
    borderRadius: "2vh",          // ✅ vh
    padding: "3%",                // ✅ %
    gap: "2%",                    // ✅ %
  },
  heroContent: { flex: "1 1 40%" },
  heroSide: {
    minWidth: "15%",              // ✅ %
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "2%",                // ✅ %
    borderRadius: "1.6vh",        // ✅ vh
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1%",                    // ✅ %
  },
  welcome: { fontSize: "1.4vh", opacity: 0.9, margin: 0 },  // ✅ vh
  heading: { fontSize: "2.8vh", margin: "0.5% 0" },          // ✅ vh + %
  heroStats: { display: "flex", gap: "2%", marginTop: "2%" }, // ✅ %
  heroBox: {
    display: "flex",
    alignItems: "center",
    gap: "2%",                    // ✅ %
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "2%",                // ✅ %
    borderRadius: "1.2vh",        // ✅ vh
  },
  heroLabel: { fontSize: "1.2vh", margin: 0 },               // ✅ vh

  // Stats
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(25%, 1fr))", // ✅ %
    gap: "2%",                    // ✅ %
    marginTop: "2%",              // ✅ %
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "1.6vh",        // ✅ vh
    padding: "4% 5%",             // ✅ %
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  statLabel: { fontSize: "1.4vh", color: "#6b7280", margin: 0 }, // ✅ vh
  statValue: { fontSize: "2.4vh", fontWeight: "bold", marginTop: "1%" }, // ✅ vh + %
  statIcon: {
    width: "5vh",                 // ✅ vh
    height: "5vh",                // ✅ vh
    borderRadius: "1.2vh",        // ✅ vh
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "2vh",              // ✅ vh
  },

  // Recommended
  recommendedMain: {
    backgroundColor: "#ffffff",
    borderRadius: "1.6vh",        // ✅ vh
    padding: "3%",                // ✅ %
    width: "100%",                // ✅ %
    overflow: "hidden",
    boxSizing: "border-box",
    marginTop: "2%",              // ✅ %
  },
  recommendedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%",           // ✅ %
  },
  recommendedTitle: { fontSize: "1.8vh", fontWeight: 700, margin: 0 }, // ✅ vh
  seeMore: { fontSize: "1.4vh", color: "#6366f1", cursor: "pointer" }, // ✅ vh
  horizontalScroll: {
    display: "flex",
    gap: "2%",                    // ✅ %
    overflowX: "auto",
    overflowY: "hidden",
    height: "18vh",               // ✅ vh
    paddingBottom: "1%",          // ✅ %
    scrollbarWidth: "none",
  },
  recommendCard: {
    minWidth: "18%",              // ✅ %
    maxWidth: "18%",              // ✅ %
    height: "100%",               // ✅ %
    borderRadius: "1.2vh",        // ✅ vh
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    flex: "0 0 auto",
  },
  recommendImage: { width: "100%", height: "65%", objectFit: "cover" }, // ✅ %
  recommendBody: { padding: "4% 5%" },                                   // ✅ %
  recommendLocation: { fontSize: "1.2vh", color: "#6b7280", marginTop: "1%" }, // ✅ vh + %

  // Progress
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: "1.6vh",        // ✅ vh
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    padding: "3%",                // ✅ %
    marginTop: "2%",              // ✅ %
    minHeight: "30vh",            // ✅ vh
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",           // ✅ %
  },
  progressTitle: { fontSize: "1.8vh", fontWeight: "600", margin: 0 },    // ✅ vh
  progressSubtitle: { display: "block", fontSize: "1.4vh", color: "#6b7280", marginTop: "1%" }, // ✅ vh + %
  progressLink: { fontSize: "1.4vh", color: "#6366f1", cursor: "pointer" }, // ✅ vh
  progressGraph: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "2%",                    // ✅ %
    height: "20vh",               // ✅ vh
    width: "100%",                // ✅ %
    overflow: "hidden",
  },
  progressBarWrap: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
  progressBar: {
    width: "60%",                 // ✅ %
    borderRadius: "0.6vh",        // ✅ vh
    background: "linear-gradient(to top, #6366f1, #8b5cf6)",
  },
  progressDay: { fontSize: "1.2vh", marginTop: "1%", color: "#6b7280" }, // ✅ vh + %
};