import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Selection from "./components/selection";
import StudentDashboard from "./components/Student/studentdash";
import OrganizerDashboard from "./components/Organizer/organizerdash";
import AdminDashboard from "./components/Admin/admindash";
import LandingPage from "./components/LandingPage";
import StudentLogin from "./components/Student/studentlogin";
import OrganizerLogin from "./components/Organizer/organizerlogin";
import AdminLogin from "./components/Admin/adminlogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* First Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* After clicking Get Started */}
        <Route path="/selection" element={<Selection />} />
        {/* Login Pages */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Dashboards */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
