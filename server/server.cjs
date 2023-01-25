require('dotenv').config();
const express = require("express");
const app = express();
// const path = require("path");
const { PORT } = process.env;

const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2';
const chess = new Chess(FEN)

// while (!chess.isGameOver()) {
//   const moves = chess.move();
  //   const move = moves[Math.floor(Math.random() * moves.length)]
//   chess.move(move)
// }
// console.log('chess', chess.board());
console.log('ascii', chess.ascii());
// console.log('clear', chess.clear());//clears the board
console.log('fen', chess.fen());
console.log('get', chess.get('a7')); //get(square) = returns the piece on the square
// console.log(chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5')); // put a black pawn on a5; ?????
console.log('h: ', chess.history()); // returns the history of the current game
console.log('in check: ', chess.inCheck());//boolean
console.log('mate?: ', chess.isCheckmate());
console.log('is attacked: ', chess.isAttacked('e5'));//true if the square is attacked by any piece of the given color.???
console.log('undo: ', chess.undo());//undo a move!
// console.log('move: ', chess.move(''));
function getState(){
  return chess.ascii();
}
// app.use(express.json());

// function convertToBoard(){
//   let board = chess.board();
//   let loopOverRows = board.map(el => el);
//   console.log('loopOverRows', loopOverRows);
// };

// const state = getState();
// const fenWithoutSpace = state.split('.').join('').split(' ').join('').split('|').join('');
// console.log('fenWithoutSpace: ', fenWithoutSpace);
app.get('/api/gamestate', (req, res) => {
  console.log('+');
  const state = chess.board().reverse();
  console.log('stateee: ', state);
  res.json({st: state});

});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});