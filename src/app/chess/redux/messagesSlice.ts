import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, UserInfo } from "../../../interface";

export interface MessageState {
    messagesValue: Message[];
    id: number;
    onlineUser: UserInfo[],
}
const initialState: MessageState = {
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
        state.messagesValue.unshift(messagesAction.payload);
    },
    receivedMessage: (state, messagesAction: PayloadAction<Message>) => {
        state.messagesValue.unshift(messagesAction.payload);
    },
    selectedFriendId: (state, messagesAction: PayloadAction<number>) => {
      state.id = messagesAction.payload;
    },
    onlineUserAppeared: (state, messagesAction: PayloadAction<UserInfo[]>) => {
      state.onlineUser = messagesAction.payload;
    }
  },
});

export const { messagesState, receivedMessage, selectedFriendId, onlineUserAppeared, receivedMessageForAll} = messagesSlice.actions // Action
export default messagesSlice.reducer //reducer