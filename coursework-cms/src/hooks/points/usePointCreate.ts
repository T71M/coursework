import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { CreateRegionForm } from "../../api/types/regions";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Point } from "../../api/types/point";

export const usePointCreate = (regionId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Point) => {
      return api.points.create(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleCreate = useCallback(
    async (data: Point) => {
      toastId.current = toast.loading("Создание...");
      try {
        const res = await mutateAsync(data);
        await queryClient.refetchQueries(["REGIONS_CITY_LIST", regionId]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Город создан",
        });
        navigate(`/regions/region/${res.regionId}/cities/${res.id}`);
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

  return { handleCreate, ...rest };
};
