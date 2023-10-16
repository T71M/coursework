import { FC } from "react";
import { useSearchRoutes } from "../../hooks/routes/useSearchRoutes";
import { useSearchParams } from "react-router-dom";
import { Box, Stack } from "@mantine/core";
import { RouteBlock } from "../../components/RouteBlock";

export const FindedRoutes: FC = () => {
  const [params] = useSearchParams();
  const { routes } = useSearchRoutes(
    params.get("date")!,
    params.get("endPoint")!
  );

  return (
    <Box mt={"1rem"}>
      <Stack align="center">
        {routes?.data.map((route, i) => (
          <RouteBlock route={route} key={i} date={params.get("date")!} />
        ))}
      </Stack>
    </Box>
  );
};
