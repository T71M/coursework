import { AppShell, Box, createStyles } from "@mantine/core";
import { FC } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HeaderNav } from "../components/layout/HeaderNav";
import { SideBar } from "../components/layout/SideBar";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../constants";
import { RegionsPage } from "../pages/app/regions/RegionsPage";
import { CreateRegionPage } from "../pages/app/regions/CreateRegion";
import { CitiesPage } from "../pages/app/regions/CitiesPage";
import { PointPage } from "../pages/app/points/PointPage";
import { OperatorsPage } from "../pages/app/operators/OperatorsPage";
import { CreateOperator } from "../pages/app/operators/CreateOperator";
import { BusesPage } from "../pages/app/buses/BusesPage";
import { CreateBusPage } from "../pages/app/buses/CreateBusPage";
import { RoutesPage } from "../pages/app/routes/RoutesPage";
import { CreateRoutePage } from "../pages/app/routes/CreateRoutePage";
import { UsersPage } from "../pages/app/users/UsersPage";
import { useAuthStore } from "../hooks/store/useAuthStore";
import { AppRoles } from "../api/types/user";

const useStyles = createStyles(() => ({
  root: {
    background: "#F8F9FA",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    padding: 0,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    display: "flex",
    flexDirection: "column",
  },
  app: {
    "& .mantine-AppShell-main": {
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
      minWidth: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
      minHeight: "100vh",
      overflow: "hidden",
    },
  },
}));

export const SecureRoutes: FC = () => {
  const { classes } = useStyles();
  const { state } = useAuthStore();
  const isSuper = state.user?.roleId === AppRoles.Superadmin;

  return (
    <AppShell
      header={<HeaderNav />}
      navbar={<SideBar />}
      className={classes.app}
    >
      <Box className={classes.root}>
        <Routes>
          <Route path="*" element={<Navigate to={"/regions"} />}></Route>
          <Route path="regions" element={<Outlet />}>
            <Route index element={<RegionsPage />} />
            <Route path="region/:regionId" element={<Outlet />}>
              <Route index element={<CreateRegionPage />} />
              <Route path="cities" element={<Outlet />}>
                <Route index element={<CitiesPage />} />
                <Route path=":cityId" element={<PointPage />} />
                <Route path="create" element={<PointPage />} />
              </Route>
            </Route>
            <Route path="create" element={<CreateRegionPage />} />
          </Route>
          {isSuper && (
            <Route path="operators" element={<Outlet />}>
              <Route index element={<OperatorsPage />} />
              <Route path="create" element={<CreateOperator />} />
              <Route path=":id" element={<CreateOperator />} />
            </Route>
          )}
          <Route path="buses" element={<Outlet />}>
            <Route index element={<BusesPage />} />
            <Route path="create" element={<CreateBusPage />} />
            <Route path=":id" element={<CreateBusPage />} />
          </Route>
          <Route path="routes" element={<Outlet />}>
            <Route index element={<RoutesPage />} />
            <Route path="create" element={<CreateRoutePage />} />
            <Route path=":id" element={<CreateRoutePage />} />
          </Route>
          <Route path="users" element={<Outlet />}>
            <Route index element={<UsersPage />} />
            <Route path=":id" element={<CreateOperator />} />
          </Route>
        </Routes>
      </Box>
    </AppShell>
  );
};
