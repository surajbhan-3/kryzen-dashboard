// // development server
const API_BASE_URL = 'http://localhost:4500';
export const AUTH_BASE_URL ='http://localhost:4500';


// production server



export const getToken = () => localStorage.getItem("token");


const apiConfig = {
  baseURL: `${API_BASE_URL}/api/product`,

  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
  timeout: 5000, // Request timeout in milliseconds
};



export default apiConfig;