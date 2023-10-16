import { FC } from "react";

import { Box, Button, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowRightRhombus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Order } from "../../../../api/types/order";
import { useOrderCancel } from "../../../../hooks/orders/useOrderCancel";
import { getArriveDate } from "../../../../utils/getArriveDate";

interface Props {
  order: Order;
}

export const OrderItem: FC<Props> = ({ order }) => {
  const isAfter = dayjs(order.date).isAfter(dayjs());
  const endTime = order.route.endTime.split(":");
  const arriveDate = getArriveDate(order.route.weekDayStop, order.date)
    .set("hour", Number(endTime[0]))
    .set("minute", Number(endTime[1]));
  const { handleRemove } = useOrderCancel();
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "0.25rem",
        padding: "1rem",
        boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.2)",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.01)",
        },
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Title order={3}>Заказ №{order.id}</Title>
      <Grid justify="space-between" m={0} align="center">
        <Group>
          <Text weight={700}>{order.route.startPoint.name}</Text>
          <IconArrowRightRhombus
            fontSize={"1rem"}
            size={"2.5rem"}
            color="orange"
          />
          <Text weight={700}>{order.route.endPoint.name}</Text>
        </Group>
        <Text size={"xl"} weight={600}>
          {order.route.price * order.seat_count}₽
        </Text>
      </Grid>
      <Group>
        <Stack spacing={0}>
          <Text weight={600} size={"md"}>
            {dayjs(order.date).format("DD.MM.YYYY")}
          </Text>
          <Text size={"sm"}>{order.route.startTime}</Text>
        </Stack>
        <IconArrowRightRhombus
          color="orange"
          fontSize={"1.5rem"}
          size={"2rem"}
        />
        <Stack spacing={0}>
          <Text size={"md"} weight={600}>
            {arriveDate.format("DD.MM.YY")}
          </Text>
          <Text size={"sm"}>{arriveDate.format("HH:mm")}</Text>
        </Stack>
      </Group>

      <Group mt={"0.5rem"}>
        <Group spacing={5}>
          <Text weight={600}>Кол-во мест:</Text>
          <Text weight={400} inline>
            {order.seat_count}
          </Text>
        </Group>
      </Group>
      <Group position="right">
        <Button
          color="red"
          children={isAfter ? "Отменить" : "Удалить"}
          onClick={() => handleRemove(order.id, order.date)}
        />
      </Group>
    </Box>
  );
};
