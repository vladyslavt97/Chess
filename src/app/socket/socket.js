import { io } from "socket.io-client";
import { originalBoardState, updateTheBoardState, isGameOverState} from "../redux/boardSlice";
import { messagesState, receivedMessage} from "../redux/messagesSlice";
import { setWhiteColor, setBlackColor} from "../redux/colorsSlice";


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
        console.log('data in theBoard socket.js data.info', data.info);
        const action = originalBoardState(data.info);//board
        store.dispatch(action);
    });

    socket.on("moveTo", (data) => {
        console.log('moveTo socket.js', data);
        store.dispatch(isGameOverState(data.gameisover));
        const action = updateTheBoardState(data.info);
        store.dispatch(action);
    });



    //colors
    socket.on("colorPlayer1", (data) => {
        console.log('colorPlayer1', data);
        //you are white
        const action = setWhiteColor(data.colour);
        store.dispatch(action);
    });
    socket.on("colorPlayer2", (data) => {
        console.log('colorPlayer2', data);
        const action = setBlackColor(data.colour);
        store.dispatch(action);
    });
};