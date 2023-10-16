import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";

export const useUser = (id?: number) => {
  const { data, ...rest } = useQuery(["USER", id], () => api.getUser(id));

  return { user: data, ...rest };
};
