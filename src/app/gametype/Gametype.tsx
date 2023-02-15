import { useSelector } from 'react-redux';
import Chess from '../chess/Chess';
import { RootState } from '../chess/redux/store';
import PlayWithComputer from './playwithcomputer/PlayWithComputer';

export default function Gametype() {
  const onlineU = useSelector((state: RootState) => state.messages.onlineUser);
  console.log('onlineU in gametype: ', onlineU);
  

  return (
    <div>
        {/* “play against the computer”
        “no one else is online” / Play against other users! (number of online users) + refresh button
        !!! only if >=2 of online users —> redirect to the /chess! */}
        <PlayWithComputer />
        {onlineU.length >= 2 ? <button>Play against other users!</button> : <button>no one else is online...</button>}
        {/* <Chess /> */}
    </div>
  )
}
