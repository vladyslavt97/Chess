const express = require("express");
const {Chess} = require('chess.js')

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const chess = new Chess(FEN)

console.log('hi');

const normalChessRouter = express.Router();
normalChessRouter.get('/api/normalchess-gamestate', (req, res) => {
    console.log('+');
    const state = chess.board().reverse();
    res.json({st: state});
});
normalChessRouter.post('/api/normalchess-move', (req, res) => {
    try{
    let from = req.body.from;
    let to = req.body.to;
    chess.move({ from: from , to: to })
    const state = chess.board().reverse();
      if(chess.isGameOver()){
        console.log('game is over!!!:)');
        res.json({gameover: true, moved: state})
      } else {
        res.json({moved: state});
      }
    } 
    catch (error){
      console.log('something went wrong in the movepiece', error);
    }
});
normalChessRouter.post('/api/normalchess-emptyboard', (req, res) => {
    console.log('emptyboard or restart');
    const cleared = chess.reset();
    console.log('cc', cleared);
    res.json({emptyboard: cleared});
});
normalChessRouter.post('/api/normalchess-legalmoves', (req, res) => {
    try{
    const movesLegal = chess.moves({ square: req.body.possibleMoves});
    res.json({legalmoves: movesLegal});
    } 
    catch {
    console.log('something went wrong on the legal move validation');
  }
});
module.exports = { normalChessRouter };