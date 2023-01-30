require('dotenv').config();
const express = require("express");
const app = express();
const { PORT, WEB_URL } = process.env;
const {cookieSession } = require('./cookiesession.cjs');
const cors = require('cors');
const { getLatestMessages, getMyUSerFromDB, getOnlineUsersByTheirIDs, insertMessageToAll, insertMessage } = require('./db.cjs');
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


let usersConnectedInfo = [];
io.on("connection", async (socket) => {
    console.log("[social:socket] incoming socket connection", socket.id);
    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }

    //tracking connected users
    let alreadyExist = usersConnectedInfo.find(el => el.usersId === userId);
    if(!alreadyExist){
        usersConnectedInfo.push({
            usersId: userId, 
            socketId: [socket.id]});
    } else {
        alreadyExist.socketId.push(socket.id);
    }
    let onlineUsersAndSockets = usersConnectedInfo.map(el => {
        return Object.values(el);
    });
    let onlineUsers = onlineUsersAndSockets.map(el => el[0]);
    // console.log('onlineUsers: ', onlineUsers);
    const getOnlineUsers = async () => {
        let onlineUsersData = await getOnlineUsersByTheirIDs(onlineUsers);
        socket.emit('online', onlineUsersData.rows);
    };
    getOnlineUsers();
    console.log('lets see who is online: ', usersConnectedInfo);





    //latest messages!
    const latestMessages = await getLatestMessages();
    // console.log('lat: ', latestMessages.rows);
    socket.emit('chatMessages', latestMessages);




    // listen for when the connected user sends a message later
    socket.on('private_message', async (dataClient) => {
    // store the message in the db
      console.log('dataClient: ', dataClient.messageState, 'id: ', dataClient.selectedFriendId);
      let recipient_id = dataClient.selectedFriendId;
      let oneMessage = dataClient.messageState;
      const newMessage = await insertMessage(userId, recipient_id, oneMessage);
      // console.log('nm in server.js', newMessage.rows[0]);

      //to friend
      let foundSocket = usersConnectedInfo.find(el => el.usersId === dataClient.selectedFriendId);
      console.log('fs: ', foundSocket);
      foundSocket.socketId.forEach(each => {
          io.to(each).emit('private_message', {
              info: newMessage.rows[0], 
              senderId: socket.id});
      });

      //to myself
      let mySocket = usersConnectedInfo.find(el => el.usersId === userId);
      console.log('fs: ', mySocket);

      // we need to go throught the socketIds and send to each one
      mySocket.socketId.forEach(each => {
          io.to(each).emit('private_message', {
              info: newMessage.rows[0], 
              senderId: socket.id});
      });
    });

    //latest messages!
    const state = chess.board().reverse();
    socket.emit('theBoard', state);
    
    socket.on("disconnect", () => {
        console.log(socket.id, '= should disappear from the list on onlinne users');
        const indexOf = usersConnectedInfo.findIndex(el => {
          return el.socketId.find(el => {
            return el === socket.id;
          });
        });
        let spliced = usersConnectedInfo.splice(indexOf, 1);
        console.log('Updated usersConnectedInfo: ', usersConnectedInfo, 
            'Spliced: ', spliced
        );
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

// app.get('/api/gamestate', (req, res) => {
//   const state = chess.board().reverse();
//   res.json({st: state});

// });
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