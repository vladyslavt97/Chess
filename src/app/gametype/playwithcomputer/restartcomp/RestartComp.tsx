import { clearTheBoard } from '../../../chess/redux/checkmateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { RootState } from '../../../chess/redux/store';

export default function RestartComp() {
    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();
    
    const restartTheGame = ()=>{
        fetch('/api/normalchess-emptyboard', {
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