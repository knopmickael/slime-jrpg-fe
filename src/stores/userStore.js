import { defineStore } from "pinia";
import { getAuthUserData } from "@/api/users";

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
    async onBootLogIn() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      let isTokenExpired = false;
      try {
        isTokenExpired = await getAuthUserData();
        if (isTokenExpired) isTokenExpired = isTokenExpired.username;
      } catch (error) {
        isTokenExpired = error.message;
      }

      if (isTokenExpired.includes("401")) {
        localStorage.removeItem("authToken");
        return;
      }

      this.token = token;
      this.loggedIn = true;

      const decoded = parseJwt(token);

      this.usermail = decoded.usermail;
      this.username = decoded.username;
      this.profilePicture = decoded.profilePicture;

      this.lastPickedHero = decoded.lastPickedHero;
    },
    defaultLogIn(usermail, username, profilePicture, lastPickedHero, token) {
      this.token = token;
      this.loggedIn = true;

      this.usermail = usermail;
      this.username = username;
      this.profilePicture = profilePicture;

      this.lastPickedHero = lastPickedHero;
    },
    renewToken(token) {
      this.token = token;
      localStorage.setItem("authToken", token);
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
