import axios from "@/api/axiosInstance";

export const listHeroes = async () => {
  try {
    const response = await axios.get(`/hero/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching heroes list:", error);
    throw error;
  }
};

export const showHero = async (heroname) => {
  try {
    const response = await axios.get(`/hero/${heroname}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero:", error);
    throw error;
  }
};