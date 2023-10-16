import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Region } from "../../api/types/regions";
import { Route } from "../../api/types/routes";

export const useRouteUpdate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Route) => {
      return api.routes.update(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleUpdate = useCallback(
    async (data: Route) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await queryClient.refetchQueries(["ROUTE", data.id]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Регион обновлен",
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
