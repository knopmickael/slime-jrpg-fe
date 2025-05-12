import { useUserStore } from "@/stores/userStore";

export const guestOnly = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.loggedIn) {
    next({ path: "/" }); // Redirect to home if already logged in
  } else {
    next(); // Allow access to the route
  }
};
