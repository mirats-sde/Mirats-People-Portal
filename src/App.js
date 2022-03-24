import { BrowserRouter, Route, Routes } from "react-router-dom";
import Attendance from "./pages/attendance/Attendance";
import Dashboard from "./pages/dashboard/Dashboard";
import MainPage from "./pages/main_page/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/:detailsTypes" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
