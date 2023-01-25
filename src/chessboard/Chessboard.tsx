import "./Chessboard.css"
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import Row from "./row/row";

// interface ChessBoardState{
//     board: array[],
// }

export default function ChessBoard() {
    //gets the data from server and passes to the components
    const [board, setBoard] = useState([]);
    // const { current: chess } = useRef(new Chess(fen));
    

    useEffect(()=>{
        fetch('/api/gamestate')
        .then((response) => response.json()
        )
        .then((data) => {
            console.log('GET Gamestate: ', data.st);
            setBoard(data.st);
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])
    
    // console.log('board: ', typeof board);


  return <div>
            <h1>ChessBorad component</h1>
            <div className="chess-board">
                {/* one color here */}
                {board.map((row, index) => (
                        <div key={index} >
                            <div id="rows-numbers">{index + 1}</div>
                            <Row row={row}/>
                        </div>
                    )
                )}
            </div>
  </div>
}
