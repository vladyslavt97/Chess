import { io } from "socket.io-client";
import { originalBoardState, updateTheBoardState} from "../redux/boardSlice";
import { messagesState, receivedMessage} from "../redux/messagesSlice";
import { isPieceSelected, moveFromState, clearTheMoveFrom } from '../redux/moveFromSlice';


export let socket;
export const initSocket = (store) => {
    if (socket) {
        return;
    }

    socket = io.connect();
    socket.on("chatMessages", (data) => {
        const action = messagesState(data.rows);
        store.dispatch(action);
    });

    socket.on("private_message", (data) => {
        console.log('data in the sokcet.js is from textarea.tsx with .to', data);
        const action = receivedMessage(data.info);
        store.dispatch(action);
    });

    // socket.on('online', (data) => {
    //     console.log('online users: ', data);
    //     const action = onlineUserAppeared(data);
    //     store.dispatch(action);
    // });







    // ------------------------ the chess part! ------------------------//
    socket.on("startTheGame", (data) => {
        console.log('data in theBoard socket.js', data);
        const action = originalBoardState(data);//board
        store.dispatch(action);
    });

    socket.on("moveTo", (data) => {
        console.log('moveTo socket.js', data.info);
        const action = updateTheBoardState(data.info);
        store.dispatch(action);
    });

    // dispatch(checkMateState(data.checkMate))
            // console.log('data.moved: ', data.moved);
    
};