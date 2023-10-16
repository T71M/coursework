import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../api/types/user";

type UserState = {
  isLoggedIn: boolean;
  user?: User;
};

const initialState: UserState = {
  isLoggedIn: false,
  user: undefined,
};

export default createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (s, action: PayloadAction<User>) => {
      s.isLoggedIn = true;
      s.user = action.payload;
    },
    logout: (s) => {
      s.isLoggedIn = false;
      s.user = undefined;
    },
  },
});
