import { useSelector } from 'react-redux';
import Chess from '../chess/Chess';
import { RootState } from '../chess/redux/store';
import PlayWithComputer from './playwithcomputer/PlayWithComputer';
import './Gametype.css'
import { Link } from 'react-router-dom';

export default function Gametype() {
  const onlineU = useSelector((state: RootState) => state.messages.onlineUser);
  console.log('onlineU in gametype: ', onlineU);
  

  return (
    <div id='gametype-div'>
        {/* “play against the computer”
        “no one else is online” / Play against other users! (number of online users) + refresh button
        !!! only if >=2 of online users —> redirect to the /chess! */}
        <button id='play-with-computer'><Link to="/computer">Play with computer! (under construction)</Link></button>
        {onlineU.length >= 2 ? <button id='play-with-computer'><Link to="/chess">Play against other users!</Link></button> : <button id='noone-is-online'>no one else is online...</button>}
        {/* <Chess /> */}
    </div>
  )
}
