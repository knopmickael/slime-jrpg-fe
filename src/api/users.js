import axios from "@/api/axiosInstance";

export const listUsers = async () => {
  try {
    const response = await axios.get(`/users/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw error;
  }
};

export const getUserData = async (username) => {
  try {
    const response = await axios.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getAuthUserData = async () => {
  try {
    const response = await axios.get(`/users/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching auth user data:", error);
    throw error;
  }
};

export const setLastPickedHero = async (id) => {
  try {
    const response = await axios.post(`/users/set-lph`, { id });
    return response.data;
  } catch (error) {
    console.error("Error setting last picked hero:", error);
    throw error;
  }
};
