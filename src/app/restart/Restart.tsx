import React, { useState } from 'react'
import './Restart.css'
import { clearTheBoard } from '../redux/checkmateSlice';
import { useDispatch } from 'react-redux';
import WhoseTurn from '../whoseturn/Whoseturn';

export default function Restart() {
    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();
    
    const restartTheGame = ()=>{
        fetch('/api/emptyboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({possibleMoves: value}),
        })
        .then(response => {
            console.log('response: clear the board post');
            return response.json()
        })
        .then(data => {
            console.log('data upon successful board emtiyng. Probably should be true: ', data);
            dispatch(clearTheBoard(true));
        })
        .catch(err => {
                console.log('er: ', err);
            });

    } 
  return (
    <div id='image-restart-div'>
        <img src="/restart.png" alt="restartTheGame" onClick={restartTheGame} id="resstart-the-game"/>
    </div>
  )
}
