import { io } from "socket.io-client";
import { originalBoardState } from "../redux/boardSlice";
import { messagesState, receivedMessage} from "../redux/messagesSlice";

export let socket;
export const initSocket = (store) => {
    if (socket) {
        return;
    }

    socket = io.connect();// using their library - connet to the server
    
    socket.on("chatMessages", (data) => {
        const action = messagesState(data.rows);//messages
        store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("private_message", (data) => {
        console.log('data in the sokcet.js is from textarea.tsx with .to', data);
        const action = receivedMessage(data.info);
        store.dispatch(action);
    });



    //the chess part!
    socket.on("theBoard", (data) => {
        console.log('data in theBoard socket.js', data);
        const action = originalBoardState(data);//board
        store.dispatch(action);
    });
    
};