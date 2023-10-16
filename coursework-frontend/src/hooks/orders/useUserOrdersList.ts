import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/userService";
import { useMemo, useState } from "react";

export const useUserOrdersList = (userId?: number) => {
  const [page, setPage] = useState(1);
  const { data, ...rest } = useQuery(["USER_ORDERS", userId, page], () =>
    api.orders.readAll({ userId, page, perPage: 10 })
  );

  const totalPages = useMemo(() => {
    if (!data) return 0;

    return data.meta.totalPages;
  }, [data]);

  return { setPage, page, orders: data, totalPages, ...rest };
};
