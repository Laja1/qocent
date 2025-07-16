import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProviderType = 'aws' | 'huawei';

interface DashboardState {
  provider: ProviderType | '';
  providerId: number;
}

const initialState: DashboardState = {
  provider: '',
  providerId: 0,
};

const providerIdMap: Record<ProviderType, number> = {
  aws: 0,
  huawei: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ProviderType>) => {
      state.provider = action.payload;
      state.providerId = providerIdMap[action.payload];
    },
  },
});

export const dashboardStore = {
  reducer: dashboardSlice.reducer,
  action: dashboardSlice.actions,
};
