import { io } from "socket.io-client";
import { originalBoardState } from "../redux/boardSlice";

export let socket;
export const initSocket = (store) => {//needs to update teh store
    console.log("initSocket");
    if (socket) {//you already set up the socket 
        return;
    }

    socket = io.connect();// using their library - connet to the server
    
    socket.on("theBoard", (data) => {
        console.log('the board data in socket.js', data);
        console.log('here we get the board from the server to socket.js', data.rows);

        const action = originalBoardState(data.rows);//board starting position
        store.dispatch(action);
    });

    // socket.on("chatMessage", (data) => {
    //     console.log('data in chat message', data);
    //     const action = receivedMessageForAll(data);//message
    //     store.dispatch(action);
    // });
};