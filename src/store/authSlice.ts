import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  privileges: string[];
  isAuthenticated: boolean;
  isBusiness: boolean;
  userEmail: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  userId: string | null;
  businessId: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  privileges: [],
  isBusiness: false,
  userEmail: null,
  userFirstName: null,
  userLastName: null,
  userId: null,
  businessId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.token = action.payload.token || null;
      state.privileges = action.payload.privileges || [];
      state.isAuthenticated = !!action.payload.token;
      state.isBusiness = action.payload.isBusiness ?? false;
      state.userEmail = action.payload.userEmail || null;
      state.userFirstName = action.payload.userFirstName || null;
      state.userLastName = action.payload.userLastName || null;
      state.userId = action.payload.userId ?? null;
      state.businessId = action.payload.businessId ?? null;
    },
    logout: (state) => {
      Object.assign(state, initialState); // reset all values
    },
  },
  
});

export const authStore = {
  reducer: authSlice.reducer,
  action: authSlice.actions,
};
