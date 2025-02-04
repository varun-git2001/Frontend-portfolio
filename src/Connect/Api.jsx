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
  return await apiRequest("GET", "/user");
};

/**
 * Fetch all projects
 * @returns {Promise<Array>}
 */
export const fetchProjects = async () => {
  return await apiRequest("GET", "/project");
};

/**
 * Fetch a project by ID
 * @param {number} id - Project ID
 * @returns {Promise<Object>}
 */
export const fetchProjectById = async (id) => {
  return await apiRequest("GET", `/project/${id}`);
};

/**
 * Fetch all skills
 * @returns {Promise<Array>}
 */
export const fetchSkills = async () => {
  return await apiRequest("GET", "/skill");
};

/**
 * Fetch all education details
 * @returns {Promise<Array>}
 */
export const fetchEducation = async () => {
  return await apiRequest("GET", "/education");
};

/**
 * Send contact form data
 * @param {Object} formData - Contact form data { name, email, message }
 * @returns {Promise<Object>}
 */
export const sendContactForm = async (formData) => {
  return await apiRequest("POST", "/contact", formData);
};

/**
 * Fetch all users
 * @returns {Promise<Array>}
 */
export const fetchUsers = async () => {
  return await apiRequest("GET", "/api/users");
};

/**
 * Generic API request handler
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} url - API endpoint
 * @param {Object} [data] - Request payload (for POST/PUT)
 * @returns {Promise<Object>}
 */
const apiRequest = async (method, url, data = null) => {
  try {
    const response = await API.request({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null; // Ensure function always returns a value
  }
};

/**
 * Handle API errors
 * @param {Object} error - Axios error object
 */
const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    console.error("Response:", error.response.data);
    alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
  } else if (error.request) {
    alert("Error: No response received from the server.");
  } else {
    alert(`Error: ${error.message}`);
  }
};

export default API;
