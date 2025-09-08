import type { SiteData } from "@/models/response/siteResponse";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SiteData[] = []; 

const site = createSlice({
  name: "site",
  initialState,
  reducers: {
    setSiteDetails: (state, action: PayloadAction<SiteData[]>) => {
      console.log(state)
      return action.payload; // replace array with new sites
      
    },
    clearSiteDetails: () => initialState,
  },
});

export const siteStore = {
  reducer: site.reducer,
  action: site.actions,
};
