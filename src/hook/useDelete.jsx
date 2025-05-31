// src/hooks/useDelete.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { toastSuccess, toastError } from "../utils/toast";

export const useDelete = (endpoint, options = {}) => {
  const {
    keysToInvalidate = [],
    successMessage = "Eliminado correctamente",
    errorMessage = "Error al eliminar",
    onSuccess,
    onError,
  } = options;
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await apiClient.delete(`${endpoint}${id}/`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      toastSuccess(successMessage);
      
      // Invalidar queries para actualizar datos
      keysToInvalidate.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
      
      // Ejecutar callback personalizado si existe
      if (onSuccess) onSuccess(data, variables);
    },
    onError: (error, variables) => {
      toastError(`${errorMessage}: ${error.message}`);
      
      // Ejecutar callback personalizado si existe
      if (onError) onError(error, variables);
    }
  });

  return {
    delete: mutation.mutate,
    deleteAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data
  };
};