require('dotenv').config();
const express = require("express");
const app = express();
const { PORT } = process.env;

const {Chess} = require('chess.js')

const chess = new Chess()

// while (!chess.isGameOver()) {
//   const moves = chess.move();
  //   const move = moves[Math.floor(Math.random() * moves.length)]
//   chess.move(move)
// }
console.log('chess', chess.board())


app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});