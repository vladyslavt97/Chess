import "./Chessboard.css"
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import Row from "./row/row";
import { originalBoardState } from '../redux/boardSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";


export default function ChessBoard() {
    const board = useSelector((state: RootState) =>state.board.boardValue);
    console.log('board: ', board);
    const dispatch = useDispatch();

    useEffect(()=>{
        fetch('/api/gamestate')
        .then((response) => response.json()
        )
        .then((data) => {
            console.log('GET Gamestate: ', data.st);
            dispatch(originalBoardState(data.st));
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])
    

    let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }
    
  return <div>
            <h1>ChessBorad component</h1>
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
