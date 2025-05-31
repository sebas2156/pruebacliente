// src/services/sucursalService.js
import { useGet } from "../hook/useGet";

export const useSucursales = () => {
  const { data, loading, error, refetch } = useGet(
    "sucursal/sucursal/",
    ["sucursales"],
    {
      params: {},
      alert: false,
    }
  );

  return {
    sucursales: data?.data || [],
    loading,
    error,
    refetch,
  };
};