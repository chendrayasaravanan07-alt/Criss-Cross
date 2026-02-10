import React from "react";

const StudentLogin = () => {
  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <svg
              width="60%"
              height="60%"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1" />
              <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1" />
            </svg>
          </div>
          <div>
            <h1 style={styles.brand}>Criss-Cross</h1>
            <p style={styles.portal}>Student Portal</p>
          </div>
        </div>

        <h2 style={styles.welcome}>Welcome Back!</h2>
        <p style={styles.subtitle}>Sign in to discover amazing hackathons</p>

        {/* Email */}
        <div style={styles.group}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="you@university.edu"
            style={styles.input}
          />
        </div>

        {/* Password */}
        <div style={styles.group}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>

        {/* Options */}
        <div style={styles.options}>
          <label style={{ display: "flex", alignItems: "center", gap: "1vh" }}>
            <input type="checkbox" />
            Remember me
          </label>

          <span style={styles.forgot}>Forgot password?</span>
        </div>

        {/* Button */}
        <button style={styles.button}>Sign In →</button>

        <p style={styles.signup}>
          Don't have an account?
          <span style={styles.signupLink}> Create Student Account</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  /* OUTER */
  outer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f6f7ff, #f2f3ff)",
  },

  /* CARD */
  card: {
    width: "36%",
    padding: "4.5%",
    background: "#ffffff",
    borderRadius: "2.2vh",
    boxShadow: "0 2vh 5vh rgba(0,0,0,0.12)",
  },

  /* HEADER */
  header: {
    display: "flex",
    alignItems: "center",
    gap: "4%",
    marginBottom: "6%",
  },

  logo: {
    width: "10%",
    height: "10%",
    minWidth: "10%",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    borderRadius: "2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  brand: {
    fontSize: "2.8vh",
    margin: "0",
    fontWeight: "600",
  },

  portal: {
    fontSize: "1.6vh",
    margin: "0",
    color: "#6b7280",
  },

  /* TEXT */
  welcome: {
    fontSize: "3.2vh",
    marginBottom: "2%",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: "1.8vh",
    marginBottom: "7%",
    color: "#6b7280",
  },

  /* FORM */
  group: {
    marginBottom: "5.5%",
  },

  label: {
    fontSize: "1.6vh",
    display: "block",
    marginBottom: "2%",
    color: "#111827",
  },

  input: {
    width: "100%",
    padding: "4.2%",
    fontSize: "1.8vh",
    borderRadius: "1.6vh",
    border: "0.12vh solid #e5e7eb",
    outline: "none",
  },

  /* OPTIONS */
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "7%",
    fontSize: "1.6vh",
  },

  remember: {
    display: "flex",
    gap: "6%",
    alignItems: "center",
  },

  forgot: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500",
  },

  /* BUTTON */
  button: {
    width: "100%",
    padding: "4.5%",
    fontSize: "2.1vh",
    borderRadius: "2.2vh",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  /* SIGNUP */
  signup: {
    textAlign: "center",
    marginTop: "7%",
    fontSize: "1.6vh",
    color: "#374151",
  },

  signupLink: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default StudentLogin;
