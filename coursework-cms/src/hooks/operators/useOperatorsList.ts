import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";

export const useOperatorsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, ...rest } = useQuery(["OPERATORS_LIST", page, search], () =>
    api.operators.readAll({ page, perPage: 30, search })
  );

  return { data, page, setPage, search, setSearch, ...rest };
};
