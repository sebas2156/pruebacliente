// src/utils/endpointUtils.js
export const normalizeEndpoint = (endpoint, id = null) => {
  // Remover barra final si existe
  const cleanEndpoint = endpoint.endsWith('/') 
    ? endpoint.slice(0, -1) 
    : endpoint;
  
  return id ? `${cleanEndpoint}/${id}` : cleanEndpoint;
};