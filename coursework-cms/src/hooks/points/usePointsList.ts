import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const usePointsList = () => {
  const [page, setPage] = useState(1);
  const { data, ...rest } = useQuery(["POINTS_LIST"], () =>
    api.points.readAll({ page, perPage: 30 })
  );

  return { points: data, page, setPage, ...rest };
};
