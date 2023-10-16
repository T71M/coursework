import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/adminService";
import { CreateRegionForm } from "../../api/types/regions";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegionCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data: CreateRegionForm) => {
      return api.regions.create(data);
    },
  });

  const toastId = useRef<Id | null>(null);

  const handleCreate = useCallback(
    async (data: CreateRegionForm) => {
      toastId.current = toast.loading("Создание...");
      try {
        const res = await mutateAsync(data);
        await queryClient.refetchQueries(["REGIONS_LIST"]);
        toast.update(toastId.current, {
          isLoading: false,
          autoClose: 4000,
          type: "success",
          render: "Регион создан",
        });
        navigate(`/region/${res.id}`);
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
