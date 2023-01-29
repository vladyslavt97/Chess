import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectedUserId } from '../redux/boardSlice';
import { RootState } from '../redux/store';
import './AllUsers.css'
export default function AllUsers() {
  const [allusers, setAllUsers] = useState([]);
  const [counterpartChosen, setCounterpartChosen] = useState<boolean>(false)
  const clickedUserId = useSelector((state: RootState) => state.board.id);
  

  //should be all online users
  useEffect(()=>{
        fetch('/api/allusers')
        .then((response) => response.json()
        )
        .then((data) => {
            setAllUsers(data.allUsers);
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])
    
  const toggleRelevantGame = () => {
    setCounterpartChosen(!counterpartChosen);
  }

  const dispatch = useDispatch();
  
  return (
    <div id='friends-div'>
        <div>Members</div>
        <div id='all-users-list'>
          {allusers.map(user=>(
            <div key={user.id} onClick={()=>dispatch(selectedUserId(user.id))}>
              <div key={user.id} id="allusers-names" className={`${user.id === clickedUserId && counterpartChosen ? 'users-selected' : 'users-not-selected'}`}>
                <h4>{user.first} {user.last}</h4>
                <button id='start-the-game-btn' onClick={toggleRelevantGame} >Start</button>
              </div>
            </div>
            )
            )}
        </div>
    </div>
  )
}
