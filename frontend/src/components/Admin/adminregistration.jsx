import React, { useState } from "react";
import {
  FaShieldAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaUser, FaKey, FaCheckCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const STEPS = ["Account", "Identity", "Access Key"];

const ADMIN_ROLES = [
  "Super Admin", "Event Moderator", "User Manager",
  "Content Reviewer", "Support Admin", "Analytics Admin"
];

export default function AdminRegistration() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({
    email: "", password: "", confirm: "",
    name: "", employeeId: "", department: "",
    accessKey: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isStep0Valid =
    form.email && form.password && form.confirm && form.password === form.confirm;
  const isStep1Valid = form.name && form.employeeId && selectedRole;
  const isStep2Valid = form.accessKey.length >= 6;

  const canNext =
    (step === 0 && isStep0Valid) ||
    (step === 1 && isStep1Valid) ||
    (step === 2 && isStep2Valid);

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Logo */}
        <div style={s.logoRow}>
          <div style={s.logoIcon}><FaShieldAlt /></div>
          <div>
            <div style={s.logoTitle}>Criss-Cross</div>
            <div style={s.logoSub}>Admin Portal</div>
          </div>
        </div>

        <h2 style={s.heading}>Register Admin Account</h2>
        <p style={s.subheading}>Restricted access — authorized personnel only</p>

        {/* Warning Box */}
        <div style={s.warningBox}>
          <FaShieldAlt style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            Admin registration requires a valid <strong>Access Key</strong> issued by your system administrator.
            All registrations are logged and monitored.
          </span>
        </div>

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
                  boxShadow: i === step ? "0 0 0 4px rgba(59,130,246,0.2)" : "none",
                  transform: i === step ? "scale(1.15)" : "scale(1)",
                  transition: "all 0.3s ease",
                }}>
                  {i < step ? <FaCheckCircle size={14} /> : i + 1}
                </div>
                <span style={{
                  ...s.stepLabel,
                  color: i <= step ? "#2563eb" : "#9ca3af",
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

        {/* ── STEP 0: Account ── */}
        {step === 0 && (
          <div style={s.formSection}>
            <InputField
              label="Admin Email Address"
              icon={<FaEnvelope color="#9ca3af" />}
              type="email" name="email" value={form.email}
              placeholder="admin@criss-cross.com"
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

        {/* ── STEP 1: Identity ── */}
        {step === 1 && (
          <div style={s.formSection}>
            <InputField
              label="Full Name"
              icon={<FaUser color="#9ca3af" />}
              type="text" name="name" value={form.name}
              placeholder="e.g. Sarah Johnson"
              onChange={handleChange}
            />
            <InputField
              label="Employee / Staff ID"
              icon={<span style={{ fontSize: 14, color: "#9ca3af" }}>🪪</span>}
              type="text" name="employeeId" value={form.employeeId}
              placeholder="e.g. EMP-00123"
              onChange={handleChange}
            />
            <InputField
              label="Department"
              icon={<span style={{ fontSize: 14, color: "#9ca3af" }}>🏢</span>}
              type="text" name="department" value={form.department}
              placeholder="e.g. Platform Operations"
              onChange={handleChange}
            />

            {/* Role Selector */}
            <label style={s.label}>
              Admin Role <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={s.roleGrid}>
              {ADMIN_ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    ...s.roleChip,
                    background: selectedRole === role
                      ? "linear-gradient(135deg, #3b82f6, #9333ea)"
                      : "#f9fafb",
                    color: selectedRole === role ? "#fff" : "#374151",
                    borderColor: selectedRole === role ? "transparent" : "#e5e7eb",
                    boxShadow: selectedRole === role
                      ? "0 4px 12px rgba(59,130,246,0.3)" : "none",
                    transform: selectedRole === role ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  {selectedRole === role && (
                    <FaCheckCircle size={11} style={{ marginRight: 5 }} />
                  )}
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Access Key ── */}
        {step === 2 && (
          <div style={s.formSection}>
            <div style={s.keyInfoBox}>
              <FaKey style={{ fontSize: 20, color: "#92400e", flexShrink: 0 }} />
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#92400e" }}>
                  Access Key Required
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "#b45309", lineHeight: 1.5 }}>
                  Enter the one-time access key provided by your Super Admin.
                  This key is required to complete registration and cannot be reused.
                </p>
              </div>
            </div>

            <InputField
              label="Admin Access Key"
              icon={<FaKey color="#9ca3af" />}
              type={showAccessKey ? "text" : "password"}
              name="accessKey" value={form.accessKey}
              placeholder="Enter your access key"
              onChange={handleChange}
              suffix={
                <span style={s.eyeIcon} onClick={() => setShowAccessKey(!showAccessKey)}>
                  {showAccessKey ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />

            {/* Summary Card */}
            <div style={s.summaryCard}>
              <p style={s.summaryTitle}>Registration Summary</p>
              <div style={s.summaryRow}>
                <span style={s.summaryKey}>Email</span>
                <span style={s.summaryVal}>{form.email || "—"}</span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryKey}>Name</span>
                <span style={s.summaryVal}>{form.name || "—"}</span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryKey}>Employee ID</span>
                <span style={s.summaryVal}>{form.employeeId || "—"}</span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryKey}>Role</span>
                <span style={{ ...s.summaryVal, color: "#2563eb", fontWeight: 600 }}>
                  {selectedRole || "—"}
                </span>
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
            <Link to="/admin" style={{ textDecoration: "none", flex: 1 }}>
              <button
                style={{
                  ...s.nextBtn,
                  width: "100%",
                  opacity: isStep2Valid ? 1 : 0.5,
                  cursor: isStep2Valid ? "pointer" : "not-allowed",
                }}
              >
                🔐 Complete Registration
              </button>
            </Link>
          )}
        </div>

        {/* Footer */}
        <p style={s.footer}>
          Already have an account?{" "}
          <Link
            to="/admin-login"
            style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
          >
            Sign In as Admin
          </Link>
        </p>

        {/* Secure Notice */}
        <div style={s.secureBox}>
          <FaShieldAlt />
          This is a secure admin area. All actions are logged and monitored.
        </div>
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
    background: "#f3f4f6",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    width: "100%", maxWidth: 480,
    background: "#ffffff",
    borderRadius: 30,
    padding: "40px 40px 32px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    boxSizing: "border-box",
  },
  logoRow: {
    display: "flex", alignItems: "center", gap: 14, marginBottom: 24,
  },
  logoIcon: {
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    padding: 16, borderRadius: 18, color: "#fff", fontSize: 18,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
  },
  logoTitle: {
    fontSize: 20, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.3px",
  },
  logoSub: {
    fontSize: 13, color: "#9ca3af", marginTop: 2,
  },
  heading: {
    fontSize: 24, fontWeight: 800, color: "#111827",
    margin: "0 0 6px", letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: 14, color: "#6b7280", marginBottom: 16, lineHeight: 1.5,
  },
  warningBox: {
    display: "flex", gap: 10, alignItems: "flex-start",
    backgroundColor: "#fef3c7",
    border: "1px solid #facc15",
    padding: "13px 16px",
    borderRadius: 14,
    color: "#92400e",
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 24,
    lineHeight: 1.5,
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
  roleGrid: {
    display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, marginBottom: 4,
  },
  roleChip: {
    display: "flex", alignItems: "center",
    padding: "8px 14px", borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 13, fontWeight: 500, cursor: "pointer",
    transition: "all 0.2s ease", outline: "none",
  },
  keyInfoBox: {
    display: "flex", gap: 14, alignItems: "flex-start",
    backgroundColor: "#fffbeb",
    border: "1px solid #fcd34d",
    padding: "16px",
    borderRadius: 14,
    marginBottom: 20,
  },
  summaryCard: {
    background: "#f9fafb",
    border: "1.5px solid #e5e7eb",
    borderRadius: 14,
    padding: "16px 20px",
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 13, fontWeight: 700, color: "#374151",
    marginBottom: 12, margin: "0 0 12px",
  },
  summaryRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 8,
  },
  summaryKey: {
    fontSize: 13, color: "#6b7280",
  },
  summaryVal: {
    fontSize: 13, fontWeight: 600, color: "#111827",
    maxWidth: "60%", textAlign: "right",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
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
    background: "linear-gradient(135deg, #3b82f6, #9333ea)",
    color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
    transition: "opacity 0.2s",
    letterSpacing: "-0.2px",
  },
  footer: {
    textAlign: "center", fontSize: 14, color: "#6b7280", marginTop: 22, marginBottom: 0,
  },
  secureBox: {
    marginTop: 20,
    padding: "14px 16px",
    borderRadius: 14,
    backgroundColor: "#fef3c7",
    border: "1px solid #facc15",
    color: "#92400e",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    fontWeight: 500,
  },
};