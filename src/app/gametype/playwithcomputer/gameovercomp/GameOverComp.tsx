 
import { useDispatch } from 'react-redux';
import { clearTheBoard } from '../../chess/redux/checkmateSlice';
import { useState } from 'react';

export default function GameOverComp() {
    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();

    //fetch post to clean the data and start again
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
            setVisibleBackdrop(!visibleBackdrop);
            dispatch(clearTheBoard(true));
        })
        .catch(err => {
                console.log('er: ', err);
            });

    } 
    console.log('visibleBackdrop::', visibleBackdrop);
    
  return <div>
        {!visibleBackdrop && 
            <div id='checkmate-div'><div id='just-a-div'>
                <div id='backdrop'></div>
                <div id='checkmate-text'>CheckMate</div>
                <button id='checkmate-button' onClick={restartTheGame}>Start Over</button>
            </div>
        </div>}
    </div>
}