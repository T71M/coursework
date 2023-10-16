import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Header,
  Image,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { FC } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { useLogin } from "../hooks/auth/useLogin";
import { IconLogout } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import icon from "../assets/logoMob.svg";
import { Link } from "react-router-dom";
import { ProjectNavigation } from "../router/ProjectRoutes";

const useStyles = createStyles(() => ({
  root: {
    position: "static",
    padding: "1rem",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    cursor: "pointer",
  },
}));

export const HeaderNav: FC = () => {
  const { classes } = useStyles();
  const { user, logout } = useAuth();
  const { openAuthModal } = useLogin();

  const onLogout = () => {
    modals.openConfirmModal({
      title: "Выход",
      centered: true,
      children: <Text size={"xl"}>Вы уверены, что хотите выйти?</Text>,
      labels: { confirm: "Выйти", cancel: "Отменить" },
      confirmProps: {
        bg: "red !important",
      },
      onConfirm: () => logout(),
    });
  };

  return (
    <Header height={"fit-content"} className={classes.root}>
      <div className={classes.flex}>
        <Link to={ProjectNavigation.Home}>
          <Group spacing={5} align="center">
            <Image src={icon} width={198} height={55} />
            <Title
              ml={"-140px"}
              sx={{ textDecoration: "none !important", color: "black" }}
            >
              Автовокзал
            </Title>
          </Group>
        </Link>
        {!!user ? (
          <Group spacing={10} align="center">
            <Avatar
              component={Link}
              to={ProjectNavigation.Profile}
              size={50}
              color="orange"
              radius={"50%"}
              className={classes.avatar}
            />
            <ActionIcon color="red" onClick={() => onLogout()}>
              <IconLogout />
            </ActionIcon>
          </Group>
        ) : (
          <Button
            color="yellow"
            variant="outline"
            children="Войти или Зарегистрироваться"
            onClick={() => openAuthModal()}
          />
        )}
      </div>
    </Header>
  );
};
