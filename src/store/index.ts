// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authApi } from "@/service/typescript/authApi";
import { authStore } from "./authSlice";
import { dashboardStore } from "./dashboardSlice";
import { roomApi } from "@/service/typescript/roomApi";
import { houseApi } from "@/service/typescript/houseApi";
import { resourceApi } from "@/service/typescript/resourceApi";
import { resourceListStore } from "./resourceListSlice";
import { kotlinResourceApi } from "@/service/kotlin/resourceApi";
import { siteApi } from "@/service/kotlin/siteApi";
import { serviceApi } from "@/service/kotlin/serviceApi";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authStore.reducer,
  dashboard:dashboardStore.reducer,
  resourceList:resourceListStore.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [siteApi.reducerPath]: siteApi.reducer,
  [roomApi.reducerPath]:roomApi.reducer,
  [houseApi.reducerPath]:houseApi.reducer,
  [resourceApi.reducerPath]:resourceApi.reducer,
  [kotlinResourceApi.reducerPath]:kotlinResourceApi.reducer,
  [serviceApi.reducerPath]:serviceApi.reducer
});

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  
  whitelist: ["auth","dashboard",'resourceList'], 
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
    }).concat(authApi.middleware, siteApi.middleware,houseApi.middleware,roomApi.middleware,resourceApi.middleware,kotlinResourceApi.middleware,serviceApi.middleware),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
