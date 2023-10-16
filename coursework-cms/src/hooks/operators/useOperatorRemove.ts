import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useOperatorRemove = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (id: number) => {
      return api.deleteUser(id);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleRemove = useCallback(
    async (id: number) => {
      toastId.current = toast.loading("Удаление...");
      try {
        await mutateAsync(id);
        await queryClient.refetchQueries(["OPERATORS_LIST"]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Оператор удален",
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

  return { handleRemove, ...rest };
};
