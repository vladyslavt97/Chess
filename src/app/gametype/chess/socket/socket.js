import { io } from "socket.io-client";
import { originalBoardState, updateTheBoardState, isGameOverState, thePlayersToColour} from "../redux/boardSlice";
import { messagesState, receivedMessage, onlineUserAppeared} from "../redux/messagesSlice";
// import { setWhiteColor, setBlackColor} from "../redux/colorsSlice";


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
        const action = receivedMessage(data.info);
        store.dispatch(action);
    });


    // ------------------------ the chess part! ------------------------//
    socket.on("startTheGame", (data) => {
        store.dispatch(thePlayersToColour(data.whatIsInserted));
        const action = originalBoardState(data.info);//board
        store.dispatch(action);
    });

    socket.on("moveTo", (data) => {
        store.dispatch(isGameOverState(data.gameisover));
        const action = updateTheBoardState(data.info);
        store.dispatch(action);
    });


    // ---- online? //
    socket.on('online', (data) => {
        const action = onlineUserAppeared(data);
        store.dispatch(action);
    });
};