import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  accountId: number;
  accountCode: string;
  accountName: string;
  accountUserCode: string;
  accountType: "INDIVIDUAL" | "ORGANIZATION";
  accountStatus: "ACTIVE" | "INACTIVE";
  memberStatus: "ACTIVE" | "INACTIVE";
  memberUserCode: string;
  memberCreatedAt: string | null;
  owner: "YES" | "NO";
}

const initialState: AccountState = {
  accountId: 0,
  accountCode: "",
  accountName: "",
  accountUserCode: "",
  accountType: "INDIVIDUAL",
  accountStatus: "ACTIVE",
  memberStatus: "ACTIVE",
  memberUserCode: "",
  memberCreatedAt: null,
  owner: "NO",
};

const accountSlice = createSlice({
  name: 'accountApi',
  initialState,
  reducers: {
    setAccountDetails: (state, action: PayloadAction<Partial<AccountState>>) => {
      Object.assign(state, action.payload);
    },
    clearAccountDetails: () => initialState,
  },
});

export const accountStore = {
  reducer: accountSlice.reducer,
  action: accountSlice.actions,
};
