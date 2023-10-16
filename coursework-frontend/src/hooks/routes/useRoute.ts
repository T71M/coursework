import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";

export const useRoute = (id?: number, date?: string | null) => {
  const { data, ...rest } = useQuery(["ROUTE", id, date], () =>
    api.routes.readOne(id, date)
  );

  return { route: data, ...rest };
};
