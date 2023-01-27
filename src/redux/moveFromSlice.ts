import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MoveFromState {
    value: string;
}

const initialState: MoveFromState = {
    value: '',
};

export const moveFromSlice = createSlice({
  name: 'movefrom',
  initialState,
  reducers: {
    moveFromState: (state, moveFromAction: PayloadAction<string>) => {
      state.value = moveFromAction.payload;
    },
    // acceptFriend: (state, friendsAction: PayloadAction<string>) => {
    //   const foundFriend = state.value.findIndex(friend => friend.fid === friendsAction.payload);
    //       state.value[foundFriend].accepted = true;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { moveFromState } = moveFromSlice.actions
// reducer
export default moveFromSlice.reducer