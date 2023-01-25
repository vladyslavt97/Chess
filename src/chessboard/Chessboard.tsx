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
    
    console.log('board: ', typeof board);
    
    // const gettingRows = () =>{
        
    // }
    // console.log('#: ', chess); 

    // let rows = [];
    // for (let i = 0; i < 8; i++) {
    //     let row = [];
    //     for (let j = 0; j < 8; j++) {
    //     row.push(<div key={i + '-' + j} className={i % 2 === j % 2 ? 'white' : 'black'}></div>);
    //     }
    //     rows.push(<div key={i} className="row">{row}</div>);
    // }

  return <div>
            <h1>ChessBorad component</h1>
            <div className="chess-board">
                {/* map */}
                {board.map((row, index) => (
                        <div key={index} >
                            <Row row={row}/>
                        </div>
                    )
                )}
                {/* <div id="all-cells">{rows}</div> */}
                {/* <div id="fen">{fen}</div> */}
            </div>
  </div>
}
