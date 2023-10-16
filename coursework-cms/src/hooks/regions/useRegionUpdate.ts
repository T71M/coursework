import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Region } from "../../api/types/regions";

export const useRegionUpdate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: Region) => {
      return api.regions.update(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleUpdate = useCallback(
    async (data: Region) => {
      toastId.current = toast.loading("Обновление...");
      try {
        await mutateAsync(data);
        await queryClient.refetchQueries(["REGION", data.id]);
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
