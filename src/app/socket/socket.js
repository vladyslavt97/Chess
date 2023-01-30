import { io } from "socket.io-client";
import { originalBoardState, updateTheBoardState, isGameOverState, thePlayersToColour} from "../redux/boardSlice";
import { messagesState, receivedMessage} from "../redux/messagesSlice";
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
        console.log('data in the sokcet.js is from textarea.tsx with .to', data);
        const action = receivedMessage(data.info);
        store.dispatch(action);
    });



    // ------------------------ the chess part! ------------------------//
    socket.on("startTheGame", (data) => {
        console.log('data in theBoard socket.js data.info', data);
        store.dispatch(thePlayersToColour(data.whatIsInserted));
        const action = originalBoardState(data.info);//board
        store.dispatch(action);
    });

    socket.on("moveTo", (data) => {
        console.log('moveTo socket.js', data);
        store.dispatch(isGameOverState(data.gameisover));
        const action = updateTheBoardState(data.info);
        store.dispatch(action);
    });
};