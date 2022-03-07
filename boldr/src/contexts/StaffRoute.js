import React from "react";

import {  Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function StaffRoute({ children }) {
  const { currentUser, userData } = useAuth();

  return (currentUser && userData.isStaff) ? children : <Navigate to="../" />;
}