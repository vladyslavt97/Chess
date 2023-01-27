import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LegalMovesState {
    value: string;
}

const initialState: LegalMovesState = {
    value: '',
};

export const legalMovesSlice = createSlice({
  name: 'legalMoves',
  initialState,
  reducers: {
    legalMovesState: (state, moveFromAction: PayloadAction<string>) => {
      state.value = moveFromAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { legalMovesState } = legalMovesSlice.actions
// reducer
export default legalMovesSlice.reducer