import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    boardValue: Array<Array<object>>,
    id: number,
    myId: number
}

const initialState: BoardState = {
    boardValue: [],
    id: 0,
    myId: 0
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    //the board original
    originalBoardState: (state, boardAction: PayloadAction<Array<Array<object>>>) => {
      console.log('boardAction: ', boardAction);
      
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
    myId: (state, myIdAction: PayloadAction<number>) => {
      console.log('user id from the clicked user in boardSlice', myIdAction.payload);
      state.myId = myIdAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { originalBoardState, updateTheBoardState, selectedUserId, myId } = boardSlice.actions
// reducer
export default boardSlice.reducer
