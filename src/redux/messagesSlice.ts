import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, UserInfo } from "../interface";

export interface FriendsState {
    messagesValue: Message[];
    id: number;
    onlineUser: UserInfo[],
}
const initialState: FriendsState = {
    messagesValue: [],
    id: 0,
    onlineUser: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesState: (state, messagesAction: PayloadAction<Message[]>) => {//action instructs how to change
      state.messagesValue = messagesAction.payload;
    },
    receivedMessageForAll: (state, messagesAction: PayloadAction<Message>) => {
        console.log('messagesAction received: ', messagesAction.payload);
        console.log('state.messagesValue: ', state.messagesValue);
        state.messagesValue.unshift(messagesAction.payload);
    },
    receivedMessage: (state, messagesAction: PayloadAction<Message>) => {
        console.log('messagesAction received: ', messagesAction.payload);
        console.log('state.messagesValue: ', state.messagesValue);
        state.messagesValue.unshift(messagesAction.payload);
    },
    selectedFriendId: (state, messagesAction: PayloadAction<number>) => {
      console.log('messagesAction.payload state,id', messagesAction.payload);
      state.id = messagesAction.payload;
    },
    onlineUserAppeared: (state, messagesAction: PayloadAction<UserInfo[]>) => {
      // console.log('online user obj in slice', messagesAction.payload);
      state.onlineUser = messagesAction.payload;
    }
  },
});

export const { messagesState, receivedMessage, selectedFriendId, onlineUserAppeared, receivedMessageForAll} = messagesSlice.actions // Action
export default messagesSlice.reducer //reducer