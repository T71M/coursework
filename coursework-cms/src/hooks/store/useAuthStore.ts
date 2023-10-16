import { useCallback } from "react";

import { User } from "../../api/types/user";
import userSlice from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";

export const useAuthStore = () => {
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const logIn = useCallback(
    (user: User) => {
      dispatch(userSlice.actions.login(user));
    },
    [dispatch]
  );

  const logOut = useCallback(() => {
    dispatch(userSlice.actions.logout());
  }, [dispatch]);

  return {
    state,
    logIn,
    logOut,
  };
};
