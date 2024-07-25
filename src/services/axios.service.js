import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

export const Axios = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

// create common axios call
export const axiosGetRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const axiosPostRequest = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const axiosPutRequest = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const axiosDeleteRequest = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const axiosCustomRequest = async (
  endpoint,
  method = "GET",
  data = {}
) => {
  try {
    const response = await axiosInstance({ method, url: endpoint, data });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
