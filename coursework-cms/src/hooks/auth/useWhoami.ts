import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { api } from "../../api/adminService";

export const useWhoami = () => {
  const { data, refetch, isLoading, isError, remove } = useQuery(
    ["CURRENT_USER"],
    () => api.whoami(),
    {
      retry: 1,
    }
  );

  return {
    data,
    refetch,
    isLoading,
    isError,
    remove,
  };
};
