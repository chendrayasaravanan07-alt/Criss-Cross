import React, { useState } from "react";
import { FaLink, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaUniversity, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const STEPS = ["Account", "Profile", "Interests"];

const SKILL_OPTIONS = [
  "React", "Node.js", "Python", "Machine Learning",
  "UI/UX Design", "Docker", "AWS", "Flutter",
  "Java", "Kotlin", "iOS", "Data Science",
  "Blockchain", "Cybersecurity", "Game Dev", "DevOps"
];

const INTEREST_OPTIONS = [
  "AI & ML", "Web Dev", "Healthcare", "Sustainability",
  "FinTech", "EdTech", "IoT", "Robotics",
  "AR/VR", "Open Source", "Social Impact", "Cloud"
];

export default function StudentRegistration() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [form, setForm] = useState({
    email: "", password: "", confirm: "",
    name: "", university: "", degree: "", location: "", bio: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
  try {

    const response = await axios.post(
      "http://localhost:5000/api/student/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
        university: form.university,
        degree: form.degree,
        location: form.location,
        bio: form.bio,
        skills: selectedSkills,
        interests: selectedInterests,
      }
    );

    console.log(response.data);

    localStorage.setItem(
      "studentToken",
      response.data.token
    );

    localStorage.setItem(
      "student",
      JSON.stringify(response.data.student)
    );

    alert("Registration Successful");

    navigate("/student/dashboard");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

  const toggleSkill = (s) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleInterest = (i) =>
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const isStep0Valid =
    form.email && form.password && form.confirm && form.password === form.confirm;
  const isStep1Valid = form.name && form.university && form.degree;
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
            <div style={s.logoSub}>Student Portal</div>
          </div>
        </div>

        <h2 style={s.heading}>Create your account</h2>
        <p style={s.subheading}>Join thousands of students discovering hackathons</p>

        {/* Step Indicator */}
        <div style={s.stepRow}>
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div style={s.stepItem}>
                <div style={{
                  ...s.stepCircle,
                  background: i <= step
                    ? "linear-gradient(135deg, #3b82f6, #9333ea)"
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
                  color: i <= step ? "#4f46e5" : "#9ca3af",
                  fontWeight: i === step ? "700" : "500",
                }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  ...s.stepLine,
                  background: i < step
                    ? "linear-gradient(to right, #3b82f6, #9333ea)"
                    : "#e5e7eb",
                  transition: "background 0.4s ease",
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 0 */}
        {step === 0 && (
          <div style={s.formSection}>
            <InputField label="Email Address" icon={<FaEnvelope color="#9ca3af" />}
              type="email" name="email" value={form.email}
              placeholder="you@university.edu" onChange={handleChange} />
            <InputField label="Password" icon={<FaLock color="#9ca3af" />}
              type={showPassword ? "text" : "password"}
              name="password" value={form.password}
              placeholder="Min. 8 characters" onChange={handleChange}
              suffix={
                <span style={s.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              } />
            <InputField label="Confirm Password" icon={<FaLock color="#9ca3af" />}
              type={showConfirm ? "text" : "password"}
              name="confirm" value={form.confirm}
              placeholder="Re-enter your password" onChange={handleChange}
              error={form.confirm && form.password !== form.confirm ? "Passwords don't match" : ""}
              suffix={
                <span style={s.eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              } />
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div style={s.formSection}>
            <InputField label="Full Name" icon={<FaUser color="#9ca3af" />}
              type="text" name="name" value={form.name}
              placeholder="Alex Morgan" onChange={handleChange} />
            <InputField label="University" icon={<FaUniversity color="#9ca3af" />}
              type="text" name="university" value={form.university}
              placeholder="e.g. MIT, Stanford, IIT" onChange={handleChange} />
            <InputField label="Degree / Major"
              icon={<span style={{ fontSize: "1.6vh", color: "#9ca3af" }}>🎓</span>}
              type="text" name="degree" value={form.degree}
              placeholder="e.g. Computer Science" onChange={handleChange} />
            <InputField label="Location" icon={<FaMapMarkerAlt color="#9ca3af" />}
              type="text" name="location" value={form.location}
              placeholder="City, Country" onChange={handleChange} />
            <label style={s.label}>
              Short Bio <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea name="bio" value={form.bio} onChange={handleChange}
              placeholder="Tell teammates what you're passionate about..."
              style={s.textarea} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={s.formSection}>
            <div style={s.chipSection}>
              <label style={s.label}>
                💡 Skills <span style={s.hint}>({selectedSkills.length} selected)</span>
              </label>
              <div style={s.chipGrid}>
                {SKILL_OPTIONS.map((skill) => (
                  <button key={skill} type="button" onClick={() => toggleSkill(skill)} style={{
                    ...s.chip,
                    background: selectedSkills.includes(skill)
                      ? "linear-gradient(135deg, #3b82f6, #9333ea)" : "#f0f0f8",
                    color: selectedSkills.includes(skill) ? "#fff" : "#4b5563",
                    borderColor: selectedSkills.includes(skill) ? "transparent" : "#e5e7eb",
                    transform: selectedSkills.includes(skill) ? "scale(1.05)" : "scale(1)",
                    boxShadow: selectedSkills.includes(skill) ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
                  }}>{skill}</button>
                ))}
              </div>
            </div>
            <div style={{ ...s.chipSection, marginTop: "3%" }}>
              <label style={s.label}>
                ⭐ Interests <span style={s.hint}>({selectedInterests.length} selected)</span>
              </label>
              <div style={s.chipGrid}>
                {INTEREST_OPTIONS.map((item) => (
                  <button key={item} onClick={() => toggleInterest(item)} style={{
                    ...s.chip,
                    background: selectedInterests.includes(item)
                      ? "linear-gradient(135deg, #ec4899, #f97316)" : "#f0f0f8",
                    color: selectedInterests.includes(item) ? "#fff" : "#4b5563",
                    borderColor: selectedInterests.includes(item) ? "transparent" : "#e5e7eb",
                    transform: selectedInterests.includes(item) ? "scale(1.05)" : "scale(1)",
                    boxShadow: selectedInterests.includes(item) ? "0 4px 12px rgba(236,72,153,0.3)" : "none",
                  }}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Nav Buttons */}
        <div style={s.navRow}>
          {step > 0 && (
            <button style={s.backBtn} onClick={() => setStep(step - 1)}>← Back</button>
          )}
          {step < 2 ? (
            <button style={{
              ...s.nextBtn,
              opacity: canNext ? 1 : 0.5,
              cursor: canNext ? "pointer" : "not-allowed",
              marginLeft: step > 0 ? 0 : "auto",
            }}
              onClick={() => canNext && setStep(step + 1)}>
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
              🚀 Create Account
            </button>
          )}
        </div>

        {/* Footer */}
        <p style={s.footer}>
          Already have an account?{" "}
          <Link to="/student-login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

function InputField({ label, icon, type, name, value, placeholder, onChange, suffix, error }) {
  return (
    <div style={{ marginBottom: "2%" }}>
      <label style={s.label}>{label}</label>
      <div style={{
        ...s.inputWrap,
        borderColor: error ? "#f87171" : "#e5e7eb",
        boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : "none",
      }}>
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
        <input type={type} name={name} value={value}
          placeholder={placeholder} onChange={onChange}
          style={s.input} />
        {suffix}
      </div>
      {error && <p style={s.errorText}>{error}</p>}
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2ff 0%, #fdf4ff 50%, #eff6ff 100%)",
    padding: "4% 2%",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
  },
  blob1: {
    position: "fixed", top: "-10%", left: "-10%",
    width: "35%", height: "35%", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-8%", right: "-8%",
    width: "30%", height: "30%", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%", maxWidth: "40%",
    background: "#ffffff",
    borderRadius: "3.5vh",
    padding: "4% 4% 3.5%",
    boxShadow: "0 24px 60px rgba(99,102,241,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    boxSizing: "border-box",
  },
  logoRow: {
    display: "flex", alignItems: "center", gap: "3%", marginBottom: "3%",
  },
  logoIcon: {
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    padding: "2.5%", borderRadius: "2.5vh", color: "#fff", fontSize: "2vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
  },
  logoTitle: {
    fontSize: "2.2vh", fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.3px",
  },
  logoSub: {
    fontSize: "1.4vh", color: "#9ca3af", marginTop: "0.5%",
  },
  heading: {
    fontSize: "2.8vh", fontWeight: 800, color: "#111827",
    margin: "0 0 0.8%", letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: "1.5vh", color: "#6b7280", marginBottom: "3%", lineHeight: 1.5,
  },
  stepRow: {
    display: "flex", alignItems: "center", marginBottom: "4%",
  },
  stepItem: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "1%", minWidth: "15%",
  },
  stepCircle: {
    width: "4vh", height: "4vh", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.4vh", fontWeight: 700, cursor: "default",
  },
  stepLabel: {
    fontSize: "1.2vh", textTransform: "uppercase", letterSpacing: 0.5,
  },
  stepLine: {
    flex: 1, height: "0.4vh", borderRadius: 99, marginBottom: "2.5%",
  },
  formSection: {
    minHeight: "30vh",
  },
  label: {
    display: "block", fontSize: "1.4vh", fontWeight: 600,
    color: "#374151", marginBottom: "1%",
  },
  hint: {
    fontWeight: 500, color: "#9ca3af",
  },
  inputWrap: {
    display: "flex", alignItems: "center",
    border: "1.5px solid #e5e7eb",
    borderRadius: "1.8vh", padding: "1.5% 2%",
    background: "#f9fafb", gap: "2%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  input: {
    border: "none", outline: "none",
    flex: 1, background: "transparent",
    fontSize: "1.6vh", color: "#111827",
  },
  eyeIcon: {
    cursor: "pointer", color: "#9ca3af", fontSize: "1.6vh",
    display: "flex", alignItems: "center",
  },
  errorText: {
    color: "#ef4444", fontSize: "1.2vh", marginTop: "0.8%",
  },
  textarea: {
    width: "100%", minHeight: "10vh", padding: "1.5% 2%",
    border: "1.5px solid #e5e7eb", borderRadius: "1.8vh",
    background: "#f9fafb", fontSize: "1.5vh", color: "#374151",
    resize: "vertical", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", lineHeight: 1.6,
  },
  chipSection: {},
  chipGrid: {
    display: "flex", flexWrap: "wrap", gap: "1.5%", marginTop: "1%",
  },
  chip: {
    padding: "0.8% 1.8%", borderRadius: "999px",
    border: "1.5px solid #e5e7eb",
    fontSize: "1.4vh", fontWeight: 500, cursor: "pointer",
    transition: "all 0.2s ease", outline: "none",
    whiteSpace: "nowrap",
  },
  navRow: {
    display: "flex", gap: "2%", marginTop: "3.5%", alignItems: "center",
  },
  backBtn: {
    padding: "1.5% 2.5%", borderRadius: "1.8vh",
    border: "1.5px solid #e5e7eb",
    background: "#fff", color: "#6b7280",
    fontSize: "1.6vh", fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s",
  },
  nextBtn: {
    flex: 1, padding: "1.8% 2.5%", borderRadius: "1.8vh",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    color: "#fff", fontSize: "1.8vh", fontWeight: 700, cursor: "pointer",
    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
    transition: "opacity 0.2s, transform 0.2s",
    letterSpacing: "-0.2px",
  },
  footer: {
    textAlign: "center", fontSize: "1.5vh", color: "#6b7280", marginTop: "3%",
  },
};