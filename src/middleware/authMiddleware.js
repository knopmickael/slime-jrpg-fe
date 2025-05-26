export const guestOnly = (to, from, next) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    next({ path: "/" }); // Redirect to home if already logged in
  } else {
    next(); // Allow access to the route
  }
};

export const authOnly = (to, from, next) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    next({ path: "/login" }); // Redirect to login if not authenticated
  } else {
    next(); // Allow access to the route
  }
};
