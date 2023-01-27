import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MoveFromState {
    value: string;
}

const initialState: MoveFromState = {
    value: '',
};

export const moveFromSlice = createSlice({
  name: 'moveFrom',
  initialState,
  reducers: {
    moveFromState: (state, moveFromAction: PayloadAction<string>) => {
      state.value = moveFromAction.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const { moveFromState } = moveFromSlice.actions
// reducer
export default moveFromSlice.reducer