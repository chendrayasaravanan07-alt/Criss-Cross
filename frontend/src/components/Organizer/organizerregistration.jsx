import React, { useState } from "react";
import {
  FaLink, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaUser, FaBuilding, FaPhone, FaGlobe, FaCheckCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const STEPS = ["Account", "Organization", "Focus Areas"];

const EVENT_TYPES = [
  "Hackathons", "Coding Contests", "Design Sprints", "AI/ML Challenges",
  "Ideathons", "Case Studies", "Open Source Jams", "Game Jams",
  "Startup Pitches", "Workshops", "Bootcamps", "CTF Challenges"
];

const DOMAIN_OPTIONS = [
  "Technology", "Healthcare", "FinTech", "EdTech",
  "Sustainability", "Social Impact", "Robotics", "Cybersecurity",
  "Blockchain", "AR/VR", "Space Tech", "Agriculture"
];

export default function OrganizerRegistration() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [form, setForm] = useState({
    email: "", password: "", confirm: "",
    name: "", organization: "", role: "", phone: "", website: "", bio: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/organizer/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
        organization: form.organization,
        role: form.role,
        phone: form.phone,
        website: form.website,
        bio: form.bio,
        eventTypes: selectedTypes,
        domains: selectedDomains,
      }
    );

    localStorage.setItem(
      "organizerToken",
      response.data.token
    );

    localStorage.setItem(
      "organizer",
      JSON.stringify(response.data.organizer)
    );

    alert("Organizer Registered Successfully");

    navigate("/organizer/dashboard");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

  const toggleType = (t) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleDomain = (d) =>
    setSelectedDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const isStep0Valid =
    form.email && form.password && form.confirm && form.password === form.confirm;
  const isStep1Valid = form.name && form.organization && form.role;

  const canNext =
    (step === 0 && isStep0Valid) ||
    (step === 1 && isStep1Valid) ||
    step === 2;

  return (
    <div style={s.page}>
      <div style={s.blob1} />
      <div style={s.blob2} />

      <div style={s.card}>
        {/* Header */}
        <div style={s.logoRow}>
          <div style={s.logoIcon}><FaLink /></div>
          <div>
            <div style={s.logoTitle}>Criss-Cross</div>
            <div style={s.logoSub}>Organizer Portal</div>
          </div>
        </div>

        <h2 style={s.heading}>Become an Organizer</h2>
        <p style={s.subheading}>Host hackathons and connect with talented students</p>

        {/* Note Box */}
        <div style={s.noteBox}>
          <strong>📌 Note:</strong> Please use your official college / organization email to register.
        </div>

        {/* Step Indicator */}
        <div style={s.stepRow}>
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div style={s.stepItem}>
                <div style={{
                  ...s.stepCircle,
                  background: i <= step
                    ? "linear-gradient(135deg, #6366f1, #9333ea)"
                    : "#e5e7eb",
                  color: i <= step ? "#fff" : "#9ca3af",
                  boxShadow: i === step ? "0 0 0 4px rgba(99,102,241,0.2)" : "none",
                  transform: i === step ? "scale(1.15)" : "scale(1)",
                  transition: "all 0.3s ease",
                }}>
                  {i < step ? <FaCheckCircle size={14} /> : i + 1}
                </div>
                <span style={{
                  ...s.stepLabel,
                  color: i <= step ? "#6366f1" : "#9ca3af",
                  fontWeight: i === step ? "700" : "500",
                }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  ...s.stepLine,
                  background: i < step
                    ? "linear-gradient(to right, #6366f1, #9333ea)"
                    : "#e5e7eb",
                  transition: "background 0.4s ease",
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 0: Account ── */}
        {step === 0 && (
          <div style={s.formSection}>
            <InputField
              label="Official Email Address"
              icon={<FaEnvelope color="#9ca3af" />}
              type="email" name="email" value={form.email}
              placeholder="organizer@company.com"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              icon={<FaLock color="#9ca3af" />}
              type={showPassword ? "text" : "password"}
              name="password" value={form.password}
              placeholder="Min. 8 characters"
              onChange={handleChange}
              suffix={
                <span style={s.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
            <InputField
              label="Confirm Password"
              icon={<FaLock color="#9ca3af" />}
              type={showConfirm ? "text" : "password"}
              name="confirm" value={form.confirm}
              placeholder="Re-enter your password"
              onChange={handleChange}
              error={form.confirm && form.password !== form.confirm ? "Passwords don't match" : ""}
              suffix={
                <span style={s.eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </div>
        )}

        {/* ── STEP 1: Organization ── */}
        {step === 1 && (
          <div style={s.formSection}>
            <InputField
              label="Full Name"
              icon={<FaUser color="#9ca3af" />}
              type="text" name="name" value={form.name}
              placeholder="John Smith"
              onChange={handleChange}
            />
            <InputField
              label="Organization / College Name"
              icon={<FaBuilding color="#9ca3af" />}
              type="text" name="organization" value={form.organization}
              placeholder="e.g. Tech Events Co., IIT Madras"
              onChange={handleChange}
            />
            <InputField
              label="Your Role"
              icon={<span style={{ fontSize: 14, color: "#9ca3af" }}>💼</span>}
              type="text" name="role" value={form.role}
              placeholder="e.g. Event Coordinator, Club President"
              onChange={handleChange}
            />
            <InputField
              label="Phone Number"
              icon={<FaPhone color="#9ca3af" />}
              type="tel" name="phone" value={form.phone}
              placeholder="+91 9876543210"
              onChange={handleChange}
            />
            <InputField
              label="Website / LinkedIn"
              icon={<FaGlobe color="#9ca3af" />}
              type="text" name="website" value={form.website}
              placeholder="https://yourorg.com"
              onChange={handleChange}
            />
            <label style={s.label}>
              About Your Organization{" "}
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              name="bio" value={form.bio} onChange={handleChange}
              placeholder="Briefly describe your organization and the kind of events you host..."
              style={s.textarea}
            />
          </div>
        )}

        {/* ── STEP 2: Focus Areas ── */}
        {step === 2 && (
          <div style={s.formSection}>
            <div style={s.chipSection}>
              <label style={s.label}>
                🎯 Event Types You Host{" "}
                <span style={s.hint}>({selectedTypes.length} selected)</span>
              </label>
              <div style={s.chipGrid}>
                {EVENT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => toggleType(type)}
                    style={{
                      ...s.chip,
                      background: selectedTypes.includes(type)
                        ? "linear-gradient(135deg, #6366f1, #9333ea)"
                        : "#f0f0f8",
                      color: selectedTypes.includes(type) ? "#fff" : "#4b5563",
                      borderColor: selectedTypes.includes(type) ? "transparent" : "#e5e7eb",
                      transform: selectedTypes.includes(type) ? "scale(1.05)" : "scale(1)",
                      boxShadow: selectedTypes.includes(type)
                        ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
                    }}
                  >{type}</button>
                ))}
              </div>
            </div>

            <div style={{ ...s.chipSection, marginTop: 24 }}>
              <label style={s.label}>
                🌐 Domains You Focus On{" "}
                <span style={s.hint}>({selectedDomains.length} selected)</span>
              </label>
              <div style={s.chipGrid}>
                {DOMAIN_OPTIONS.map((domain) => (
                  <button
                    type="button"
                    key={domain}
                    onClick={() => toggleDomain(domain)}
                    style={{
                      ...s.chip,
                      background: selectedDomains.includes(domain)
                        ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
                        : "#f0f0f8",
                      color: selectedDomains.includes(domain) ? "#fff" : "#4b5563",
                      borderColor: selectedDomains.includes(domain) ? "transparent" : "#e5e7eb",
                      transform: selectedDomains.includes(domain) ? "scale(1.05)" : "scale(1)",
                      boxShadow: selectedDomains.includes(domain)
                        ? "0 4px 12px rgba(14,165,233,0.3)" : "none",
                    }}
                  >{domain}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={s.navRow}>
          {step > 0 && (
            <button style={s.backBtn} onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}

          {step < 2 ? (
            <button
              style={{
                ...s.nextBtn,
                opacity: canNext ? 1 : 0.5,
                cursor: canNext ? "pointer" : "not-allowed",
                marginLeft: step > 0 ? 0 : "auto",
              }}
              onClick={() => canNext && setStep(step + 1)}
            >
              Continue →
            </button>
          ) : (
            <button
  style={{
    ...s.nextBtn,
    width: "100%"
  }}
  onClick={handleRegister}
>
  🚀 Create Organizer Account
</button>
          )}
        </div>

        {/* Footer */}
        <p style={s.footer}>
          Already have an account?{" "}
          <Link
            to="/organizer-login"
            style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ── Reusable Input Field ── */
function InputField({ label, icon, type, name, value, placeholder, onChange, suffix, error }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={s.label}>{label}</label>
      <div style={{
        ...s.inputWrap,
        borderColor: error ? "#f87171" : "#e5e7eb",
        boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : "none",
      }}>
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
        <input
          type={type} name={name} value={value}
          placeholder={placeholder} onChange={onChange}
          style={s.input}
        />
        {suffix}
      </div>
      {error && <p style={s.errorText}>{error}</p>}
    </div>
  );
}

/* ── Styles ── */
const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #eff6ff 100%)",
    padding: "40px 16px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
  },
  blob1: {
    position: "fixed", top: "-120px", left: "-120px",
    width: 420, height: 420, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-100px", right: "-100px",
    width: 380, height: 380, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%", maxWidth: 500,
    background: "#ffffff",
    borderRadius: 28,
    padding: "40px 40px 32px",
    boxShadow: "0 24px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
  },
  logoRow: {
    display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
  },
  logoIcon: {
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    padding: 16, borderRadius: 18, color: "#fff", fontSize: 18,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
  },
  logoTitle: {
    fontSize: 20, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.3px",
  },
  logoSub: {
    fontSize: 13, color: "#9ca3af", marginTop: 2,
  },
  noteBox: {
    backgroundColor: "#e0e7ff",
    border: "1px solid #a5b4fc",
    padding: "12px 16px",
    borderRadius: 14,
    color: "#3730a3",
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24, fontWeight: 800, color: "#111827",
    margin: "0 0 6px", letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: 14, color: "#6b7280", marginBottom: 16, lineHeight: 1.5,
  },
  stepRow: {
    display: "flex", alignItems: "center", marginBottom: 32,
  },
  stepItem: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 60,
  },
  stepCircle: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, cursor: "default",
  },
  stepLabel: {
    fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5,
  },
  stepLine: {
    flex: 1, height: 3, borderRadius: 99, marginBottom: 20,
  },
  formSection: {
    minHeight: 280,
  },
  label: {
    display: "block", fontSize: 13, fontWeight: 600,
    color: "#374151", marginBottom: 7,
  },
  hint: {
    fontWeight: 500, color: "#9ca3af",
  },
  inputWrap: {
    display: "flex", alignItems: "center",
    border: "1.5px solid #e5e7eb",
    borderRadius: 14, padding: "13px 16px",
    background: "#f9fafb", gap: 10,
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  input: {
    border: "none", outline: "none",
    flex: 1, background: "transparent",
    fontSize: 15, color: "#111827",
  },
  eyeIcon: {
    cursor: "pointer", color: "#9ca3af", fontSize: 15,
    display: "flex", alignItems: "center",
  },
  errorText: {
    color: "#ef4444", fontSize: 12, marginTop: 5,
  },
  textarea: {
    width: "100%", minHeight: 80, padding: "12px 14px",
    border: "1.5px solid #e5e7eb", borderRadius: 14,
    background: "#f9fafb", fontSize: 14, color: "#374151",
    resize: "vertical", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", lineHeight: 1.6,
  },
  chipSection: {},
  chipGrid: {
    display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8,
  },
  chip: {
    padding: "7px 14px", borderRadius: 999,
    border: "1.5px solid #e5e7eb",
    fontSize: 13, fontWeight: 500, cursor: "pointer",
    transition: "all 0.2s ease", outline: "none",
    whiteSpace: "nowrap",
  },
  navRow: {
    display: "flex", gap: 12, marginTop: 28, alignItems: "center",
  },
  backBtn: {
    padding: "13px 20px", borderRadius: 14,
    border: "1.5px solid #e5e7eb",
    background: "#fff", color: "#6b7280",
    fontSize: 15, fontWeight: 600, cursor: "pointer",
  },
  nextBtn: {
    flex: 1, padding: "14px 20px", borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
    transition: "opacity 0.2s",
    letterSpacing: "-0.2px",
  },
  footer: {
    textAlign: "center", fontSize: 14, color: "#6b7280", marginTop: 22,
  },
};