import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MoveFromState {
    value: string;
    valueSelected: boolean
}

const initialState: MoveFromState = {
    value: '',
    valueSelected: false
};

export const moveFromSlice = createSlice({
  name: 'moveFrom',
  initialState,
  reducers: {
    moveFromState: (state, moveFromAction: PayloadAction<string>) => {
      state.value = moveFromAction.payload;
    },
    clearTheMoveFrom: (state, moveFromAction: PayloadAction<string>) => {
      state.value = moveFromAction.payload;
    },
    isPieceSelected: (state, selectedAction: PayloadAction<boolean>) => {
      state.valueSelected = selectedAction.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { moveFromState, isPieceSelected, clearTheMoveFrom } = moveFromSlice.actions
// reducer
export default moveFromSlice.reducer