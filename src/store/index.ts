import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/service/authApi";
import { authStore } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authStore.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
