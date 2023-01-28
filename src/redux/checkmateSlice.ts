import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CMState {
    valueCM: boolean
    reset: boolean
}

const initialState: CMState = {
    valueCM: false,
    reset: false
};

export const checkMateSlice = createSlice({
  name: 'checkMate',
  initialState,
  reducers: {
    checkMateState: (state, moveFromAction: PayloadAction<boolean>) => {
      state.valueCM = moveFromAction.payload;
    },
    clearTheBoard: (state, moveFromAction: PayloadAction<boolean>) => {
      state.reset = moveFromAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkMateState, clearTheBoard } = checkMateSlice.actions
// reducer
export default checkMateSlice.reducer