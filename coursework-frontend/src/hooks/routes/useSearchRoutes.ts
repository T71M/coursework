import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";

export const useSearchRoutes = (date: string, endPoint: string) => {
  const { data, ...rest } = useQuery(["SEARCHED_ROUTES", date, endPoint], () =>
    api.routes.search(date, endPoint)
  );

  return { routes: data, ...rest };
};
