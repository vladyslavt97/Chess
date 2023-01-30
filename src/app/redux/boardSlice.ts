import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    boardValue: Array<Array<object>>,
    id: number,
    myId: number,
    gameover: boolean,
    gameInserted: object
}

const initialState: BoardState = {
    boardValue: [],
    id: 0,
    myId: 0,
    gameover: false,
    gameInserted: {}
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
    isGameOverState: (state, myIdAction: PayloadAction<boolean>) => {
      console.log('user id from the clicked user in boardSlice', myIdAction.payload);
      state.gameover = myIdAction.payload;
    },
    thePlayersToColour: (state, myIdAction: PayloadAction<object>) => {
      console.log('user id from the clicked user in boardSlice', myIdAction.payload);
      state.gameInserted = myIdAction.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { originalBoardState, updateTheBoardState, selectedUserId, myId, isGameOverState, thePlayersToColour } = boardSlice.actions
// reducer
export default boardSlice.reducer
