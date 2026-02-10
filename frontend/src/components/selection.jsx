import React from "react";
import { FaGraduationCap, FaUsers, FaShieldAlt, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Selection() {
  const navigate = useNavigate();

  const containerStyle = {
    height: "100vh",
    width: "100%",
    padding: "3%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1vh",
    marginBottom: "2%",
  };

  const headerIconStyle = {
    fontSize: "3.2vh",
    color: "#2563eb",
  };

  const titleStyle = {
    fontSize: "4.5vh",
    fontWeight: "800",
    marginBottom: "1%",
  };

  const subtitleStyle = {
    fontSize: "2.1vh",
    color: "#475569",
    marginBottom: "3%",
    textAlign: "center",
  };

  const cardsContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "3%",
    padding: "1%",
  };

  const cardStyle = {
    width: "30%",
    height: "48vh",
    border: "0.35vh solid #1e293b",
    borderRadius: "2.3vh",
    padding: "3%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer", // ✅ clickable
  };

  const iconBoxStyle = {
    width: "70%",
    height: "30%",
    borderRadius: "2vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
  };

  const roleTitleStyle = {
    fontSize: "2.8vh",
    fontWeight: "800",
    marginBottom: "3%",
  };

  const roleDescStyle = {
    fontSize: "2.1vh",
    color: "#475569",
    lineHeight: "2.8vh",
  };

  const footerStyle = {
    marginTop: "2%",
    fontSize: "2vh",
    color: "#64748b",
  };

  return (
    <div style={containerStyle}>
      {/* Logo */}
      <div style={headerStyle}>
        <FaLink style={headerIconStyle} />
        <span style={{ fontSize: "3vh", fontWeight: "700" }}>
          Criss-Cross
        </span>
      </div>

      {/* Title */}
      <div style={titleStyle}>CHOOSE YOUR PATH</div>
      <div style={subtitleStyle}>
        Tell us how you want to explore on Criss-Cross
      </div>

      {/* Cards */}
      <div style={cardsContainerStyle}>
        {/* STUDENT */}
        <div
          style={cardStyle}
          onClick={() => navigate("/student-login")}
        >
          <div style={{ ...iconBoxStyle, backgroundColor: "#eefaff" }}>
            <FaGraduationCap size="7vh" color="#2563eb" />
          </div>
          <div style={roleTitleStyle}>STUDENT</div>
          <div style={roleDescStyle}>
            Discover and participate in hackathons
          </div>
        </div>

        {/* ORGANIZER */}
        <div style={cardStyle}>
          <div style={{ ...iconBoxStyle, backgroundColor: "#faf5ff" }}>
            <FaUsers size="7vh" color="#9333ea" />
          </div>
          <div style={roleTitleStyle}>ORGANIZER</div>
          <div style={roleDescStyle}>
            Create and manage hackathon events
          </div>
        </div>

        {/* ADMIN */}
        <div style={cardStyle}>
          <div style={{ ...iconBoxStyle, backgroundColor: "#eff6ff" }}>
            <FaShieldAlt size="7vh" color="#4f46e5" />
          </div>
          <div style={roleTitleStyle}>ADMIN</div>
          <div style={roleDescStyle}>
            Oversee platform and manage operations
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        Hackathon Discovery & Management Platform
      </div>
    </div>
  );
}
