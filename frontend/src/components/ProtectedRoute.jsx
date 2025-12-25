// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/" />;

//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// }
// src/components/ProtectedRoute.jsx

// src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ role, children }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     // Not logged in → go to login
//     return <Navigate to="/" />;
//   }

//   if (role && userRole !== role) {
//     // Logged in but role doesn't match → redirect to appropriate page
//     return <Navigate to={userRole === "admin" ? "/admin" : "/conferences"} />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }


// src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" replace />;

//   if (role && role !== userRole) return <Navigate to="/" replace />; // unauthorized

//   return children;
// }


import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch
  if (role && role !== userRole) {
    // redirect based on role
    return (
      <Navigate
        to={userRole === "admin" ? "/admin" : "/"}
        replace
      />
    );
  }

  return children;
}

