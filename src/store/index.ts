// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authStore } from "./authSlice";
import { dashboardStore } from "./dashboardSlice";
import { kotlinResourceApi } from "@/service/kotlin/resourceApi";
import { siteApi } from "@/service/kotlin/siteApi";
import { serviceApi } from "@/service/kotlin/serviceApi";
import { authApi } from "@/service/python/authApi";
import { accountStore } from "./accountSlice";
import { waitlistApi } from "@/service/kotlin/waitlistApi";
import { kotlinHouseApi } from "@/service/kotlin/houseApi";
import { roomApi } from "@/service/kotlin/roomApi";
import { formApi } from "@/service/python/formApi";
import { consoleApi } from "@/service/kotlin/consoleApi";
import { siteStore } from "./siteSlice";
import { pythonSiteApi } from "@/service/python/siteApi";
import { costApi } from "@/service/python/costApi";
import { organizationApi } from "@/service/python/organizationApi";
import { cloudServicesApi } from "@/service/python/cloudServericesApi";
import { invitationApi } from "@/service/python/invitationApi";

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authStore.reducer,
  dashboard:dashboardStore.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [siteApi.reducerPath]: siteApi.reducer,
  [pythonSiteApi.reducerPath]: pythonSiteApi.reducer,
  [kotlinHouseApi.reducerPath]:kotlinHouseApi.reducer,
  [kotlinResourceApi.reducerPath]:kotlinResourceApi.reducer,
  [serviceApi.reducerPath]:serviceApi.reducer,
  [organizationApi.reducerPath]:organizationApi.reducer,
  [cloudServicesApi.reducerPath]:cloudServicesApi.reducer,
  [invitationApi.reducerPath]:invitationApi.reducer,

  [waitlistApi.reducerPath]:waitlistApi.reducer,
  [roomApi.reducerPath]:roomApi.reducer,
  [costApi.reducerPath]:costApi.reducer,
 account:accountStore.reducer,
 [formApi.reducerPath]:formApi.reducer,
 [consoleApi.reducerPath]:consoleApi.reducer,
 site:siteStore.reducer
});

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  
  whitelist: ["auth","dashboard",'resourceList','account','site'], 
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
    }).concat(authApi.middleware,invitationApi.middleware,kotlinHouseApi.middleware,cloudServicesApi.middleware, costApi.middleware,  pythonSiteApi.middleware, siteApi.middleware,roomApi.middleware,kotlinResourceApi.middleware,serviceApi.middleware,organizationApi.middleware, waitlistApi.middleware,formApi.middleware,consoleApi.middleware,),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
