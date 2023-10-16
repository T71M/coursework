import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User } from "../../api/types/user";
import { Bus } from "../../api/types/bus";

export const useBusCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Bus) => {
      return api.buses.create(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleCreate = useCallback(
    async (data: Bus) => {
      toastId.current = toast.loading("Создание...");
      try {
        const res = await mutateAsync(data);
        await queryClient.refetchQueries(["BUSES_LIST"]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Автобус создан",
        });
        navigate(`/buses/${res.bus.id}`);
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
