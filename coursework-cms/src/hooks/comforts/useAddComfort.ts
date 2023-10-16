import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

interface Params {
  busId: number;
  comfortId: number;
}

export const useAddComfort = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({ busId, comfortId }: Params) =>
      api.buses.addComfort(busId, comfortId),
  });
  const id = useRef<Id | null>(null);
  const queryClient = useQueryClient();

  const handleAdd = useCallback(
    async (data: Params) => {
      id.current = toast.loading("Добавление...");
      try {
        await mutateAsync(data);
        await queryClient.refetchQueries(["BUS", data.busId]);
        toast.update(id.current, {
          render: "Удобство добавлено!",
          isLoading: false,
          autoClose: 4000,
          closeButton: true,
          type: "success",
        });
      } catch {
        toast.update(id.current, {
          render: "Ошибка!",
          isLoading: false,
          autoClose: 4000,
          closeButton: true,
          type: "error",
        });
      }
    },
    [mutateAsync]
  );

  return { handleAdd, ...rest };
};
