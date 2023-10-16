import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";

export const useRoute = (id?: number) => {
  const { data, ...rest } = useQuery(["ROUTE", id], () =>
    api.routes.readOne(id)
  );

  return { route: data, ...rest };
};
