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
    const columnLetter = () => {
        let i = 64;
        while (i++ <= 71){
            return String.fromCharCode(i); 
        }
    }
    console.log('cl: ', columnLetter());
    
  return <div>
            <h1>ChessBorad component</h1>
            <div className="chess-board">
                {board.map((row, index) => (
                        <div key={index} >
                            <h5 id="rows-numbers" >{index + 1}</h5>
                            <Row row={row} ind={index}/>
                        </div>
                    )
                )}
            </div>
  </div>
}
