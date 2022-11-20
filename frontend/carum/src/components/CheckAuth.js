import React from "react";
import { Navigate } from "react-router-dom";

function CheckAuth({ children }) {
  const token = sessionStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default CheckAuth;
