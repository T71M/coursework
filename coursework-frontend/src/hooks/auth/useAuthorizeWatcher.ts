import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useAuthorizeWatcher = () => {
  const { checkAuth, isAuthorized } = useAuth();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => console.log("successfully authorized"))
      .catch(() => console.error("authorization failed"))
      .finally(() => setCanRender(true));
  }, [checkAuth]);

  return {
    canRender,
    isAuthorized,
  };
};
