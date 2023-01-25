import "./Chessboard.css"
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";

export default function ChessBoard() {
    const [fen, setFen] = useState('');
    // const { current: chess } = useRef(new Chess(fen));
    

    useEffect(()=>{
        fetch('/api/gamestate')
        .then((response) => response.json()
        )
        .then((data) => {
            console.log('GET Gamestate: ', data.st);
            setFen(data.st);
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])
    
    console.log('fen: ', fen);
    
    const gettingRows = () =>{
        
    }
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
                {/* <div id="all-cells">{rows}</div> */}
                {/* <div id="fen">{fen}</div> */}
            </div>
  </div>
}
