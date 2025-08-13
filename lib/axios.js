import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000', // fallback to localhost
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // optional: if you're using cookies/session auth
});

export default axiosInstance;
