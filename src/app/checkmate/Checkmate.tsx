import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './checkmate.css'
import { clearTheBoard } from '../redux/checkmateSlice';
import { socket } from '../socket/socket';
import { RootState } from '../redux/store';


export default function CheckMate() {
    const [visibleBackdrop, setVisibleBackdrop] = useState<boolean>(false)
    const dispatch = useDispatch();

    const clickedUserId = useSelector((state: RootState) => state.board.id);


    //fetch post to clean the data and start again
    const restartTheGame = ()=>{
        socket.emit('emptyboard', {clickedUserId: clickedUserId})
        setVisibleBackdrop(!visibleBackdrop);
        dispatch(clearTheBoard(true));

        //in the server ->
        //delete the board from DB

        //when we are starting the game next time: //check if its new or old game //in the startTheGame 
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
