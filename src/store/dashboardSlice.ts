import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProviderType = 'aws' | 'huawei' |'azure'|'gcp';

interface DashboardState {
  provider: ProviderType | '';
}

const initialState: DashboardState = {
  provider: '',
};


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ProviderType>) => {
      state.provider = action.payload;
    },
  },
});

export const dashboardStore = {
  reducer: dashboardSlice.reducer,
  action: dashboardSlice.actions,
};
