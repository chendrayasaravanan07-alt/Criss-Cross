import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

<<<<<<< HEAD
/* Landing + Selection */
=======
import Selection from "./components/selection";
import StudentDashboard from "./components/Student/studentdash";
import OrganizerDashboard from "./components/Organizer/organizerdash";
import AdminDashboard from "./components/Admin/admindash";
>>>>>>> 7b7af1e7c0a6c15278cc81d50e3fa2e576862834
import LandingPage from "./components/LandingPage";
import Selection from "./components/selection";
/* Login Pages */
import StudentLogin from "./components/Student/studentlogin";
import OrganizerLogin from "./components/Organizer/organizerlogin";
import AdminLogin from "./components/Admin/adminlogin";
<<<<<<< HEAD
/* Dashboards */
import Studentdash from "./components/Student/studentdash";
import OrganizerDashboard from "./components/Organizer/organizerdash";
import AdminDashboard from "./components/Admin/admindash";
/* Student Pages */
import Discover from "./components/Student/discoverevents";
import MyEvents from "./components/Student/myevents";
import Bookmarked from "./components/Student/Bookmarked";
import Notifications from "./components/Student/notification/notifications";
import Profile from "./components/Student/studentprofile";
import Settings from "./components/Student/studentsettings";
/* Organizer Pages */
import OrganizerEvents from "./components/Organizer/organizerevents";
import Participants from "./components/Organizer/Participants.jsx";
import Organizersettings from "./components/Organizer/organizersettings.jsx";
/* Admin Pages */
import UserManagement from "./components/Admin/usermanagement";
import EventApprovals from "./components/Admin/eventapprovals";
import AdminSettings from "./components/Admin/adminsettings";
=======

// Student pages
import DiscoverEvents from "./components/Student/discoverevents";
import MyEvents from "./components/Student/myevents";
import Bookmarked from "./components/Student/Bookmarked";
import Notifications from "./components/Student/notifications";
import StudentProfile from "./components/Student/studentprofile";
import StudentSettings from "./components/Student/studentsettings";

>>>>>>> 7b7af1e7c0a6c15278cc81d50e3fa2e576862834
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Selection */}
        <Route path="/selection" element={<Selection />} />

        {/* Login */}
=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/selection" element={<Selection />} />

        {/* Login Pages */}
>>>>>>> 7b7af1e7c0a6c15278cc81d50e3fa2e576862834
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Dashboards */}
<<<<<<< HEAD
        <Route path="/student/*" element={<Studentdash />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Student Sidebar Pages */}
        <Route path="/student/discover" element={<Discover />} />
        <Route path="/student/myevents" element={<MyEvents />} />
        <Route path="/student/bookmarked" element={<Bookmarked />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/settings" element={<Settings />} />

        {/* Admin Sidebar Pages */}
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/events" element={<EventApprovals />} />
        <Route path="/admin/approvals" element={<EventApprovals />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Organizer Sidebar Pages */}
        <Route path="/organizer/events" element={<OrganizerEvents />} />
        <Route path="/organizer/participants" element={<Participants />} />
        <Route path="/organizer/settings" element={<Organizersettings />} />
        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
=======
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Student routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/discover" element={<DiscoverEvents />} />
        <Route path="/student/myevents" element={<MyEvents />} />
        <Route path="/student/bookmarked" element={<Bookmarked />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/settings" element={<StudentSettings />} />
>>>>>>> 7b7af1e7c0a6c15278cc81d50e3fa2e576862834
      </Routes>
    </BrowserRouter>
  );
};

export default App;