import "./Chessboard.css"
import Row from "./row/row";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { socket } from '../socket/socket';


export default function ChessBoard() {
    const board = useSelector((state: RootState) =>state.board.boardValue);
    const clickedUserId = useSelector((state: RootState) => state.board.id);

    let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }
    
    const startTheGame = ()=>{
        socket.emit('startTheGame', clickedUserId)
    }
    
    console.log('board: ', board);
    
    return <div id="big-big-div">
            {(board.length === 0 && clickedUserId) ? <button onClick={startTheGame} 
                                id="start-the-game-btn-center"> Start the Game </button> : null}

            {board.length !== 0 && <div className="chess-board">
                    {board.map((row, index) => (
                            <div key={index} >
                                <h5 id="rows-numbers" >{index + 1}</h5>
                                <Row row={row} rowIndex={index} />
                            </div>
                        )
                        )}
                        <div id="columns-letters-divs">{letters.map((r, y)=>(
                                    <div key={y} id="columns-letters-div">
                                        <h5 id="columns-letters">{r}</h5>
                                    </div>
                                )
                            )}
                        </div>
                    </div>}
  </div>
}
