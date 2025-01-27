import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch user details
 * @returns {Promise<Object>}
 */
export const fetchUserDetails = async () => {
  try {
    const response = await API.get("/user");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetch all projects
 * @returns {Promise<Array>}
 */
export const fetchProjects = async () => {
  try {
    const response = await API.get("/project");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetch all skills
 * @returns {Promise<Array>}
 */
export const fetchSkills = async () => {
  try {
    const response = await API.get("/skill");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetch all education details
 * @returns {Promise<Array>}
 */

export const fetchEducation = async () => {
  try {
    const response = await API.get("/education");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Send contact form data
 * @param {Object} formData - Contact form data { name, email, message }
 * @returns {Promise<Object>}
 */
export const sendContactForm = async (formData) => {
  try {
    const response = await API.post("/contact", formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Handle API errors
 * @param {Object} error - Axios error object
 */
const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error("Response:", error.response.data);
    alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
  } else if (error.request) {
    // Request was made but no response received
    alert("Error: No response received from the server.");
  } else {
    // Something else caused the error
    alert(`Error: ${error.message}`);
  }
};

export default API;
