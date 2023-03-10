import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './checkmate.css'
import { clearTheBoard } from '../redux/checkmateSlice';
import { socket } from '../socket/socket';
import { RootState } from '../redux/store';


export default function CheckMate() {
    const clickedUserId = useSelector((state: RootState) => state.board.id);
    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();

    const restartTheGame = ()=>{
        socket.emit('emptyboard', {clickedUserId: clickedUserId})
        setVisibleBackdrop(!visibleBackdrop);
        dispatch(clearTheBoard(true));
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
