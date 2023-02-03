import React from 'react'

export default function InfoPage() {
    return <div>
        <div id='backdrop-question'></div><h1>How does it work?</h1><div id='div1'>
        <h4><a href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">Forsyth–Edwards Notation</a> (FEN) - <b id='notation'>'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'</b></h4>
        <h4>After a move to e4 - <b id='notation'>'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'</b></h4>
        </div><br /><div id='div2'>
            <h4><a href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">Algebraic notation</a> (AN) - a1, b2...</h4>
            <h4><small id='yellow'>(</small>&nbsp;has nothing to do with algebra&nbsp;😊&nbsp;<small id='yellow'>)</small></h4>
        </div><br /><div id='div3'>
            <h4>1.&nbsp; server converts the FEN to the &nbsp; <small id='green'>Array<small id='pink'>&lt;</small>Array<small id='blue'>&lt;</small>object<small id='blue'>&gt;</small><small id='pink'>&gt;</small></small>&nbsp; ---&gt; &nbsp; sends the JSON to the client.</h4>
            <h4 id='onecell-h3'>2.&nbsp;<img src="/onecell.jpg" alt="one-cell" width='40px' /> &nbsp; = &nbsp; &#123; square: <small id='green'>'f7'</small>, type: <small id='green'>'p'</small>, color: <small id='green'>'b'</small> &#125;</h4>
        </div><br /><br /><br /><div id='div4'>
            <h4 id='technologies-h4'>3. Technologies Used: &nbsp;&nbsp;<img src="/typescript.png" alt="" width="60px" />&nbsp;&nbsp;<img src="/socketio.png" alt="" width="110px" />&nbsp;&nbsp;<img src="/react.png" alt="" width="60px" />&nbsp;&nbsp;<img src="/nodejs.png" alt="" width="60px" />&nbsp;&nbsp;<img src="/npm.png" alt="" width="60px" />&nbsp;&nbsp; -&gt; &nbsp;<b>npm chess.js</b></h4>
        </div>
    </div> 
}
