import { useDispatch, useSelector } from 'react-redux';
import Chess from './chess/Chess';
import { RootState } from './chess/redux/store';
import PlayWithComputer from './playwithcomputer/PlayWithComputer';
import './Gametype.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { myId, myUserInformation } from './chess/redux/boardSlice';
import { UserInfo } from "../../interface"

export default function Gametype() {
  const onlineU = useSelector((state: RootState) => state.messages.onlineUser);
  console.log('onlineU in gametype: ', onlineU);
  const myInf: UserInfo = useSelector((state: RootState) =>state.board.myUserInfor);
  
  const dispatch = useDispatch();

  console.log('myInf in gametype: ', myInf);
  useEffect(() => {
  fetch('/api/myuser', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => 
          response.json())
        .then((data) => {
          dispatch(myId( data.myuser.id));
          dispatch(myUserInformation( data.myuser));
        })
        .catch((error) => {
          console.error('Error caught:', error);
        });
  }, []);

  return (
    <div>
      <div id='fandl'>
        <h3 id='first-and-last-name'>{myInf.first} <br/> {myInf.last}</h3>
      </div>
      <div id='gametype-div'>
          <button id='play-with-computer'><Link to="/computer">Play with computer</Link></button>
          {onlineU.length >= 2 ? <button id='play-with-others'><Link to="/chess">Play against other users</Link></button> : <button id='noone-is-online'>no one else is online...</button>}
      </div>
    </div>
  )
}
