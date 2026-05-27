import { useState, useEffect } from "react";
import { Building2, Lock, Bell, Save, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Sidebar from "./osidebar";

export default function OrganizerSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const [settings, setSettings] = useState({
    organizationName: "",
    email: "",
    contactNumber: "",
    website: "",
    bio: "",
    emailNotifications: { newRegistrations: true, eventReminders: true },
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "", newPassword: "", confirmPassword: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("organizerSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (e) =>
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePasswordChange = (e) =>
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match"); return;
    }
    alert("Password updated successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSave = () => {
    localStorage.setItem("organizerSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const navItems = [
    { id: "profile",       label: "Profile",       icon: <Building2 size={16} />, color: "#3b82f6" },
    { id: "security",      label: "Security",      icon: <Lock      size={16} />, color: "#8b5cf6" },
    { id: "notifications", label: "Notifications", icon: <Bell      size={16} />, color: "#f97316" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: 'Inter', Arial, sans-serif; }
        body { margin: 0; }

        .os-page {
          margin-left: 18%;
          width: 82%;
          min-height: 100vh;
          background: #f4f5fb;
          padding: 3%;
        }

        .os-page-title  { font-size: 2.8vh; font-weight: 800; color: #1e1b4b; margin: 0 0 0.5% 0; }
        .os-page-sub    { font-size: 1.5vh; color: #6b7280; margin: 0 0 3% 0; }

        .os-layout {
          display: grid;
          grid-template-columns: 22% 1fr;
          gap: 2%;
          align-items: start;
        }

        /* ── Left Nav ── */
        .os-nav {
          background: #fff;
          border-radius: 2vh;
          padding: 4%;
          border: 1px solid #e5e7eb;
          position: sticky;
          top: 3%;
          display: flex;
          flex-direction: column;
          gap: 1.5%;
        }
        .os-nav-label {
          font-size: 1.2vh;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2%;
          padding: 0 2%;
        }
        .os-nav-btn {
          display: flex;
          align-items: center;
          gap: 8%;
          padding: 3% 4%;
          border-radius: 1.4vh;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1.5vh;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }
        .os-nav-btn:hover  { background: #f3f4f6; }
        .os-nav-btn.active {
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: #fff;
          box-shadow: 0 0.5vh 1.5vh rgba(99,102,241,0.3);
        }
        .os-nav-btn.active svg { color: #fff !important; }

        /* ── Cards ── */
        .os-content { display: flex; flex-direction: column; gap: 2%; }

        .os-card {
          background: #fff;
          border-radius: 2vh;
          padding: 5%;
          border: 1px solid #e5e7eb;
          box-shadow: 0 0.2vh 0.8vh rgba(0,0,0,0.04);
        }

        .os-card-title {
          display: flex;
          align-items: center;
          gap: 3%;
          font-size: 1.8vh;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 4%;
          padding-bottom: 3%;
          border-bottom: 1px solid #f3f4f6;
        }
        .os-card-title-icon {
          width: 4.5vh;
          height: 4.5vh;
          border-radius: 1.2vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Field ── */
        .os-field { margin-bottom: 3%; }
        .os-field label {
          display: block;
          font-size: 1.3vh;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1.5%;
        }
        .os-field input,
        .os-field textarea {
          width: 100%;
          padding: 1.4% 2%;
          border-radius: 1.2vh;
          border: 1.5px solid #e5e7eb;
          font-size: 1.5vh;
          outline: none;
          background: #f9fafb;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
        }
        .os-field input:focus,
        .os-field textarea:focus {
          border-color: #818cf8;
          background: #fff;
          box-shadow: 0 0 0 0.3vh rgba(129,140,248,0.15);
        }
        .os-field .os-pw-wrap { position: relative; }
        .os-field .os-eye-btn {
          position: absolute;
          right: 3%;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
        }

        /* ── Two-col grid inside card ── */
        .os-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3%;
        }

        /* ── Button ── */
        .os-btn {
          display: flex;
          align-items: center;
          gap: 2%;
          padding: 1.3% 3%;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: #fff;
          border: none;
          border-radius: 1.2vh;
          font-size: 1.5vh;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 0.5vh 1.5vh rgba(99,102,241,0.3);
          transition: opacity 0.2s;
          width: fit-content;
          margin-top: 1%;
        }
        .os-btn:hover { opacity: 0.9; }

        /* ── Notification row ── */
        .os-notif-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5% 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .os-notif-row:last-child { border-bottom: none; }
        .os-notif-label { font-size: 1.5vh; font-weight: 500; color: #374151; }
        .os-notif-sub   { font-size: 1.3vh; color: #9ca3af; margin-top: 0.5%; }

        /* custom toggle */
        .os-toggle {
          position: relative;
          width: 4.5vh;
          height: 2.4vh;
          flex-shrink: 0;
        }
        .os-toggle input { opacity: 0; width: 0; height: 0; }
        .os-toggle-slider {
          position: absolute;
          inset: 0;
          border-radius: 99vh;
          background: #e5e7eb;
          cursor: pointer;
          transition: background 0.3s;
        }
        .os-toggle input:checked + .os-toggle-slider { background: linear-gradient(135deg, #6366f1, #9333ea); }
        .os-toggle-slider::before {
          content: "";
          position: absolute;
          width: 1.8vh;
          height: 1.8vh;
          border-radius: 50%;
          background: #fff;
          top: 50%;
          left: 4%;
          transform: translateY(-50%);
          transition: left 0.3s;
          box-shadow: 0 0.2vh 0.5vh rgba(0,0,0,0.15);
        }
        .os-toggle input:checked + .os-toggle-slider::before { left: calc(100% - 1.8vh - 4%); }

        /* ── Save bar ── */
        .os-save-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .os-save-bar span { font-size: 1.5vh; color: #6b7280; }
      `}</style>

      <Sidebar />

      <div className="os-page">
        <h1 className="os-page-title">Organizer Settings</h1>
        <p className="os-page-sub">Manage your organization profile and preferences</p>

        <div className="os-layout">

          {/* ── Left Nav ── */}
          <aside className="os-nav">
            <p className="os-nav-label">Settings</p>
            {navItems.map(({ id, label, icon, color }) => (
              <button
                key={id}
                className={`os-nav-btn ${activeSection === id ? "active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                <span style={{ color: activeSection === id ? "#fff" : color }}>{icon}</span>
                {label}
              </button>
            ))}
          </aside>

          {/* ── Right Content ── */}
          <div className="os-content">

            {/* PROFILE */}
            <section id="profile" className="os-card">
              <div className="os-card-title">
                <div className="os-card-title-icon" style={{ background: "#eff6ff" }}>
                  <Building2 size={18} color="#3b82f6" />
                </div>
                Organization Profile
              </div>

              <div className="os-two-col">
                <Field label="Organization Name" name="organizationName" value={settings.organizationName} onChange={handleChange} />
                <Field label="Email Address"      name="email"            value={settings.email}            onChange={handleChange} />
                <Field label="Contact Number"     name="contactNumber"    value={settings.contactNumber}    onChange={handleChange} />
                <Field label="Website"            name="website"          value={settings.website}          onChange={handleChange} />
              </div>

              <div className="os-field">
                <label>Description / Bio</label>
                <textarea name="bio" value={settings.bio} onChange={handleChange} rows={4}
                  placeholder="Tell participants about your organization..." />
              </div>
            </section>

            {/* SECURITY */}
            <section id="security" className="os-card">
              <div className="os-card-title">
                <div className="os-card-title-icon" style={{ background: "#f5f3ff" }}>
                  <Lock size={18} color="#8b5cf6" />
                </div>
                Security
              </div>

              <Field
                label="Current Password"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                showEye toggleEye={() => setShowPassword(!showPassword)}
                eyeOpen={showPassword}
              />
              <div className="os-two-col">
                <Field label="New Password"     name="newPassword"     type="password" value={passwordForm.newPassword}     onChange={handlePasswordChange} />
                <Field label="Confirm Password" name="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
              </div>

              <button className="os-btn" onClick={handleUpdatePassword}>
                <Lock size={14} /> Update Password
              </button>
            </section>

            {/* NOTIFICATIONS */}
            <section id="notifications" className="os-card">
              <div className="os-card-title">
                <div className="os-card-title-icon" style={{ background: "#fff7ed" }}>
                  <Bell size={18} color="#f97316" />
                </div>
                Email Notifications
              </div>

              {[
                { key: "newRegistrations", label: "New Registrations", sub: "Get notified when a student registers for your event" },
                { key: "eventReminders",   label: "Event Reminders",   sub: "Receive reminders before your events start" },
              ].map(({ key, label, sub }) => (
                <div className="os-notif-row" key={key}>
                  <div>
                    <p className="os-notif-label">{label}</p>
                    <p className="os-notif-sub">{sub}</p>
                  </div>
                  <label className="os-toggle">
                    <input type="checkbox"
                      checked={settings.emailNotifications[key]}
                      onChange={(e) => setSettings({
                        ...settings,
                        emailNotifications: { ...settings.emailNotifications, [key]: e.target.checked }
                      })}
                    />
                    <span className="os-toggle-slider" />
                  </label>
                </div>
              ))}
            </section>

            {/* SAVE */}
            <div className="os-card os-save-bar">
              <span>Make sure to save your changes before leaving</span>
              <button className="os-btn" onClick={handleSave}>
                {saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

/* ── Reusable Field ── */
function Field({ label, showEye, toggleEye, eyeOpen, ...props }) {
  return (
    <div className="os-field">
      <label>{label}</label>
      <div className={showEye ? "os-pw-wrap" : ""}>
        <input {...props} />
        {showEye && (
          <button type="button" className="os-eye-btn" onClick={toggleEye}>
            {eyeOpen ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}