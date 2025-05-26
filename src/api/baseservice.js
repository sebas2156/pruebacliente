import apiClient from './apiclient';

const baseService = (resourcePath) => ({
  getAll: async (skip = 0, limit = 10) => {
    const res = await apiClient.get(`/${resourcePath}/?skip=${skip}&limit=${limit}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await apiClient.get(`/${resourcePath}/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await apiClient.post(`/${resourcePath}/`, data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await apiClient.put(`/${resourcePath}/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await apiClient.delete(`/${resourcePath}/${id}`);
    return res.data;
  }
});

export default baseService;
