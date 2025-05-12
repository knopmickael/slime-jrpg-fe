import { useUserStore } from "@/stores/userStore";

export const guestOnly = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.loggedIn) {
    next({ path: "/" }); // Redirect to home if already logged in
  } else {
    next(); // Allow access to the route
  }
};

export const authOnly = (to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.loggedIn) {
    next({ path: "/login" }); // Redirect to login if not authenticated
  } else {
    next(); // Allow access to the route
  }
};
