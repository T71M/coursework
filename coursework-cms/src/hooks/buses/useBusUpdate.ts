import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { Bus } from "../../api/types/bus";

export const useBusUpdate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Bus) => {
      return api.buses.update(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleUpdate = useCallback(
    async (data: Bus) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await Promise.all([
          queryClient.refetchQueries(["BUS", data.id]),
          queryClient.refetchQueries(["BUSES_LIST"]),
        ]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Автобус обновлен",
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
