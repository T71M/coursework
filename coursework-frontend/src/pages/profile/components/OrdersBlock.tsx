import { Box, Group, Loader, Pagination, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { useAuthStore } from "../../../hooks/store/useAuthStore";
import { useUserOrdersList } from "../../../hooks/orders/useUserOrdersList";
import { OrderItem } from "./OrderItem";

export const OrdersBlock: FC = () => {
  const { state } = useAuthStore();
  const { orders, isLoading, page, setPage, totalPages } = useUserOrdersList(
    state.user?.id
  );
  return (
    <Box>
      <Title mt={"md"}>Заказы</Title>
      <Group position="center">{isLoading && <Loader />}</Group>
      <Stack mt={"1rem"} align="center">
        {orders?.data.map((order, i) => (
          <OrderItem order={order} key={i} />
        ))}
        <Pagination value={page} onChange={setPage} total={totalPages} />
      </Stack>
    </Box>
  );
};
