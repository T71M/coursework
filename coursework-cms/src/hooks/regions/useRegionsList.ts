import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const useRegionsList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, ...rest } = useQuery(["REGIONS_LIST"], () =>
    api.regions.readAll({ page, perPage: 10 })
  );

  return { regions: data, page, setPage, ...rest };
};
