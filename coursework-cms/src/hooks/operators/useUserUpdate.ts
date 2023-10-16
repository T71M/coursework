import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { User } from "../../api/types/user";

export const useOperatorUpdate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: User) => {
      return api.updateUser(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleUpdate = useCallback(
    async (data: User) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await Promise.all([
          queryClient.refetchQueries(["OPERATOR", data.id]),
          queryClient.refetchQueries(["OPERATORS_LIST"]),
        ]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Оператор обновлен",
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
