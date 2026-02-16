import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Save,
  CheckCircle2
} from "lucide-react";
import Sidebar from "./sidebar";

export default function Studentsettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    password: "",
    emailNotifications: {
      newEvents: true,
      eventUpdates: true
    }
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const handleUpdatePassword = () => {
  //Verify current password
  console.log("Stored password:", settings.password);
  console.log("Entered password:", passwordForm.currentPassword);
  if (passwordForm.currentPassword !== settings.password) {
    alert("Current password is incorrect");
    return;
  }
  //Check new password match
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  //Save new password
  const updatedSettings = {
    ...settings,
    password: passwordForm.newPassword,
  };
  setSettings(updatedSettings);
  localStorage.setItem("studentSettings", JSON.stringify(updatedSettings));
  //Clear form
  setPasswordForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  alert("Password updated successfully!");
};


  useEffect(() => {
    const savedSettings = localStorage.getItem("studentSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setSettings((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSave = () => {
    localStorage.setItem("studentSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
};

  return (
    <>
    <style>{
      `html {
          scroll-behavior: smooth;
        }

        body {
          background: #f7f8fc;
          font-family: Inter, sans-serif;
          
        }

        .container {
          margin-left: 18vw;   /* SAME width as Sidebar */
          padding: 24px;
          min-height: 100%;
          background: #f7f8fc; 
          max-width: calc(100% - 18vw);
        }

        h1 {
          font-size: 26px;
          margin-bottom: 6px;
        }

        .subtitle {
          color: #6b7280;
        }

        .layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          margin-top: 24px;
          align-items: start;
        }

        /* Sidebar */
        .sidebar {
          background: #fff;
          border-radius: 16px;
          padding: 8px;
          border: 1px solid #e5e7eb;
          position: sticky;
          top: 24px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          color: #374151;
          text-decoration: none;
          transition: 0.2s;
        }

        .nav-link:hover {
          background: #f3f4f6;
        }

        .nav-link.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }

        /* Cards */
        .card {
          background: white;
          border-radius: 18px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 18px;
        }

        label {
          font-size: 14px;
          color: #374151;
          margin-bottom: 6px;
          display: block;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          align-items: center;
         
        }

        .btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 14px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }

        .notifications-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }

        .save-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }`
    }
    </style>
      <div>
        <Sidebar />
      </div>
       {/* Settings */}   
      <div className="container">
        <h1>Settings</h1>
        <p className="subtitle">Manage your account settings and preferences</p>

        <div className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <a href="#account" className="nav-link active">
              <User size={18} /> Account
            </a>
            <a href="#security" className="nav-link">
              <Lock size={18} /> Security
            </a>
            <a href="#notifications" className="nav-link">
              <Bell size={18} /> Email Notifications
            </a>
          </aside>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Account */}
            <section id="account" className="card">
              <div className="section-title">
                <User color="#3b82f6" /> Account Information
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="fullName"
                  value={settings.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email" name="email"
                  placeholder="email"
                  value={settings.email}
                  onChange={handleChange}
                />
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
                  <input type={showPassword ? "text" : "password"} placeholder="Password" name="currentPassword" value={passwordForm.currentPassword} 
                    onChange={handlePasswordChange} />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
              </div>
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input 
                  type="password"
                  placeholder="New password"
                  name="newPassword" 
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange} 
                />
              </div>

              <div className="input-group">
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                />
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
                <input
                  type="checkbox"
                  checked={settings.emailNotifications.newEvents}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: {
                        ...settings.emailNotifications,
                        newEvents: e.target.checked
                      }
                    })
                  }
                />
              </div>

              <div className="notifications-row">
                <span>Event Updates</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications.eventUpdates}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: {
                        ...settings.emailNotifications,
                        eventUpdates: e.target.checked
                      }
                    })
                  }
                />
              </div>
            </section>

            {/* Save */}
            <div className="card save-bar">
              <span className="subtitle">
                Make sure to save your changes before leaving
              </span>
              <button className="btn" onClick={handleSave}>
                {saved ? <CheckCircle2 /> : <Save />}
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

