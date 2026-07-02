// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authStore } from "./authSlice";
import { dashboardStore } from "./dashboardSlice";
import { authApi } from "@/service/authApi";
import { accountStore } from "./accountSlice";
import { formApi } from "@/service/formApi";
import { siteStore } from "./siteSlice";
import { costApi } from "@/service/costApi";
import { organizationApi } from "@/service/organizationApi";
import { cloudServicesApi } from "@/service/cloudServericesApi";
import { accountsApi } from "@/service/accountsApi";
import { subscriptionApi } from "@/service/subscriptionApi";
import { pythonBaseApi } from "@/service/pythonBaseApi";
import { contextStore } from "./contextSlice";
import { kotlinBaseApi } from "@/service/kotlinBaseApi";
import { invitationApi } from "@/service/invitationApi";
import "@/service/registerApis";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authStore.reducer,
  dashboard:dashboardStore.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [cloudServicesApi.reducerPath]: cloudServicesApi.reducer,
[accountsApi.reducerPath]:accountsApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [pythonBaseApi.reducerPath]: pythonBaseApi.reducer,
  [kotlinBaseApi.reducerPath]: kotlinBaseApi.reducer,
  [invitationApi.reducerPath]: invitationApi.reducer,
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
      accountsApi.middleware,
      cloudServicesApi.middleware,
      costApi.middleware,
      organizationApi.middleware,
      subscriptionApi.middleware,
      pythonBaseApi.middleware,
      kotlinBaseApi.middleware,
      invitationApi.middleware,
      formApi.middleware,
    ),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
