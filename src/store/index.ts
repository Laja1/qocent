// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authStore } from "./authSlice";
import { dashboardStore } from "./dashboardSlice";
import { authApi } from "@/service/python/authApi";
import { accountStore } from "./accountSlice";
import { formApi } from "@/service/python/formApi";
import { siteStore } from "./siteSlice";
import { costApi } from "@/service/python/costApi";
import { organizationApi } from "@/service/python/organizationApi";
import { cloudServicesApi } from "@/service/python/cloudServericesApi";
import { invitationApi } from "@/service/python/invitationApi";
import { accountsApi } from "@/service/python/accountsApi";
import { subscriptionApi } from "@/service/python/subscriptionApi";
import { pythonBaseApi } from "@/service/python/baseApi";
import { contextStore } from "./contextSlice";
import "@/service/python/businessInviteApi";
import "@/service/python/contextApi";
import { kotlinBaseApi } from "@/service/kotlin/baseApi";
import "@/service/kotlin/registerApis";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authStore.reducer,
  dashboard:dashboardStore.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [cloudServicesApi.reducerPath]: cloudServicesApi.reducer,
  [invitationApi.reducerPath]: invitationApi.reducer,
[accountsApi.reducerPath]:accountsApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [pythonBaseApi.reducerPath]: pythonBaseApi.reducer,
  [kotlinBaseApi.reducerPath]: kotlinBaseApi.reducer,
 account:accountStore.reducer,
 [formApi.reducerPath]:formApi.reducer,
 [costApi.reducerPath]:costApi.reducer,
 site:siteStore.reducer,
 context: contextStore.reducer,
});

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  
  whitelist: ["auth","dashboard",'resourceList','account','site','context'],
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
    }).concat(
      authApi.middleware,
      invitationApi.middleware,
      accountsApi.middleware,
      cloudServicesApi.middleware,
      costApi.middleware,
      organizationApi.middleware,
      subscriptionApi.middleware,
      pythonBaseApi.middleware,
      kotlinBaseApi.middleware,
      formApi.middleware,
    ),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
