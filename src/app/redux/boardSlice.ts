import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    boardValue: Array<Array<object>>,
    id: number
}

const initialState: BoardState = {
    boardValue: [],
    id: 0
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
    selectedUserId: (state, userAction: PayloadAction<number>) => {
      console.log('user id from the clicked user in boardSlice', userAction.payload);
      state.id = userAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { originalBoardState, updateTheBoardState, selectedUserId } = boardSlice.actions
// reducer
export default boardSlice.reducer
