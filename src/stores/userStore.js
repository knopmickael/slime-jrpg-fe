import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    loggedIn: false,

    usermail: "",
    username: "",
    profilePicture: null,
    
    lastPickedHero: null,
  }),
  actions: {
    onBootLogIn() {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          this.token = token;
          this.loggedIn = true;

          const decoded = parseJwt(token);
          this.usermail = decoded.usermail;
          this.username = decoded.username;
          this.profilePicture = decoded.profilePicture;

          this.lastPickedHero = decoded.lastPickedHero;
        } catch (error) {
          console.error("Failed to decode token:", error);
          this.logOut();
        }
      }
    },
    defaultLogIn(usermail, username, profilePicture, lastPickedHero, token) {
      this.token = token;
      this.loggedIn = true;

      this.usermail = usermail;
      this.username = username;
      this.profilePicture = profilePicture;
          
      this.lastPickedHero = lastPickedHero;
    },
    logOut() {
      localStorage.removeItem("authToken");
      this.token = null;
      this.loggedIn = false;

      this.usermail = "";
      this.username = "";
      this.profilePicture = null;
      
      this.lastPickedHero = null;
    },
  },
});

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );

  return JSON.parse(jsonPayload);
}
