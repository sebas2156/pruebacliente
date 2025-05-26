import { useState, useEffect } from 'react';
import baseService from '../api/baseservice';

const useCrud = (resourcePath) => {
  const service = baseService(resourcePath);

  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async (params = {}) => {
    setLoading(true);
    try {
      const response = await service.getAll(params);
      setItems(response.data.items || response.data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchById = async (id) => {
    setLoading(true);
    try {
      const response = await service.getById(id);
      setItem(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      const response = await service.create(data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const response = await service.update(id, data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await service.remove(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    items,
    item,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
};

export default useCrud;
