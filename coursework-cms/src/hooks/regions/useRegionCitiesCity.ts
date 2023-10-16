import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const useRegionsCitiesList = (id?: number) => {
  const [page, setPage] = useState<number>(1);
  const { data, ...rest } = useQuery(["REGIONS_CITY_LIST", id], () =>
    api.regions.getRegionCities({ page, perPage: 10 }, id)
  );

  return { cities: data, page, setPage, ...rest };
};
