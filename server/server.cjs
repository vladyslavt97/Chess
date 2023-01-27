require('dotenv').config();
const express = require("express");
const app = express();
// const path = require("path");
const { PORT } = process.env;
app.use(express.json());

const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2';
const chess = new Chess(FEN)

// while (!chess.isGameOver()) {
//   const moves = chess.move();
  //   const move = moves[Math.floor(Math.random() * moves.length)]
//   chess.move(move)
// }
// console.log('chess', chess.board());
// console.log('ascii', chess.ascii());
// console.log('clear', chess.clear());//clears the board
// console.log('fen', chess.fen());
// console.log('get', chess.get('a7')); //get(square) = returns the piece on the square
// console.log(chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5')); // put a black pawn on a5; ?????
// console.log('h: ', chess.history()); // returns the history of the current game
// console.log('in check: ', chess.inCheck());//boolean
// console.log('mate?: ', chess.isCheckmate());
// console.log('is attacked: ', chess.isAttacked('e5'));//true if the square is attacked by any piece of the given color.???
// console.log('undo: ', chess.undo());//undo a move!
// console.log('move: ', chess.move(''));


app.get('/api/gamestate', (req, res) => {
  console.log('+');
  const state = chess.board().reverse();
  // console.log('stateee: ', state);
  res.json({st: state});

});
app.post('/api/legalmoves', (req, res) => {
  console.log('3131');
  console.log('req.body: ', req.body.possibleMoves);
  const movesLegal = chess.moves({ square: req.body.possibleMoves});
  console.log('legal moves: ', movesLegal);
  res.json({legalmoves: movesLegal});

});
app.post('/api/movepiece', (req, res) => {
  console.log('req.body movepiece: ', req.body);
  let from = req.body.from;
  let to = req.body.to;
  console.log('f,t: ', from, to);
  chess.move({ from: from , to: to })
  // console.log('ascii', chess.ascii());
  // console.log('stateee: ', state);
  const state = chess.board().reverse();

  res.json({moved: state});
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});