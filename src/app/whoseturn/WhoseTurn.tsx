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
            return response.json()
        })
        .then(data => {
            setTurn(data.st);
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }, [board])
    
  return <div id='turn-div'>
            {turn === 'w' && <div id='whiteturn'></div>}
            {turn === 'b' && <div id='blackturn'></div>}
        </div>
}
