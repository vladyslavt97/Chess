import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Chess.css';
import Chat from './chat/Chat';
import CheckMate from './checkmate/Checkmate';
import ChessBoard from './chessboard/Chessboard';
import AllUsers from './allusers/AllUsers';
import { RootState } from './redux/store';
import Restart from './restart/Restart';
import WhoseTurn from './whoseturn/WhoseTurn';
import { Signout } from './components/signout';
import { myId, myUserInformation } from './redux/boardSlice';
import InfoPage from './infopage/InfoPage';
import { UserInfo } from '../../interface';


export default function App() {
  const clickedUserId = useSelector((state: RootState) => state.board.id);
  const isGameover = useSelector((state: RootState) =>state.board.gameover);
  const thePlayersToColour = useSelector((state: RootState) =>state.board.gameInserted[0]);
  const [myInfo, setMyInfo] = useState<UserInfo>();
  
  const [visibleInfoPopup, setVisibleInfoPopup] = useState<boolean>(false);

  const toggleInfoPopup = () => {
    console.log('toggleInfoPopup clicked');
    setVisibleInfoPopup(!visibleInfoPopup);
  }

  const dispatch = useDispatch();
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
              setMyInfo(data.myuser)
              dispatch(myId( data.myuser.id));
              dispatch(myUserInformation( data.myuser));
            })
            .catch((error) => {
                console.error('Error caught:', error);
            });
  }, [])
  
  return (
    <div className="main-div">
      <div id='the-layout'>
        <div id='chat-allusers-welcome'>
          <div id='fandl'>
            <h3 id='first-and-last-name'>{myInfo?.first} <br/> {myInfo?.last}</h3>
          </div>
          <AllUsers />
          <Chat />
        </div>
        
        
        <div>
          <ChessBoard />
          <div id='title-and-your-colour'>
            {thePlayersToColour && <div id='div-my-colour'>
                  {thePlayersToColour.player1_id === myInfo.id ? <h2 id='whiteside'>Your pieces are ⚪️</h2> : <h2 id='blackside'>Your pieces are ⚫️</h2>}
                </div>}
            {!clickedUserId && <img src='/knight.png' alt="knight" id='knight-beautiful'/>}
          </div>
        </div>
      </div>


      {isGameover && 
        <div id='checkmate'>
            <CheckMate />
      </div>}

      {thePlayersToColour && <Restart />}
      
      {thePlayersToColour && <WhoseTurn />}
      <Signout />

      <h1 onClick={toggleInfoPopup} id="question-mark">?</h1>
      {visibleInfoPopup && <div id='question-mark-div' onClick={toggleInfoPopup}>
        <InfoPage />
      </div>}
    </div>
  );
}
