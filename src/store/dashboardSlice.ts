import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProviderType = 'aws' | 'huawei';

interface dashboardState {
  provider: ProviderType | '';
}

const initialState: dashboardState = {
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
