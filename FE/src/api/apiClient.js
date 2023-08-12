import axios from "axios";
const API_URL = "http://localhost:9000";

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";
  config.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";

  return config;
});

export const getClassList = async () => {
  try {
    const response = await apiClient.get("/class");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default apiClient;
