import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ContextItem } from '@/models/response/contextResponse';

interface ContextState {
  activeContext: ContextItem | null;
  tokenContextClaim: string | null;
}

const initialState: ContextState = {
  activeContext: null,
  tokenContextClaim: null,
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setActiveContext: (
      state,
      action: PayloadAction<{ context: ContextItem; tokenContextClaim?: string }>
    ) => {
      state.activeContext = action.payload.context;
      if (action.payload.tokenContextClaim) {
        state.tokenContextClaim = action.payload.tokenContextClaim;
      }
    },
    clearContext: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const contextStore = {
  reducer: contextSlice.reducer,
  action: contextSlice.actions,
};
