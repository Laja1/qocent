// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authApi } from "@/service/authApi";
import { siteApi } from "@/service/siteApi";
import { authStore } from "./authSlice";
import { dashboardStore } from "./dashboardSlice";
import { roomApi } from "@/service/roomApi";
import { houseApi } from "@/service/houseApi";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authStore.reducer,
  dashboard:dashboardStore.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [siteApi.reducerPath]: siteApi.reducer,
  [roomApi.reducerPath]:roomApi.reducer,
  [houseApi.reducerPath]:houseApi.reducer,
});

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  
  whitelist: ["auth","dashboard"], // Only persist the 'auth' slice
  // stateReconciler: false,
};

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(authApi.middleware, siteApi.middleware,houseApi.middleware,roomApi.middleware),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
