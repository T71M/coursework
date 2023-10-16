import { Box, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { FC, useState } from "react";
import { useRandomRoutes } from "../../../hooks/routes/useRandomRoutes";

import { IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";

import { RouteBlock } from "../../../components/RouteBlock";

export const RandomRoutes: FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const { routes } = useRandomRoutes(dayjs(date).toISOString());

  return (
    <Stack p={"1rem"} align="center">
      <Title>Случайные маршруты</Title>
      <DatePickerInput
        value={date}
        onChange={setDate}
        mb={"1rem"}
        minDate={dayjs().subtract(0, "day").toDate()}
        variant="filled"
        icon={<IconCalendar color="orange" />}
      />

      {routes?.map((route, i) => (
        <RouteBlock key={i} route={route} date={dayjs(date).toISOString()} />
      ))}
    </Stack>
  );
};
