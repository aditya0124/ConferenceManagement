

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conferences from "./pages/Conferences";
import MyBookings from "./pages/MyBookings";
import AdminPanel from "./pages/AdminPanel";
import CreateConference from "./pages/CreateConference";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminConferenceDetails from "./pages/AdminConferenceDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />


            <Route
              path="/admin/conference/:id"
              element={
                <ProtectedRoute role="admin">
                  <AdminConferenceDetails />
                </ProtectedRoute>
              }
            />
      {/* User */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <Conferences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="user">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute role="admin">
              <CreateConference />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
