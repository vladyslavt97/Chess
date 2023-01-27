import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CheckMate from './checkmate/checkmate';
import ChessBoard from './chessboard/Chessboard';
import { RootState } from './redux/store';


export default function App() {
  const checkMate = useSelector((state: RootState) =>state.checkMate.valueCM);
  console.log('cm: ', checkMate);


  return (
    <div className="main-div">
      <div id='lets-play-some-chess'>
        <h1 id='lets-play-some-chess-text'>Lets Play Some Chess</h1>
      </div>
        <ChessBoard />
        {checkMate && 
          <div id='checkmate'>
              <CheckMate />
          </div>}
    </div>
  );
}
