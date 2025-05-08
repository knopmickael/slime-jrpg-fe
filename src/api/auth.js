import axios from "axios";

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
