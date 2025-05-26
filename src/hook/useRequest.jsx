import { ROUTES } from "../constants/routes";
import { deleteAuthCookie, getAuthCookie } from "../utils/authCookie";
import { http } from "../utils/https";
import { toastError } from "../utils/toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRequest = (endpoint, { method = "POST", onSuccess }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);

  const mutation = useMutation({
    mutationFn: async (dto) => {
      setCurrent(dto || null);
      const token = getAuthCookie();

      const options = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined;
      switch (method) {
        case "POST":
          return (await axios.post(http + endpoint, dto, options)).data;
        case "PUT":
          return (await axios.put(http + endpoint, dto, options)).data;
        case "PATCH":
          return (await axios.patch(http + endpoint, dto, options)).data;
        case "GET":
          return (
            await axios.get(http + endpoint + (dto ? String(dto) : ""), options)
          ).data;
        case "DELETE":
          return (
            await axios.delete(
              http + endpoint + (dto ? String(dto) : ""),
              options
            )
          ).data;
      }
    },
    onSuccess: (res) => {
      setCurrent(null);
      if (res.status !== 200) return toastError(res.message);
      onSuccess?.(res);
    },
    onError: (e) => {
      setCurrent(null);
      if (!e.response) return console.error(e);
      const { status, statusText } = e.response;
      if (statusText) {
        toastError(statusText);
      }
      if (status === 401) {
        deleteAuthCookie();
        navigate(ROUTES.INDEX);
      }
    },
  });

  const send = (param) => {
    mutation.mutate(param);
  };

  return {
    send,
    loading: mutation.isPending,
    current,
  };
};
