import React, { useState } from 'react'
import './Restart.css'
import { clearTheBoard } from '../redux/checkmateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../socket/socket';
import { RootState } from '../redux/store';

export default function Restart() {
    const clickedUserId = useSelector((state: RootState) => state.board.id);

    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();
    
    const restartTheGame = ()=>{
        socket.emit('emptyboard', {clickedUserId: clickedUserId})
        setVisibleBackdrop(!visibleBackdrop);
        dispatch(clearTheBoard(true));
    } 
  return (
    <div id='image-restart-div'>
        <img src="/restart.png" alt="restartTheGame" onClick={restartTheGame} id="resstart-the-game"/>
    </div>
  )
}
