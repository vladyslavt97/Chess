import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './WhoseTurn.css'

export default function WhoseTurn() {
    // const turn = useSelector((state: RootState) =>state.moveFrom.valueTurn);

    // console.log('turn: ', turn);
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
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }, [])

  return <div id='turn-div'>
            {/* {!turn && <div id='whiteturn'></div>}
            {turn && <div id='blackturn'></div>} */}
        </div>
}
