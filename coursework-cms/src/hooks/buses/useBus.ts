import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";

export const useBus = (id?: number) => {
  const { data, ...rest } = useQuery(["BUS", id], () => api.buses.readOne(id));

  return { bus: data, ...rest };
};
