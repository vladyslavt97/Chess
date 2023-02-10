import "./Chessboard.css"
import Row from "./row/row";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { socket } from '../socket/socket';

export default function ChessBoard() {
    const board = useSelector((state: RootState) =>state.board.boardValue);
    const clickedUserId = useSelector((state: RootState) => state.board.id);
    const thePlayersToColour = useSelector((state: RootState) => state.board.gameInserted[0]);
    const myId = useSelector((state: RootState) => state.board.myId);

    let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }
    
    const startTheGame = ()=>{
        socket.emit('startTheGame', clickedUserId)
    }

    return <div> 
            {(board.length === 0 && clickedUserId) ? 
                <div id="start-btn-div">
                    <button onClick={startTheGame} 
                            id="start-the-game-btn-center"> Start the Game </button>
                </div>
                 : null}
            {thePlayersToColour && <div id={thePlayersToColour.player1_id === myId ? "big-big-div" : "big-big-div-blackside"}>
            {board.length !== 0 &&
                    <div    
                        className={thePlayersToColour.player1_id === myId ? "chess-board" : "chess-board-b"}
                        >
                        {board.map((row, index) => (
                            <div key={index} >
                                    <h5 id={thePlayersToColour.player1_id === myId ? "rows-numbers" : "rows-numbers-rotated"} >{index + 1}</h5>
                                    <Row row={row} rowIndex={index} />
                                </div>
                            )
                    )}
                    {thePlayersToColour.player1_id === myId ? <div id= "columns-letters-divs">{letters.map((r, y)=>(
                            <div key={y} id="columns-letters-div">
                                <h5 id="columns-letters">{r}</h5>
                            </div>
                        )
                        )}
                    </div>
                    : 
                    <div id= "columns-letters-divs-reversed">{letters.reverse().map((r, y)=>(
                            <div key={y} id="columns-letters-div">
                                <h5 id="columns-letters">{r}</h5>
                            </div>
                        )
                        )}
                    </div>}
                </div>}
            </div>}
        </div>
}
