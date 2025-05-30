import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { getAuthUserData } from "./users";

const API_URL = "http://localhost:3000/api/auth";

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    const token = response.data.token;

    if (token) {
      localStorage.setItem("authToken", token);
      const userData = await getAuthUserData();
      useUserStore().defaultLogIn(userData.usermail, userData.username, userData.profile_picture, userData.last_picked_hero, token);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
