import { useState, useEffect } from "react";
import { User, Lock, Bell, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import Sidebar from "../Student/sidebar";

export default function Studentsettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("account");

  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    password: "",
    emailNotifications: { newEvents: true, eventUpdates: true }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["account", "security", "notifications"];
      for (let id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("account");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedSettings = localStorage.getItem("studentSettings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwordForm.currentPassword !== settings.password) {
      alert("Current password is incorrect");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const updatedSettings = { ...settings, password: passwordForm.newPassword };
    setSettings(updatedSettings);
    localStorage.setItem("studentSettings", JSON.stringify(updatedSettings));
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password updated successfully!");
  };

  const handleSave = () => {
    localStorage.setItem("studentSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #f7f8fc; font-family: Inter, sans-serif; }

        .container {
          margin-left: 18%;
          padding: 2.5%;
          min-height: 100vh;
          background: #f7f8fc;
          max-width: 82%;
          box-sizing: border-box;
        }

        h1 { font-size: 3vh; margin-bottom: 0.8%; }
        .subtitle { color: #6b7280; font-size: 1.5vh; }

        .layout {
          display: grid;
          grid-template-columns: 22% 1fr;
          gap: 2.5%;
          margin-top: 2.5%;
          align-items: start;
        }

        .settings-nav {
          background: #fff;
          border-radius: 2vh;
          padding: 1%;
          border: 1px solid #e5e7eb;
          position: sticky;
          top: 2.5%;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4%;
          padding: 1.5% 2%;
          border-radius: 1.8vh;
          color: #374151;
          text-decoration: none;
          cursor: pointer;
          transition: 0.2s;
          border: none;
          background: none;
          width: 100%;
          font-size: 1.5vh;
        }

        .nav-link:hover { background: #f3f4f6; }

        .nav-link.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }

        .card {
          background: white;
          border-radius: 2vh;
          padding: 3%;
          border: 1px solid #e5e7eb;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 2%;
          margin-bottom: 2.5%;
          font-size: 2vh;
          font-weight: 600;
        }

        label {
          font-size: 1.4vh;
          color: #374151;
          margin-bottom: 0.8%;
          display: block;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 1.2% 1.5%;
          border-radius: 1.5vh;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          box-sizing: border-box;
          font-size: 1.4vh;
        }

        .input-group { margin-bottom: 2%; }

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .eye-btn {
          position: absolute;
          right: 2%;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          display: flex;
          align-items: center;
        }

        .btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 1.2% 2%;
          border-radius: 1.8vh;
          cursor: pointer;
          font-size: 1.4vh;
          display: flex;
          align-items: center;
          gap: 2%;
          margin-top: 2%;
        }

        .notifications-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2% 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 1.4vh;
        }

        .notifications-row:last-child { border-bottom: none; }

        .save-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .save-bar .btn { margin-top: 0; }

        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr; }
          .container { margin-left: 0; max-width: 100%; }
        }
      `}</style>

      <Sidebar />

      <div className="container">
        <h1>Settings</h1>
        <p className="subtitle">Manage your account settings and preferences</p>

        <div className="layout">
          {/* Internal Settings Nav */}
          <aside className="settings-nav">
            {[
              { id: "account",       label: "Account",             Icon: User, color: "#3b82f6" },
              { id: "security",      label: "Security",            Icon: Lock, color: "#8b5cf6" },
              { id: "notifications", label: "Email Notifications", Icon: Bell, color: "#f97316" },
            ].map(({ id, label, Icon, color }) => (
              <button
                key={id}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                <Icon size={18} color={activeSection === id ? "white" : color} />
                {label}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5%" }}>

            {/* Account */}
            <section id="account" className="card">
              <div className="section-title">
                <User color="#3b82f6" /> Account Information
              </div>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" name="fullName"
                  value={settings.fullName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" name="email"
                  value={settings.email} onChange={handleChange} />
              </div>
            </section>

            {/* Security */}
            <section id="security" className="card">
              <div className="section-title">
                <Lock color="#8b5cf6" /> Security
              </div>
              <div className="input-group">
                <label>Current Password</label>
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} placeholder="Current password"
                    name="currentPassword" value={passwordForm.currentPassword}
                    onChange={handlePasswordChange} />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input type="password" placeholder="New password" name="newPassword"
                  value={passwordForm.newPassword} onChange={handlePasswordChange} />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm password" name="confirmPassword"
                  value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
              </div>
              <button className="btn" onClick={handleUpdatePassword}>Update Password</button>
            </section>

            {/* Notifications */}
            <section id="notifications" className="card">
              <div className="section-title">
                <Bell color="#f97316" /> Email Notifications
              </div>
              <div className="notifications-row">
                <span>New Events</span>
                <input type="checkbox" checked={settings.emailNotifications.newEvents}
                  onChange={(e) => setSettings({ ...settings,
                    emailNotifications: { ...settings.emailNotifications, newEvents: e.target.checked }
                  })} />
              </div>
              <div className="notifications-row">
                <span>Event Updates</span>
                <input type="checkbox" checked={settings.emailNotifications.eventUpdates}
                  onChange={(e) => setSettings({ ...settings,
                    emailNotifications: { ...settings.emailNotifications, eventUpdates: e.target.checked }
                  })} />
              </div>
            </section>

            {/* Save */}
            <div className="card save-bar">
              <span className="subtitle">Make sure to save your changes before leaving</span>
              <button className="btn" onClick={handleSave}>
                {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}