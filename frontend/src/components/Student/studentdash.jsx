import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTrophy,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import Sidebar from "./sidebar.jsx";

export default function Studentdash() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState("Dashboard"); // default page

  const [activeEvents] = useState(24);
  const [completedEvents] = useState(3);
  const [registeredEvents] = useState(8);

  // Example recommended data
  const recommendedData = [
    {
      title: "Web3 Hackathon",
      location: "Virtual",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      title: "HealthTech Challenge",
      location: "Boston, MA",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
    {
      title: "AI Challenge",
      location: "San Francisco, CA",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
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
      {/* Sidebar - fixed */}
      <div style={styles.sidebarWrapper}>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main content */}
      <div style={styles.contentWrapper}>
        {activePage === "Dashboard" && (
          <DashboardContent
            activeEvents={activeEvents}
            completedEvents={completedEvents}
            registeredEvents={registeredEvents}
            recommendedData={recommendedData}
            progressData={progressData}
            navigate={navigate}
          />
        )}
        {activePage === "Discover" && <Discover />}
        {activePage === "My Events" && <MyEvents />}
        {activePage === "Bookmarked" && <Bookmarked />}
        {activePage === "Notifications" && <Notifications />}
        {activePage === "Profile" && <Profile />}
        {activePage === "Settings" && <Settings />}
      </div>
    </div>
  );
}

// Internal component for Dashboard content
function DashboardContent({
  activeEvents,
  completedEvents,
  registeredEvents,
  recommendedData,
  progressData,
  navigate,
}) {
  return (
    <>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.welcome}>✨ Welcome back</p>
          <h1 style={styles.heading}>Hey Alex! 👋</h1>
          <p>Ready to explore exciting hackathons?</p>

          <div style={styles.heroStats}>
            <div style={styles.heroBox}>
              <FaTrophy />
              <div>
                <p style={styles.heroLabel}>Active Events</p>
                <h2>{activeEvents}</h2>
              </div>
            </div>

            <div style={styles.heroBox}>
              <FaCheckCircle />
              <div>
                <p style={styles.heroLabel}>Completed</p>
                <h2>{completedEvents}</h2>
              </div>
            </div>

            <div style={styles.heroBox}>
              📅
              <div>
                <p style={styles.heroLabel}>Registered</p>
                <h2>{registeredEvents}</h2>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.heroSide}>
          <FaRocket />
          <p>Your Next</p>
          <strong>Adventure</strong>
        </div>
      </div>

      {/* STATS SECTION */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div>
            <p style={styles.statLabel}>Active Events</p>
            <h2 style={styles.statValue}>{activeEvents}</h2>
          </div>
          <div style={{ ...styles.statIcon, backgroundColor: "#6366f1" }}>🏆</div>
        </div>

        <div style={styles.statCard}>
          <div>
            <p style={styles.statLabel}>Registered</p>
            <h2 style={styles.statValue}>{registeredEvents}</h2>
          </div>
          <div style={{ ...styles.statIcon, backgroundColor: "#22c55e" }}>📅</div>
        </div>

        <div style={styles.statCard}>
          <div>
            <p style={styles.statLabel}>Bookmarks</p>
            <h2 style={styles.statValue}>15</h2>
          </div>
          <div style={{ ...styles.statIcon, backgroundColor: "#f97316" }}>⭐</div>
        </div>
      </div>

      {/* RECOMMENDED + PROGRESS */}
      <div style={styles.recommendedGrid}>
        <div style={styles.recommendedMain}>
          {/* Recommended */}
          <div style={styles.recommendedCard}>
            <div style={styles.recommendedHeader}>
              <h2 style={styles.recommendedTitle}>Recommended For You</h2>
              <span
                onClick={() => navigate("/recommended")}
                style={styles.seeMore}
              >
                See more →
              </span>
            </div>

            <div style={styles.horizontalScroll}>
              {recommendedData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/recommended")}
                  style={styles.recommendCard}
                >
                  <img src={item.img} alt={item.title} style={styles.recommendImage} />
                  <div style={styles.recommendBody}>
                    <h3>{item.title}</h3>
                    <p style={styles.recommendLocation}>{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <h3 style={styles.progressTitle}>
                Your Progress
                <span style={styles.progressSubtitle}>
                  Events participated over time
                </span>
              </h3>
              <span style={styles.progressLink}>View details →</span>
            </div>

            <div style={styles.progressGraph}>
              {progressData.map((item, index) => (
                <div key={index} style={styles.progressBarWrap}>
                  <div
                    style={{
                      ...styles.progressBar,
                      height: `${item.height}px`,
                    }}
                  />
                  <span style={styles.progressDay}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ================== STYLES ==================
const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },
  sidebarWrapper: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: "18vw",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
    zIndex: 10,
  },
  contentWrapper: {
    marginLeft: "18vw",
    width: "calc(100% - 18vw)",
    padding: "32px",
    boxSizing: "border-box",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  hero: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
    color: "#fff",
    borderRadius: "20px",
    padding: "32px",
    gap: "24px",
  },
  heroContent: { flex: "1 1 300px" },
  heroSide: {
    minWidth: "200px",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "20px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },
  welcome: { fontSize: "14px", opacity: 0.9 },
  heading: { fontSize: "28px", margin: "6px 0" },
  heroStats: { display: "flex", gap: "16px", marginTop: "16px" },
  heroBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "12px",
    borderRadius: "12px",
  },
  heroLabel: { fontSize: "12px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "24px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  statLabel: { fontSize: "14px", color: "#6b7280" },
  statValue: { fontSize: "24px", fontWeight: "bold", marginTop: "4px" },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "20px",
  },
  recommendedGrid: { display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" },
  recommendedMain: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    maxWidth: "100%",
    overflow: "hidden",
    flex: "1 1 700px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  recommendedCard: { display: "flex", flexDirection: "column", gap: "16px" },
  recommendedHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  recommendCard: {
    minWidth: "220px",
    maxWidth: "220px",
    height: "155px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    flex: "0 0 auto",
    flexShrink: 0,
  },
  recommendImage: { width: "100%", height: "100px", objectFit: "cover" },
  recommendBody: { padding: "8px" },
  recommendLocation: { fontSize: "12px", color: "#6b7280", marginTop: "4px" },
  horizontalScroll: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    overflowY: "hidden",
    height: "160px",
    paddingBottom: "8px",
    scrollbarWidth: "none",
  },
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    padding: "24px",
    marginTop: "40px",
    minHeight: "260px",
  },
  progressHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  progressTitle: { fontSize: "18px", fontWeight: "600" },
  progressSubtitle: { display: "block", fontSize: "14px", color: "#6b7280", marginTop: "4px" },
  progressLink: { fontSize: "14px", color: "#6366f1", cursor: "pointer" },
  progressGraph: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", height: "200px", width: "100%", overflow: "hidden" },
  progressBarWrap: { display: "flex", flexDirection: "column", alignItems: "center" },
  progressBar: { width: "48px", borderRadius: "6px", background: "linear-gradient(to top, #6366f1, #8b5cf6)" },
  progressDay: { fontSize: "12px", marginTop: "8px", color: "#6b7280" },
  seeMore: { fontSize: "14px", color: "#6366f1", cursor: "pointer" },
};
