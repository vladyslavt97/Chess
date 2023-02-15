import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    boardValue: Array<Array<object>>,
    id: number,
    myId: number,
    gameover: boolean,
    gameInserted: object,
    myUserInfor: object,
    userIdValue: boolean
}

const initialState: BoardState = {
    boardValue: [],
    id: 0,
    myId: 0,
    gameover: false,
    gameInserted: {},
    myUserInfor: {},
    userIdValue: false
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    originalBoardState: (state, boardAction: PayloadAction<Array<Array<object>>>) => {
      console.log('boardAction: ', boardAction);
      state.boardValue = boardAction.payload;
    },
    updateTheBoardState: (state, boardAction: PayloadAction<Array<Array<object>>>) => {
        state.boardValue = boardAction.payload;
    },
    selectedUserId: (state, userAction: PayloadAction<number>) => {
      state.id = userAction.payload;
    },
    myId: (state, myIdAction: PayloadAction<number>) => {
      state.myId = myIdAction.payload;
    },
    myUserInformation: (state, myUserInformationAction: PayloadAction<object>) => {
      console.log('myUserInformation in boardslice: ', myUserInformationAction.payload);
      
      state.myUserInfor = myUserInformationAction.payload;
    },
    isGameOverState: (state, myIdAction: PayloadAction<boolean>) => {
      state.gameover = myIdAction.payload;
    },
    thePlayersToColour: (state, myIdAction: PayloadAction<object>) => {
      state.gameInserted = myIdAction.payload;
    },
    userIdState: (state, cookieAction: PayloadAction<boolean>) => {
      state.userIdValue = cookieAction.payload;
    },
  },
});

export const { originalBoardState, updateTheBoardState, selectedUserId, myId, isGameOverState, thePlayersToColour, myUserInformation, userIdState } = boardSlice.actions;
export default boardSlice.reducer
