import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import Attendance from "./pages/attendance/Attendance";
import AddShift from "./pages/addShift/addShift";
import Dashboard from "./pages/dashboard/Dashboard";
import MainPage from "./pages/main_page/MainPage";
import Login from "./pages/Login/Login";
import PasswordReset from "./pages/Login/ConfirmPasswordReset";
import Forgotpassword from "./pages/Login/forgotpassword";
import { UserAuthContextProvider } from "./pages/context/Userauthcontext";
import Financial_Identity from "./pages/Details/Financial_IdentityDetails";
import PersonalInfo from "./pages/Details/PersonalInfo";
import Leave from "./pages/leave/Leave";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "./pages/context/Userauthcontext";
import LeaveContextProvider from "./pages/leave/LeaveContext";
import Salary from "./pages/salary/Salary";

// import NewClient from "./pages/new-client/NewClient";
// import NewSupplier from "./pages/new-supplier/NewSupplier";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/ForgotPassword" element={<Forgotpassword />} exact />
            <Route path="/" element={<Login />} />
            <Route path="/password-reset" element={<PasswordReset />} exact />

            {/* <Route path="/Personal_Info" element={<PersonalInfo />} /> */}
            <Route
              path="/Financial_IdentityDetails"
              element={
                // <ProtectedRoute>
                <Financial_Identity />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/userdetails/:detailsTypes"
              element={
                // <ProtectedRoute>
                <MainPage />
                // </ProtectedRoute>
              }
            />
            {/* <Route path="/client" element={<NewClient />} /> */}
            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                <Dashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                // <ProtectedRoute>
                <Attendance />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/leave"
              element={
                // <ProtectedRoute>
                <LeaveContextProvider>
                  <Leave />
                </LeaveContextProvider>
                // </ProtectedRoute>
              }
            />
            <Route path="/salary" element={<Salary />} />
            {/* <Route path="/policies"  */}

            {/* <Route path="/addShift" element={<AddShift />} /> */}
            {/* <Route path="/supplier" element={<NewSupplier />} /> */}
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  let { user } = useContext(userAuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default App;
