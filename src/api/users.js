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
