require('dotenv').config();
const express = require("express");
const app = express();
const { PORT } = process.env;

const {Chess} = require('chess.js')

const chess = new Chess('r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - - 0 19')

// while (!chess.isGameOver()) {
//   const moves = chess.move();
  //   const move = moves[Math.floor(Math.random() * moves.length)]
//   chess.move(move)
// }
console.log('chess', chess.board());
console.log('ascii', chess.ascii());
// console.log('clear', chess.clear());//clears the board
console.log('fen', chess.fen());
console.log('get', chess.get('a7')); //get(square) = returns the piece on the square
// console.log(chess.put({ type: chess.PAWN, color: chess.BLACK }, 'a5')); // put a black pawn on a5; ?????
console.log('h: ', chess.history()); // returns the history of the current game


app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});