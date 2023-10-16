import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";

export const usePointsList = () => {
  const { data, ...rest } = useQuery(["POINTS_LIST"], () =>
    api.points.readAll()
  );

  return { points: data, ...rest };
};
