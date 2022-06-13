import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/Userauthcontext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  let { user } = useContext(userAuthContext);
  useEffect(() => {
    // if (user?.uid) <Navigate to="/home" />;
    // else <Navigate to="/home" />;
    console.log(user);
  }, [user]);
  if (!user) {
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
