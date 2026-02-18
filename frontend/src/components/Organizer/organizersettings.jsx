import { useState, useEffect } from "react";
import {
  Building2,
  Lock,
  Bell,
  Globe,
  Phone,
  Save,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import Sidebar from "./sidebar";

export default function Organizersettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    organizationName: "",
    email: "",
    contactNumber: "",
    website: "",
    bio: "",
    emailNotifications: {
      newRegistrations: true,
      eventReminders: true
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("organizerSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSave = () => {
    localStorage.setItem("organizerSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: "18vw", padding: 24, background: "#f7f8fc", minHeight: "100vh" }}>
        <h1 style={{ fontSize: 26 }}>Organizer Settings</h1>
        <p style={{ color: "#6b7280" }}>
          Manage your organization profile and event preferences
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, marginTop: 24 }}>
          
          {/* Left Navigation */}
          <aside style={{ background: "#fff", borderRadius: 16, padding: 16 }}>
            <a href="#profile" style={navStyle}> <Building2 size={18}/> Profile</a>
            <a href="#security" style={navStyle}> <Lock size={18}/> Security</a>
            <a href="#notifications" style={navStyle}> <Bell size={18}/> Notifications</a>
          </aside>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* PROFILE */}
            <section id="profile" style={cardStyle}>
              <div style={titleStyle}>
                <Building2 color="#3b82f6" /> Organization Profile
              </div>

              <Input label="Organization Name" name="organizationName" value={settings.organizationName} onChange={handleChange}/>
              <Input label="Email" name="email" value={settings.email} onChange={handleChange}/>
              <Input label="Contact Number" name="contactNumber" value={settings.contactNumber} onChange={handleChange}/>
              <Input label="Website" name="website" value={settings.website} onChange={handleChange}/>

              <div style={{ marginBottom: 16 }}>
                <label>Description / Bio</label>
                <textarea
                  name="bio"
                  value={settings.bio}
                  onChange={handleChange}
                  style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}
                  rows={4}
                />
              </div>
            </section>

            {/* SECURITY */}
            <section id="security" style={cardStyle}>
              <div style={titleStyle}>
                <Lock color="#8b5cf6" /> Security
              </div>

              <Input
                label="Current Password"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                showEye
                toggleEye={() => setShowPassword(!showPassword)}
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />

              <button style={buttonStyle} onClick={handleUpdatePassword}>
                Update Password
              </button>
            </section>

            {/* NOTIFICATIONS */}
            <section id="notifications" style={cardStyle}>
              <div style={titleStyle}>
                <Bell color="#f97316" /> Notifications
              </div>

              <Checkbox
                label="New Registrations"
                checked={settings.emailNotifications.newRegistrations}
                onChange={(val) =>
                  setSettings({
                    ...settings,
                    emailNotifications: {
                      ...settings.emailNotifications,
                      newRegistrations: val
                    }
                  })
                }
              />

              <Checkbox
                label="Event Reminders"
                checked={settings.emailNotifications.eventReminders}
                onChange={(val) =>
                  setSettings({
                    ...settings,
                    emailNotifications: {
                      ...settings.emailNotifications,
                      eventReminders: val
                    }
                  })
                }
              />
            </section>

            {/* SAVE */}
            <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#6b7280" }}>
                Save your changes before leaving
              </span>
              <button style={buttonStyle} onClick={handleSave}>
                {saved ? <CheckCircle2 size={18}/> : <Save size={18}/>}
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Small Reusable Components ---------- */

const navStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: 12,
  borderRadius: 12,
  textDecoration: "none",
  color: "#374151"
};

const cardStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 16,
  border: "1px solid #e5e7eb"
};

const titleStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
  fontSize: 18
};

const buttonStyle = {
  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 12,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8
};

function Input({ label, showEye, toggleEye, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          {...props}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid #e5e7eb"
          }}
        />
        {showEye && (
          <button
            type="button"
            onClick={toggleEye}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            <Eye size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
}
