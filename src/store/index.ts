import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/service/authApi";
import { authStore } from "./authSlice";
import { siteApi } from "@/service/siteApi";

export const store = configureStore({
  reducer: {
    auth: authStore.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, siteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
