export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
