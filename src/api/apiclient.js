import axios from "axios";
import { getAuthCookie, setAuthCookie } from "../utils/authCookie";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitud: agrega token desde cookie
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: guarda nuevo token en cookie si viene en encabezado
apiClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-new-token"];
    if (newToken) {
      setAuthCookie(newToken);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
