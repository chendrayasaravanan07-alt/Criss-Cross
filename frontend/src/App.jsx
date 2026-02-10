import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/Student/studentlogin.jsx";
import Selection from "./components/selection.jsx";
import DiscoverEvents from "./components/Student/discoverevents.jsx";
import Sidebar from "./components/Student/sidebar.jsx";
import Osidebar from "./components/Organizer/osidebar.jsx";
import Asidebar from "./components/Admin/asidebar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Selection />} /> 
        <Route path="/discover-events" element={<DiscoverEvents />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/osidebar" element={<Osidebar />} />
        <Route path="/asidebar" element={<Asidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
