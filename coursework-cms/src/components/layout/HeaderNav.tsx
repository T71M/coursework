import { FC } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { ActionIcon, Badge, Grid, Group, Header, Title } from "@mantine/core";
import { getRole } from "../../utils";
import { IconLogout } from "@tabler/icons-react";

export const HeaderNav: FC = () => {
  const { logout, user } = useAuth();

  return (
    <Header height={70} fixed={false} sx={{ position: "static" }} px={"1rem"}>
      <Grid h={"100%"} m={0} align="center" justify="space-between">
        <Title order={1}>Автовокзал</Title>

        <Group spacing={8}>
          <Badge p={"0.5rem"} fz={"1rem"} color="yellow">
            {getRole(user?.roleId)}
          </Badge>
          <ActionIcon onClick={() => logout()}>
            <IconLogout size={"2rem"} color="red" />
          </ActionIcon>
        </Group>
      </Grid>
    </Header>
  );
};
