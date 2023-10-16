import { FC } from "react";

import { Loader } from "@mantine/core";
import { useAuthorizeWatcher } from "../hooks/auth/useAuthorizeWatcher";

// Props
type ProviderProps = {
  publicRoutes: React.ReactNode;
  privateRoutes: React.ReactNode;
};

// Component
export const AuthProvider: FC<ProviderProps> = ({
  publicRoutes,
  privateRoutes,
}) => {
  const { isAuthorized, canRender } = useAuthorizeWatcher();

  if (!canRender) return <Loader />;

  return isAuthorized ? <>{privateRoutes}</> : <>{publicRoutes}</>;
};
