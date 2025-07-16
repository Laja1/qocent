import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userEmail: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  userId: number | null;
}


const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userEmail: null,
  userFirstName: null,
  userLastName: null,
  userId: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
      console.log('Received payload:', action.payload); // Debug log
      state.token = action.payload.token || null;
      state.isAuthenticated = !!action.payload.token; // Only set true if token exists
      state.userEmail = action.payload.userEmail || null;
      state.userFirstName = action.payload.userFirstName || null;
      state.userLastName = action.payload.userLastName || null;
      state.userId = action.payload.userId ?? null;
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
