import axios from "axios";
import { baseURL } from "./constantUrls.js";

const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

//*************  request interceptor ********

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// *** reaponse interceptor;

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // checking for token expiration..
    statusCode = error.response.status;
    if (error.response && statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${baseURL}/auth/refreshToken`,
          {
            refreshToken,
          },
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
