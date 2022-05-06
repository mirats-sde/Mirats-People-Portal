import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import Attendance from "./pages/attendance/Attendance";
import Dashboard from "./pages/dashboard/Dashboard";
import MainPage from "./pages/main_page/MainPage";
import Salary from "./pages/salary/Salary";
import Leave from "./pages/leave/Leave";
import Login from "./components/login/Login";
// import NewClient from "./pages/new-client/NewClient";
// import NewSupplier from "./pages/new-supplier/NewSupplier";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/userdetails/:detailsTypes" element={<MainPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/policy" element={<Policy />} /> */}
        </Routes>
      </BrowserRouter>

      {/* <Route path="/create-new-project/:edit_option" exact>
        <Route path="new-client" />
        {/* <CreateNewProjectProvider>
            <CreateNewProject />
          </CreateNewProjectProvider> 
      </Route> 
          */}
    </div>
  );
}

export default App;
