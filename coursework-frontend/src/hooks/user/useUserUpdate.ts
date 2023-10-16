import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/userService";
import { User } from "../../api/types/user";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useUserUpdate = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (data: User) => api.updateUser(data),
  });
  const queryClient = useQueryClient();
  const toastId = useRef<Id | null>(null);
  const handleUpdate = useCallback(
    async (data: User) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await queryClient.refetchQueries(["CURRENT_USER"]);
        await queryClient.refetchQueries(["USER", data.id]);
        toast.update(toastId.current, {
          render: "Профиль успешно обновлен!",
          isLoading: false,
          autoClose: 4000,
          type: "success",
          closeButton: true,
        });
      } catch {
        toast.update(toastId.current, {
          render: "Ошибка!",
          isLoading: false,
          autoClose: 4000,
          type: "error",
          closeButton: true,
        });
      }
    },
    [mutateAsync]
  );

  return { handleUpdate, ...rest };
};
