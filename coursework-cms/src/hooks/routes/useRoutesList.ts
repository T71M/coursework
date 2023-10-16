import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useState } from "react";
import { Weekday } from "../../api/types/routes";

export const useRoutesList = () => {
  const [page, setPage] = useState(1);
  const [weekDayStart, setWeekDayStart] = useState<keyof typeof Weekday | null>(
    null
  );
  const [weekDayEnd, setWeekDayEnd] = useState<keyof typeof Weekday | null>(
    null
  );
  const [startPointId, setStartPoint] = useState<number | null>(null);
  const [endPointId, setEndPoint] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { data, ...rest } = useQuery(
    [
      "ROUTES_LIST",
      page,
      weekDayEnd,
      weekDayStart,
      startPointId,
      endPointId,
      query,
    ],
    () =>
      api.routes.readAll({
        page,
        perPage: 30,
        weekDayEnd,
        weekDayStart,
        startPointId,
        endPointId,
        search: query,
      })
  );

  return {
    data,
    setPage,
    weekDayStart,
    weekDayEnd,
    setWeekDayEnd,
    setWeekDayStart,
    setEndPoint,
    endPointId,
    startPointId,
    setStartPoint,
    query,
    setQuery,
    page,
    ...rest,
  };
};
