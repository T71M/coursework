import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Route } from "../../api/types/routes";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useCreateRoute = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Route) => {
      return api.routes.create(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleCreate = useCallback(
    async (data: Route) => {
      toastId.current = toast.loading("Создание...");
      try {
        const res = await mutateAsync(data);
        await queryClient.refetchQueries(["ROUTES_LIST"]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Регион создан",
        });
        navigate(`/routes/${res.id}`);
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
