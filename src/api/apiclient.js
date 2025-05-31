import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor de solicitud
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";
  
  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Interceptor de respuesta
apiClient.interceptors.response.use(response => {
  const newToken = response.headers["x-new-token"];
  if (newToken) {
    localStorage.setItem("access_token", newToken);
    console.log("Token actualizado desde interceptor");
  }
  return response;
}, error => {
  if (error.response?.status === 401) {
    console.log("Token inválido, limpiando almacenamiento");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
  return Promise.reject(error);
});

export default apiClient;