import { useCallback, useMemo } from "react";

import { useWhoami } from "./useWhoami";

import tokenStorage from "../../utils/tokenStorage";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const { data, remove, refetch, isError } = useWhoami();
  const { state, logOut, logIn } = useAuthStore();

  const isAuthorized = useMemo(() => {
    return Boolean(state.isLoggedIn && !!data);
  }, [state.isLoggedIn, data]);

  const logout = useCallback(() => {
    console.log("logout");
    tokenStorage.removeToken();
    remove();
    logOut();
  }, [remove, logOut]);

  const checkAuth = useCallback(async () => {
    try {
      const token = tokenStorage.getToken();
      console.log("checking auth token", token);
      if (!token) return;

      const res = await refetch();

      if (!res) return;

      logIn(res.data!.data);
      return res;
    } catch (e) {
      logout();
    }
  }, [refetch, logIn, logout]);

  return {
    user: data?.data,
    isAuthorized,
    checkAuth,
    isError,
    logout,
  };
};
