import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useMemo, useState } from "react";

export const useUsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, ...rest } = useQuery(["USERS_LIST", page, search], () =>
    api.readAll({ page, perPage: 30, search })
  );

  const totalPages = useMemo(() => {
    if (!data) return 0;

    return data.meta.totalPages;
  }, [data]);

  return { data, page, setPage, totalPages, search, setSearch, ...rest };
};
