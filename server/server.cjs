require('dotenv').config();
const express = require("express");
const app = express();
const { PORT, WEB_URL } = process.env;
const {cookieSession } = require('./cookiesession.cjs');

app.use(express.json());
const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const chess = new Chess(FEN)

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

    
    socket.on("disconnect", () => {
        console.log(socket.id, '= should disappear from the list on onlinne users');

    });
});
// ------------------------------------ end of socket setup  ------------------------------------ //


app.get('/api/gamestate', (req, res) => {
  console.log('+');
  const state = chess.board().reverse();
  res.json({st: state});

});
app.post('/api/legalmoves', (req, res) => {
  try{
    const movesLegal = chess.moves({ square: req.body.possibleMoves});
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
      // chess.isGameOver()
      console.log('checkmate:)');
      res.json({checkMate: true, moved: state})
    } else if (chess.isDraw()){
      console.log('draw:)');
      res.json({draw: true, moved: state})
    } else {
      res.json({moved: state});
    }
  } 
  catch (error){
    console.log('something went wrong in the movepiece', error);
  }
  
});


app.post('/api/emptyboard', (req, res)=>{
  console.log('emptyboard or restart');
  const cleared = chess.reset();
  console.log('cc', cleared);
  res.json({emptyboard: cleared});
});


// app.listen(PORT, function () {
//     console.log(`Express server listening on port ${PORT}`);
// });

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});