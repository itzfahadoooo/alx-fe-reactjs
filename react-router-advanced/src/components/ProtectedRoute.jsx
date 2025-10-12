import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ must use this hook

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); // ✅ required usage

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
