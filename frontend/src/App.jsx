import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentdash from "./components/Student/studentdash";
import DiscoverEvents from "./components/Student/discoverevents";

import Studentsettings from "./components/Student/studentsettings";
import OrganizerEvents from "./components/Organizer/organizerevents";
import Createevent from "./components/Organizer/createevent";
import EventApprovals from "./components/Admin/eventapprovals";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
    // //     {/* Routes */}
    {/* // //     <Route path="/" element={<Studentdash />} />
    // //     <Route path="/student/dashboard" element={<Studentdash />} />
    // //     <Route path="/student/discover" element={<DiscoverEvents />} />
    // //     <Route path="/student/events" element={<Studentdash />} />
    // //     <Route path="/student/bookmarks" element={<Studentdash />} />
    // //     <Route path="/student/notifications" element={<Studentdash />} />
    // //     <Route path="/student/profile" element={<Studentdash />} />
    // //     <Route path="/Settings" element={<Studentsettings />} />
    // //      */}
          <Route path="/" element={<OrganizerEvents/>} />
        
          <Route path="/create-event" element={<Createevent />} /> 
      </Routes>
    </BrowserRouter>
   

    
  );
}

