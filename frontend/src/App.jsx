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

// Organizer pages
import OrganizerEvents from "./components/Organizer/organizerevents";
import OrganizerParticipants from "./components/Organizer/Participants";
import OrganizerSettings from "./components/Organizer/organizersettings";
import OrganizerProfile from "./components/Organizer/organizerprofile";
import UpdateEvent from "./components/Organizer/updateevent";

// Student pages
import DiscoverEvents from "./components/Student/discoverevents";
import MyEvents from "./components/Student/myevents";
import Bookmarked from "./components/Student/Bookmarked";
import Notifications from "./components/Student/notifications";
import StudentProfile from "./components/Student/studentprofile";
import StudentSettings from "./components/Student/studentsettings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/selection" element={<Selection />} />

        {/* Login Pages */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Organizer routes */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/organizer/myevents" element={<OrganizerEvents />} />
        <Route path="/organizer/participants" element={<OrganizerParticipants />} />
        <Route path="/organizer/settings" element={<OrganizerSettings />} />
        <Route path="/organizer/profile" element={<OrganizerProfile />} />
        <Route path="/organizer/update-event/:id" element={<UpdateEvent />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/discover" element={<DiscoverEvents />} />
        <Route path="/student/myevents" element={<MyEvents />} />
        <Route path="/student/bookmarked" element={<Bookmarked />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/settings" element={<StudentSettings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;