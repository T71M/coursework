import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { CreateRegionForm } from "../../api/types/regions";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegionRemove = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (id: number) => {
      return api.regions.delete(id);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleRemove = useCallback(
    async (id: number) => {
      toastId.current = toast.loading("Удаление...");
      try {
        await mutateAsync(id);
        await queryClient.refetchQueries(["REGIONS_LIST"]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Регион удален",
        });
        navigate(`/regions`);
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
