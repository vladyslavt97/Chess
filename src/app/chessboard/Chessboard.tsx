import "./Chessboard.css"
import { useEffect} from "react";
import Row from "./row/row";
import { originalBoardState } from '../redux/boardSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { resetTheStateofReset } from '../redux/checkmateSlice';


export default function ChessBoard() {
    const board = useSelector((state: RootState) =>state.board.boardValue);
    // const clearTheBoard = useSelector((state: RootState) =>state.checkMate.reset);
    
    let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }
    
  return <div id="big-big-div">
            <div className="chess-board">
                {board.map((row, index) => (
                        <div key={index} >
                            <h5 id="rows-numbers" >{index + 1}</h5>
                            <Row row={row} rowIndex={index}/>
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
            </div>
  </div>
}
