import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";

export const usePoint = (id?: number) => {
  const { data, ...rest } = useQuery(["POINT", id], () =>
    api.points.readOne(id)
  );

  return { point: data, ...rest };
};
