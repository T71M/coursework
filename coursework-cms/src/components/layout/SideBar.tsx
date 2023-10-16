import { Box, NavLink, Navbar } from "@mantine/core";
import { FC } from "react";
import { menus } from "./menus";
import { useAuth } from "../../hooks/auth/useAuth";
import { AppRoles } from "../../api/types/user";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_WIDTH } from "../../constants";

export const SideBar: FC = () => {
  const { user } = useAuth();
  const roleId = user?.roleId;
  const location = useLocation();
  return (
    <Navbar
      fixed={false}
      pos={"static"}
      w={SIDEBAR_WIDTH}
      h={"calc(100vh - 4.375rem)"}
    >
      {menus.map((route, i) => {
        if (route.permission && roleId !== AppRoles.Superadmin) {
          return null;
        }
        return (
          <Box p={5} key={i}>
            <NavLink
              styles={{
                root: {
                  "&[data-active]": {
                    background: "rgba(250, 176, 5, 1)",
                    color: "black",
                  },
                  "&[data-active]:hover": {
                    background: "rgba(250, 176, 5, 0.8)",
                  },
                },
              }}
              h={50}
              fz={"1rem"}
              label={route.title}
              component={Link}
              to={route.link}
              icon={route.icon}
              active={location.pathname.includes(route.link)}
            />
          </Box>
        );
      })}
    </Navbar>
  );
};
