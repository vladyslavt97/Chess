import "./Chessboard.css"
import Chess from 'chess.js';

export default function ChessBoard() {
    console.log('chess: ', Chess);
    
    let rows = [];
    for (let i = 0; i < 8; i++) {
        let row = [];
        for (let j = 0; j < 8; j++) {
        row.push(<div key={i + '-' + j} className={i % 2 === j % 2 ? 'white' : 'black'}></div>);
        }
    rows.push(<div key={i} className="row">{row}</div>);
  }

  return <div>
            <h1>ChessBorad component</h1>
            <div className="chess-board">
                <div id="all-cells">{rows}</div>
            </div>
  </div>
}
