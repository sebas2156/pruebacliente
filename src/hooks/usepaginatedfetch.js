import { useState, useEffect } from 'react';
import baseService from '../api/baseservice';

const usePaginatedResource = (resourcePath, skip = 0, limit = 10) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const service = baseService(resourcePath);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await service.getAll(skip, limit);
        setItems(data.items);
        setTotal(data.total);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resourcePath, skip, limit]);

  return { items, total, loading, error, refetch: () => service.getAll(skip, limit).then(data => {
    setItems(data.items);
    setTotal(data.total);
  }) };
};

export default usePaginatedResource;
