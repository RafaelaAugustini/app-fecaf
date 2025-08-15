import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  isLoggedIn: boolean;
  name: string;
}

const initialState: CounterState = {
  isLoggedIn: false,
  name: '',
};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    storeSession: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    removeSession: state => {
      state.isLoggedIn = false;
      state.name = '';
    },
  },
});

export const { storeSession, removeSession } = authSlice.actions;

export default authSlice.reducer;
