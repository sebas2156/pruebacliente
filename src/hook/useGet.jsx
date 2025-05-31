import { getParamsStr } from "../utils/getParamsStr";
import apiClient from "../api/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toastError } from "../utils/toast";

export const useGet = (endpoint, keys, options = {}) => {
  const { params, save = true, send = true, alert = true, onError } = options;
  const url = params ? `${endpoint}${getParamsStr(params)}` : endpoint;
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, ...rest } = useQuery({
    queryKey: keys,
    enabled: send,
    queryFn: async () => {
      try {
        const response = await apiClient.get(url);
        
        // Manejar nuevo token desde cuerpo o headers
        const newToken = response.data?.newToken || response.headers["x-new-token"];
        if (newToken) {
          localStorage.setItem("access_token", newToken);
          console.log("Token actualizado desde respuesta");
        }
        
        if (response.data.status && response.data.status !== 200) {
          throw new Error(response.data.message || "Error en la solicitud");
        }
        
        // Retornar datos estructurados
        return {
          data: response.data.data || response.data,
          raw: response.data
        };
      } catch (err) {
        if (alert) {
          toastError(err.response?.data?.message || err.message);
        }
        if (onError) {
          onError(err);
        }
        throw err;
      }
    },
    retry: (failureCount, error) => {
      return error.response?.status !== 401 && failureCount < 1;
    },
    retryDelay: 1000,
  });

  useEffect(() => {
    return () => {
      if (!save) {
        queryClient.removeQueries({ queryKey: keys });
      }
    };
  }, [queryClient, keys, save]);

  return { 
    data: data?.data,       // Datos normalizados
    rawData: data?.raw,     // Respuesta completa de la API
    loading: isLoading, 
    error, 
    refetch,
    isUnauthorized: error?.response?.status === 401,
    ...rest
  };
};