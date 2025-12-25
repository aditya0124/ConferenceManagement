// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />; // redirect logged-in users to home
  return children;
}
