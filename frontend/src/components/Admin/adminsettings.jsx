import React, { useState, useRef } from "react";
import {
  FaThLarge,
  FaUsers,
  FaCheckCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Sidebar from "./asidebar";   // ✅ Import Sidebar

const mainMenuItems = [
  { name: "Dashboard", icon: <FaThLarge /> },
  { name: "User Management", icon: <FaUsers /> },
  { name: "Event Approvals", icon: <FaCheckCircle /> },
  { name: "Settings", icon: <FaCog /> },
];

export default function AdminSettingsWithSidebar() {
  const [active, setActive] = useState("Dashboard");

  const accountRef = useRef(null);
  const securityRef = useRef(null);
  const emailRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{css}</style>

      <div className="layout">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="admin-settings-page">
          {/* HEADER */}
          <div className="page-header">
            <h1>Admin Settings</h1>
            <p>Manage platform settings and configurations</p>
          </div>

          <div className="settings-layout">
            {/* LEFT MENU */}
            <div className="settings-menu">
              <button onClick={() => scrollTo(accountRef)}>🛡️ Account</button>
              <button onClick={() => scrollTo(securityRef)}>🔒 Security</button>
              <button onClick={() => scrollTo(emailRef)}>
                🔔 Email Notifications
              </button>
            </div>

            {/* RIGHT CONTENT */}
            <div className="settings-content">
              {/* ACCOUNT */}
              <div className="card" ref={accountRef}>
                <h2>🛡️ Admin Account</h2>

                <div className="field">
                  <label>Admin Name</label>
                  <input type="text" value="Admin User" readOnly />
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <input type="email" value="admin@criss-cross.com" readOnly />
                </div>
              </div>

              {/* SECURITY */}
              <div className="card" ref={securityRef}>
                <h2>🔒 Security</h2>

                <div className="field">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>

                <div className="field">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>

                <div className="field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>

                <button className="primary-btn">Update Password</button>

                <div className="divider"></div>

                <h3>Two-Factor Authentication</h3>
                <p className="muted">
                  Add an extra layer of security to your admin account
                </p>

                <button className="secondary-btn">Enable 2FA</button>
              </div>

              {/* EMAIL */}
              <div className="card" ref={emailRef}>
                <h2>🔔 Email Notifications</h2>

                <div className="notify-row">
                  <div>
                    <strong>New Events</strong>
                    <p>Get notified when new events are submitted</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>

                <div className="notify-row">
                  <div>
                    <strong>Event Updates</strong>
                    <p>Receive updates on event modifications</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>

              {/* SAVE */}
              <div className="card save-card">
                <p>Make sure to save your changes before leaving</p>
                <button className="primary-btn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* CSS (ONLY PERCENTAGE USED) */

const css = `
.layout {
  display: flex;
  width: 100%;
  min-height: 100%;
}


/* MAIN PAGE */
.admin-settings-page {
  width: 82%;
  padding: 3%;
  background: #f9fafb;
  margin-left: 18vw; /* Account for fixed sidebar */
}

.page-header h1 {
  font-size: 180%;
}

.page-header p {
  color: #6b7280;
  margin-top: 1%;
}

.settings-layout {
  margin-top: 3%;
  display: flex;
  gap: 3%;
}

.settings-menu {
  width: 25%;
  background: white;
  padding: 3%;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  gap: 3%;
}

.settings-menu button {
  padding: 1.2vh 2vh;        /* Reduced height → better shape */
  border-radius: 999vh;      /* Perfect pill rounded corner */
  border: none;
  text-align: left;
  font-size: 1.6vh;
  cursor: pointer;
  background: #f3f4f6;
  transition: all 0.25s ease;
}

/* Active Button */
.settings-menu .active {
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  color: white;
  border-radius: 999vh;      /* Force perfect rounded */
}


.settings-content {
  width: 72%;
  display: flex;
  flex-direction: column;
  gap: 3%;
}

.card {
  background: white;
  padding: 4%;
  border-radius: 5%;
}

.card h2 {
  margin-bottom: 3%;
  font-size: 140%;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
}

.field label {
  font-size: 90%;
  margin-bottom: 2%;
}

.field input {
  padding: 1.3vh 1.5vh;
  border-radius: 1.5vh;
  border: 0.15vh solid #e5e7eb;
  outline: none;                 /* Removes ugly black focus */
  transition: all 0.25s ease;    /* Smooth focus animation */
}

/* Focus Style */
.field input:focus {
  border: 0.15vh solid #8b5cf6;  /* Purple border */
  box-shadow: 0 0 0 0.2vh rgba(139, 92, 246, 0.15); /* Soft glow */
}


.primary-btn {
  margin-top: 1%;
  padding: 0.8% 2%;   /* Reduced from big values */
  border-radius: 1.5vh;
  border: none;
  color: white;
  cursor: pointer;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  font-size: 1.6vh;
  width: fit-content;   /* Prevents full width stretch */
}

.secondary-btn {
  margin-top: 1%;
  padding: 0.7% 1.8%;
  border-radius: 1.5vh;
  border: none;
  background: #22c55e;
  color: white;
  cursor: pointer;
  font-size: 1.5vh;
  width: fit-content;
}

.divider {
  margin: 4% 0;
  height: 1%;
  background: #e5e7eb;
}

.notify-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
}

.notify-row p {
  font-size: 85%;
  color: #6b7280;
}

.save-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .admin-settings-page {
    width: 100%;
  }

  .settings-layout {
    flex-direction: column;
  }

  .settings-menu,
  .settings-content {
    width: 100%;
  }
}
`;
