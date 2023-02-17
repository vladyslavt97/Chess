import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../chess/redux/store';
import './Playwithcomputer.css'
import RowComputer from './rowcomputer/RowComputer';
import { originalBoardState } from '../../chess/redux/boardSlice';
import { resetTheStateofReset } from '../../chess/redux/checkmateSlice';
import RestartComp from './restartcomp/RestartComp';
import GameOverComp from './gameovercomp/GameOverComp';

export default function PlayWithComputer() {
  const isGameover = useSelector((state: RootState) =>state.checkMate.valueChechMate);
  const clearTheBoard = useSelector((state: RootState) =>state.checkMate.reset);
  const board = useSelector((state: RootState) =>state.board.boardValue);
  const dispatch = useDispatch();
  
  useEffect(()=>{
        fetch('/api/normalchess-gamestate')
        .then((response) => response.json()
        )
        .then((data) => {
            dispatch(originalBoardState(data.st));
            dispatch(resetTheStateofReset(false));
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [clearTheBoard])

  let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }

  return (
    <div>
        <RestartComp />
        <button id='back-to-gametype'><Link to="/gametype">Back</Link></button>
        <div className="chess-board">
                {board.map((row, index) => (
                        <div key={index} >
                            <h5 id="rows-numbers" >{index + 1}</h5>
                            <RowComputer row={row} rowIndex={index} 
                            />
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
          {isGameover && 
        <div id='checkmate'>
            <GameOverComp />
      </div>}
    </div>
  )
}