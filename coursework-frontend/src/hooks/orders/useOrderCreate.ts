import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/userService";
import { Order } from "../../api/types/order";
import { useCallback, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useOrderCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (data: Order) => api.orders.create(data),
  });
  const toastId = useRef<Id | null>();

  const handleCreate = useCallback(
    async (data: Order) => {
      toastId.current = toast.loading("Бронирование...");
      try {
        const res = await mutateAsync(data);
        console.debug(res);
        queryClient.refetchQueries(["ROUTE", data.routeId]);
        toast.update(toastId.current, {
          type: "success",
          autoClose: 4000,
          closeButton: true,
          render: "Места успешно забронированы",
          isLoading: false,
        });
      } catch {
        toast.update(toastId.current, {
          type: "error",
          render: "Ошибка",
          closeButton: true,
          autoClose: 4000,
          isLoading: false,
        });
      }
    },
    [mutateAsync]
  );

  return { handleCreate, ...rest };
};
