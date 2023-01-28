import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    boardValue: Array<Array<object>>
}

const initialState: BoardState = {
    boardValue: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    //the board original
    originalBoardState: (state, boardAction: PayloadAction<Array<Array<object>>>) => {
      state.boardValue = boardAction.payload;
    },

    //the board updated(after a move)
    updateTheBoardState: (state, boardAction: PayloadAction<Array<Array<object>>>) => {
        state.boardValue = boardAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { originalBoardState, updateTheBoardState } = boardSlice.actions
// reducer
export default boardSlice.reducer
