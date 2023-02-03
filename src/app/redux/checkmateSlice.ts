import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CheckMateState {
    valueChechMate: boolean,
    reset: boolean
}

const initialState: CheckMateState = {
    valueChechMate: false,
    reset: false
};

export const checkMateSlice = createSlice({
  name: 'checkMate',
  initialState,
  reducers: {
    checkMateState: (state, moveFromAction: PayloadAction<boolean>) => {
      state.valueChechMate = moveFromAction.payload;
    },
    clearTheBoard: (state, moveFromAction: PayloadAction<boolean>) => {
      state.reset = moveFromAction.payload;
    },
    resetTheStateofReset: (state, moveFromAction: PayloadAction<boolean>) => {
      state.reset = moveFromAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkMateState, clearTheBoard, resetTheStateofReset } = checkMateSlice.actions
// reducer
export default checkMateSlice.reducer