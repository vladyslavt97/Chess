import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Chat from './chat/Chat';
import CheckMate from './checkmate/checkmate';
import ChessBoard from './chessboard/Chessboard';
import Friends from './friends/Friends';
import { RootState } from './redux/store';


export default function App() {
  const checkMate = useSelector((state: RootState) =>state.checkMate.valueCM);
  const [visibleInfoPopup, setVisibleInfoPopup] = useState<boolean>(false);


  const toggleInfoPopup = () => {
    console.log('toggleInfoPopup clicked');
    setVisibleInfoPopup(!visibleInfoPopup);
  }

  return (
    <div className="main-div">
      <div id='lets-play-some-chess'>
        <h1 id='lets-play-some-chess-text'>Lets Play Some Chess</h1>
      </div>

      <div id='the-layout'>
        <Friends />
        <ChessBoard />
        <Chat />
      </div>
      {checkMate && 
        <div id='checkmate'>
            <CheckMate />
      </div>}
      
      <h1 onClick={toggleInfoPopup} id="question-mark">?</h1>
      {visibleInfoPopup && <div id='question-mark-div' onClick={toggleInfoPopup}>
        <div id='backdrop'></div>
        <h1>How does it work?</h1>
        <h4><a href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">Forsyth–Edwards Notation</a> (FEN) - <b id='notation'>'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'</b></h4>
        <h4>After a move to e4 - <b id='notation'>'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'</b></h4>
        <br />
        <h4><a href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">Algebraic notation</a> (AN) - a1, b2...</h4>
        <h4><small id='yellow'>(</small>&nbsp;has nothing to do with algebra&nbsp;😊&nbsp;<small id='yellow'>)</small></h4>
        <br />
        <h3>1.&nbsp; server converts the FEN to the &nbsp; <small id='green'>Array<small id='pink'>&lt;</small>Array<small id='blue'>&lt;</small>object<small id='blue'>&gt;</small><small id='pink'>&gt;</small></small>&nbsp; ---&gt; &nbsp; sends the JSON to the client.</h3>
        <h3 id='onecell-h3'>2.&nbsp;<img src="/onecell.jpg" alt="one-cell" width='40px'/> &nbsp; = &nbsp; &#123; square: <small id='green'>'f7'</small>, type: <small id='green'>'p'</small>, color: <small id='green'>'b'</small> &#125;</h3>
      </div>}
    </div>
  );
}
