import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";

export const useOperator = (id?: number) => {
  const { data, ...rest } = useQuery(["OPERATOR", id], () => api.readUser(id));

  return { user: data, ...rest };
};
