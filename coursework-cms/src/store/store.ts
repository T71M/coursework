import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";

// Slices

const reducer = combineReducers({
  user: userSlice.reducer,
});

export default configureStore({
  reducer,
  devTools: {
    actionCreators: {
      ...userSlice.actions,
    },
  },
});

export type AppState = ReturnType<typeof reducer>;
