import { AppShell, Box } from "@mantine/core";
import { FC } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HeaderNav } from "../components/HeaderNav";
import { useAuthorizeWatcher } from "../hooks/auth/useAuthorizeWatcher";
import { HomePage } from "../pages/home/HomePage";
import { RacesPage } from "../pages/races/RacesPage";
import { RoutePage } from "../pages/route/RoutePage";
import { ProfilePage } from "../pages/profile/ProfilePage";

export enum ProjectNavigation {
  Home = "/home",
  Races = "/races",
  Race = "/race",
  Profile = "/profile",
}

export const ProjectRoutes: FC = () => {
  const { isAuthorized } = useAuthorizeWatcher();

  return (
    <AppShell
      header={<HeaderNav />}
      styles={{
        main: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "#f8f8f8",
        }}
      >
        <Routes>
          <Route path={ProjectNavigation.Home} element={<Outlet />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path={ProjectNavigation.Races} element={<Outlet />}>
            <Route index element={<RacesPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ProjectNavigation.Home} />} />
          <Route index element={<Navigate to={ProjectNavigation.Home} />} />
          <Route path={ProjectNavigation.Race} element={<Outlet />}>
            <Route index element={<Navigate to={ProjectNavigation.Home} />} />
            <Route path=":id" element={<RoutePage />} />
          </Route>
          <Route path={ProjectNavigation.Profile} element={<ProfilePage />} />
        </Routes>
      </Box>
    </AppShell>
  );
};
