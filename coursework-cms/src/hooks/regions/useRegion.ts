import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const useRegion = (id?: number) => {
  const { data, ...rest } = useQuery(["REGION", id], () =>
    api.regions.readOne(id)
  );

  return { region: data, ...rest };
};
