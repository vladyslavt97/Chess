require('dotenv').config();
const express = require("express");
const app = express();
const { PORT, WEB_URL } = process.env;
const {cookieSession } = require('./cookiesession.cjs');
const cors = require('cors');
const { getLatestMessages, getMyUSerFromDB } = require('./db.cjs');
app.use(cors());










// ------------------------------------ SOCKET  ------------------------------------ //
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(WEB_URL))
});
io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});

//advised by Gimena to put here
app.use(cookieSession);
app.use(express.json());

// app.get('/api/latestmessages', async (req, res)=>{
//   const latestMessages = await getLatestMessages();
//   res.json({lm: latestMessages});
// })

// let usersConnectedInfo = [];

io.on("connection", async (socket) => {
    console.log("[social:socket] incoming socket connection", socket.id);
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }

    const latestMessages = await getLatestMessages();
    // console.log('lat: ', latestMessages.rows);
    socket.emit('chatMessages', latestMessages);

    socket.on('theBoard', async (data) => {
        console.log('the board: ', data);
        const newMessage = await insertMessageToAll(userId, text);
        io.emit('theBoard', newMessage.rows[0]);
    });
    
    socket.on("disconnect", () => {
        console.log(socket.id, '= should disappear from the list on onlinne users');

    });
});
// ------------------------------------ end of socket setup  ------------------------------------ //










//routes
const { loginRouter } = require('./routes/login.cjs');
const { registerRouter } = require('./routes/registration.cjs');
const { allUsersRouter } = require('./routes/allusers.cjs');

app.use(loginRouter);
app.use(registerRouter);
app.use(allUsersRouter);








// --- CHESS --- //

const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const chess = new Chess(FEN)

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


app.get('/api/whoseturn', (req, res) => {
  const state = chess.turn();
  res.json({st: state});
});


app.get('/api/myuser', async (req, res) =>{
  const id = req.session.userId;
  let myuser = await getMyUSerFromDB(id);
  res.json({myuser: myuser.rows[0]});
});



// other routes
app.get("/api/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.post('/api/signout', (req, res) => {
    req.session = null;
    res.json({ userId: null });
});

server.listen(PORT, function () {
    console.log(`Express SERVER listening on port ${PORT}`);
});