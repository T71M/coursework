import { Box, Group, Loader, Pagination, Stack, Title } from "@mantine/core";
import { FC } from "react";

import { OrderItem } from "./OrderItem";
import { useOrdersList } from "../../../../hooks/orders/useOrdersList";

import { useParams } from "react-router-dom";

export const OrdersBlock: FC = () => {
  const { id } = useParams();
  const { orders, isLoading, page, setPage, totalPages } = useOrdersList(
    Number(id)
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
