import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/userService";
import { useCallback } from "react";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";
import { Text } from "@mantine/core";

export const useOrderCancel = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (id: number) => api.orders.remove(id),
  });
  const queryClient = useQueryClient();

  const handleRemove = useCallback(
    async (id: number, date: string) => {
      const remove = async () => {
        await mutateAsync(id);
        await queryClient.refetchQueries(["USER_ORDERS"]);
      };

      const data = dayjs(date);
      const isAfter = data.isAfter(dayjs());
      modals.openConfirmModal({
        title: isAfter ? "Отмена" : "Удаление",
        centered: true,
        confirmProps: { color: "red" },
        labels: {
          confirm: isAfter ? "Отменить" : "Удалить",
          cancel: "Вернуться",
        },
        children: (
          <>
            {!!isAfter && (
              <Text weight={600}>
                Вы действительно хотите отменить бронирование?
              </Text>
            )}
            {!isAfter && (
              <Text weight={600}>Вы действительно хотите удалить запись?</Text>
            )}
          </>
        ),
        onConfirm: async () => await remove(),
      });
    },
    [mutateAsync]
  );

  return { handleRemove, ...rest };
};
