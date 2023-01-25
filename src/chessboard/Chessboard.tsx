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
    

    let result = [];
    let i = 64;
    while (i++ <= 71){
        result.push(String.fromCharCode(i)); 
    }
    
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
            <div id="columns-letters-divs">{result.map((r, y)=>(
                        <div key={y} id="columns-letters-div">
                            <h5 id="columns-letters">{r}</h5>
                        </div>
                    )
                )}
            </div>
            </div>
  </div>
}
