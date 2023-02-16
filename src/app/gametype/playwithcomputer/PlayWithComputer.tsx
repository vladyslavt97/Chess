import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserInfo } from '../../../interface';
import { RootState } from '../../chess/redux/store';
import './Playwithcomputer.css'
import { Chess } from 'chess.js'
import RowComputer from './rowcomputer/RowComputer';

export default function PlayWithComputer() {
  const myInf: UserInfo = useSelector((state: RootState) =>state.board.myUserInfor);

  const chess = new Chess();
  const board = chess.board().reverse();
  
  let letters = [];
    let i = 64;
    while (i++ <= 71){
        letters.push(String.fromCharCode(i)); 
    }

  return (
    <div>
        <button id='back-to-gametype'><Link to="/gametype">Back</Link></button>
        <div className="chess-board">
                {board.map((row, index) => (
                        <div key={index} >
                            <h5 id="rows-numbers" >{index + 1}</h5>
                            <RowComputer row={row} rowIndex={index}/>
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
  )
}