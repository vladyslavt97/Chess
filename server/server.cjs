require('dotenv').config();
const express = require("express");
const app = express();
const { PORT } = process.env;
app.use(express.json());
const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
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
  try{
    console.log('3131');
    console.log('req.body: ', req.body.possibleMoves);
    const movesLegal = chess.moves({ square: req.body.possibleMoves});
    console.log('legal moves: ', movesLegal);
    res.json({legalmoves: movesLegal});
  } 
  catch {
    console.log('something went wrong on the legal move validation');
  }

});
app.post('/api/movepiece', (req, res) => {
  try{
    let from = req.body.from;
    let to = req.body.to;
    chess.move({ from: from , to: to })
    const state = chess.board().reverse();
    if(chess.isCheckmate()){
      console.log('checkmate:)');
      res.json({checkMate: true, moved: state})
    } else {
      res.json({moved: state});
    }
  } 
  catch (error){
    console.log('something went wrong in the movepiece', error);
  }
  
});



// ------------------------------------ SOCKET  ------------------------------------ //
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(WEB_URL))
});

io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});
let usersConnectedInfo = [];
io.on("connection", async (socket) => {
  console.log("[social:socket] incoming socket connection", socket.id);
    
  //check if the user is signed in.
  const { userId } = socket.request.session;
  if (!userId) { // I am not going to send data if a user is not signed in
    return socket.disconnect(true);
  }

  // emit the board to dispatch the action (maybe get it from DB if its for a logged in user)
  // send the board to the client who has just connected
  let board = chess.board().reverse();
  socket.emit('theBoard', board);

  socket.on("disconnect", () => {
    console.log(socket.id, '= should disappear from the list on onlinne users');
  });
});
// ------------------------------------ end of socket setup  ------------------------------------ //
server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});