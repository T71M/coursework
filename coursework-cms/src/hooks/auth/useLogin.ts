import { useCallback, useContext } from "react";
import { LoginData } from "../../api/types/auth";
import { useAuth } from "./useAuth";

import { useAuthStore } from "../store/useAuthStore";
import tokenStorage from "../../utils/tokenStorage";
import { api } from "../../api/adminService";

export const useLogin = () => {
  const { logIn } = useAuthStore();
  const { checkAuth } = useAuth();

  const handleLogin = useCallback(
    async (values: LoginData) => {
      const response = await api.login(values);
      console.debug(response);

      console.log("Token", response.data);
      tokenStorage.setToken(response.data.token);

      const user = await checkAuth();
      console.log("[SIGN_IN]", user?.data?.data);
      if (user && user.data) {
        logIn(user.data.data);
      }
    },
    [logIn]
  );

  return {
    handleLogin,
  };
};
