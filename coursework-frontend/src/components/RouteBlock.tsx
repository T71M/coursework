import { Box, Grid, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Route } from "../api/types/routes";
import { FC } from "react";
import { Weekday } from "../api/types/api";
import { IconArrowRightRhombus } from "@tabler/icons-react";
import { BusCondition } from "../api/types/bus";
import { ProjectNavigation } from "../router/ProjectRoutes";
import queryString from "query-string";
import { getSeatColors } from "../utils/getSeatColors";

export const RouteBlock: FC<{ route: Route; date: string }> = ({
  route,
  date,
}) => {
  const query = queryString.stringify({ date });
  return (
    <Box
      component={Link}
      to={ProjectNavigation.Race + `/${route.id}?${query}`}
      bg={"white"}
      sx={{
        borderRadius: "1rem",
        width: "fit-content",
        cursor: "pointer",
        boxShadow: "1px 2px 3px 3px rgba(0,0,0, 0.1)",
        color: "black",
        textDecoration: "none",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      px={"2rem"}
      py={"1rem"}
    >
      <Grid align="center" justify="space-between" w={"100%"} maw={700} m={0}>
        <Group mr={"2rem"}>
          <Stack spacing={0}>
            <Text>{route.startPoint.name}</Text>
            <Text size={"sm"} color="gray">
              {route.startPoint.region.name}
            </Text>
          </Stack>
          <Text mb={"1.22rem"} mr={"1rem"}>
            {Weekday[route.weekDayStart]} {route.startTime}
          </Text>
          <IconArrowRightRhombus size={"2rem"} color="orange" />
          <Stack spacing={0} ml={"1rem"}>
            <Group>
              <Text sx={{ position: "relative" }}>{route.endPoint.name}</Text>
              <Text>
                {Weekday[route.weekDayStart]} {route.endTime}
              </Text>
            </Group>
            <Text size={"sm"} color="gray">
              {route.endPoint.region.name}
            </Text>
          </Stack>
        </Group>

        <Text size={"xl"}>{route.price}₽</Text>
      </Grid>
      <Grid align="center" mt={"1rem"} sx={{ gap: "1rem" }}>
        <Group align="center">
          <Text size={"md"}>Автобус: {route.bus.name}</Text>
          <Text size={"md"}>
            Состояние: {BusCondition[route.bus.condition]}
          </Text>
        </Group>
        <Group align="center">
          <Text color={getSeatColors(route.bus.seats_count, route.freeSeats)}>
            {route.freeSeats} Свободных мест
          </Text>
        </Group>
      </Grid>
    </Box>
  );
};
