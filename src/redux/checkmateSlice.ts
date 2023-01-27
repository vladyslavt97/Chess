import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CMState {
    valueCM: boolean
}

const initialState: CMState = {
    valueCM: false
};

export const checkMateSlice = createSlice({
  name: 'checkMate',
  initialState,
  reducers: {
    checkMateState: (state, moveFromAction: PayloadAction<boolean>) => {
      state.valueCM = moveFromAction.payload;
    },
    // clearTheMoveFrom: (state, moveFromAction: PayloadAction<string>) => {
    //   state.value = moveFromAction.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { checkMateState } = checkMateSlice.actions
// reducer
export default checkMateSlice.reducer