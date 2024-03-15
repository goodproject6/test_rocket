import axios from "axios";
import { API_BASE_URL } from "./config";
import {
  getUserTokenCookie,
  removeUserTokenCookie,
} from "./cookieUtility";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getUserTokenCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // If the response is good, just return it
    return response;
  },
  (error) => {
    // If you receive a 401 error, remove the token
    if (error.response && error.response.status === 401) {
      removeUserTokenCookie();
    }
    return Promise.reject(error);
  }
);

export default api;
