import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";

export const useRandomRoutes = (date: string) => {
  const { data, ...rest } = useQuery(["RANDOM_ROUTES", date], () =>
    api.routes.getRandom(date)
  );

  return { routes: data, ...rest };
};
