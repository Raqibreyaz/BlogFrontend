import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

