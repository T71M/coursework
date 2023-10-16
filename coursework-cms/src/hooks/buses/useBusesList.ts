import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const useBusesList = () => {
  const [page, setPage] = useState(1);
  const { data, ...rest } = useQuery(["BUSES_LIST"], () =>
    api.buses.readAll({ page, perPage: 30 })
  );

  return { buses: data, page, setPage, ...rest };
};
