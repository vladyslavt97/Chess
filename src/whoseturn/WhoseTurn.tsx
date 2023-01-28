import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './WhoseTurn.css'

export default function WhoseTurn() {
    const board = useSelector((state: RootState) =>state.board.boardValue);
    const [turn, setTurn] = useState('');
    useEffect(() =>{
        fetch('/api/whoseturn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log('get the turn');
            return response.json()
        })
        .then(data => {
            console.log('whoseturn ', data);
            setTurn(data.st);
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }, [board])
    console.log('turn: ', turn);
    
  return <div id='turn-div'>
            {turn === 'w' && <div id='whiteturn'></div>}
            {turn === 'b' && <div id='blackturn'></div>}
        </div>
}
