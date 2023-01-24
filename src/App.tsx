import React, { useEffect } from 'react';
import './App.css';
import ChessBoard from './chessboard/Chessboard';

export default function App() {

  // useEffect(()=>{
  //     fetch('/gamestate', {
  //           method: 'GET', 
  //           headers: {
  //               'Content-Type': 'application/json',
  //           },
  //       })
  //           .then((response) => 
  //               response.json())
  //           .then((data) => {
  //               console.log('GET: ', data);
  //           })
  //           .catch((error) => {
  //               console.error('Error caught:', error);
  //           });
  // }, [])



  return (
    <div className="main-div">
       <h1>App component</h1>
        <ChessBoard />
    </div>
  );
}
