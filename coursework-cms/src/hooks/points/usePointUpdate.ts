import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

import { Point } from "../../api/types/point";

export const usePointUpdate = (regionId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Point) => {
      return api.points.update(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleUpdate = useCallback(
    async (data: Point) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await Promise.all([
          queryClient.refetchQueries(["REGION", data.id]),
          queryClient.refetchQueries(["REGIONS_CITY_LIST", regionId]),
        ]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Город обновлен",
        });
      } catch (e) {
        toast.update(toastId.current, {
          autoClose: 4000,
          render: "Ошибка",
          type: "error",
          isLoading: false,
        });
      }
    },
    [mutateAsync]
  );

  return { handleUpdate, ...rest };
};
