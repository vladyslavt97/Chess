const isDeployed = true;

require('dotenv').config();
const express = require("express");
const app = express();
const { PORT, WEB_URL } = process.env;
const path = require("path");
const {cookieSession } = require('./cookiesession.cjs');
const cors = require('cors');
const { getLatestMessages, getMyUSerFromDB, getOnlineUsersByTheirIDs, deleteFromGames, insertMessage, startingFenInsert, myLatestGame, updateTheBoard } = require('./db.cjs');
app.use(cors());




app.use(express.static(path.join(__dirname, "..", "dist")));



// ------------------------------------ SOCKET  ------------------------------------ //
const server = require('http').Server(app);
const { Server } = require("socket.io");

// import { Server } from "socket.io";

const originUrl = isDeployed ? "https://chess-rn1q.onrender.com" : "http://localhost:3030";
const io = new Server(server, {
    cors: {
        origin: originUrl,
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const io = require('socket.io')(server, {
//     allowRequest: (req, callback) =>
//         callback(null, req.headers.referer.startsWith(WEB_URL))
// });

io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});

app.use(cookieSession);
app.use(express.json());

app.set("trust proxy", 1);

let usersConnectedInfo = [];
io.on("connection", async (socket) => {
    // console.log("[social:socket] incoming socket connection", socket.id);
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

    const latestMessages = await getLatestMessages();
    socket.emit('chatMessages', latestMessages);

    socket.on('private_message', async (dataClient) => {
      console.log('dataClient: ', dataClient.messageState, 'id: ', dataClient.selectedFriendId);
      let recipient_id = dataClient.selectedFriendId;
      let oneMessage = dataClient.messageState;
      const newMessage = await insertMessage(userId, recipient_id, oneMessage);
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



//-----------------------------------START-----------------------------
    const myLatestGames = await myLatestGame(userId);
    socket.emit('myLatestGame', myLatestGames);

    //the game part!!!
    socket.on('startTheGame', async (clickedUs) =>{
      console.log('socket.on startTheGame clickedUs server', clickedUs);
      let player1_id = userId;
      let player2_id = clickedUs;
      console.log(player1_id, player2_id);
      let board = chess.fen();
      const startingFen = await startingFenInsert(player1_id, player2_id, board);
      let foundSocket = usersConnectedInfo.find(el => el.usersId === clickedUs);

      const state = chess.board().reverse();
      foundSocket.socketId.forEach(each => {
        io.to(each).emit('startTheGame', {
          info: state, 
          senderId: socket.id,
          whatIsInserted: startingFen.rows});
      });

      //to myself
      let mySocket = usersConnectedInfo.find(el => el.usersId === userId);

      // we need to go throught the socketIds and send to each one
      mySocket.socketId.forEach(each => {
          io.to(each).emit('startTheGame', {
          info: state, 
          senderId: socket.id,
          whatIsInserted: startingFen.rows});
      });
    });
    //--------------------------END OF START-----------------------------
    


    // --------------- ONLY MOVE TO GOES THROUGH THE SOCKET!!!! -----------//
    socket.on('moveTo', async (dataMoveTo) => {
      console.log('dataMoveTo::', dataMoveTo);
      const recipient_id = dataMoveTo.clickedUser;
      try{
        chess.move({ from: dataMoveTo.from , to: dataMoveTo.to })
        const currentPosition = chess.fen();
        const newMessage = await updateTheBoard(userId, recipient_id, currentPosition);//only after a successful move
        let foundSocket = usersConnectedInfo.find(el => el.usersId === dataMoveTo.clickedUser);
         
        const gameisover = chess.isGameOver();
        const state = chess.board().reverse();
        foundSocket.socketId.forEach(each => {
          io.to(each).emit('moveTo', {
            info: state, 
            senderId: socket.id,
            gameisover: gameisover});
        });
  
        let mySocket = usersConnectedInfo.find(el => el.usersId === userId);
        mySocket.socketId.forEach(each => {
            io.to(each).emit('moveTo', {
                info: state, 
                senderId: socket.id,
                gameisover: gameisover});
        });
      } 
      catch (error){
        console.log('something went wrong on the legal move validation', error);
      }

    });

// ---------------------------- clear the DB with games ----------------------------//
  // deleteFromGames
socket.on('emptyboard', async (emptyboard) => {
  console.log('emptyboard::', emptyboard);
  const player1_id = userId;
  const player2_id = emptyboard.clickedUserId;
    try{
      chess.reset();
      const deletedGame = await deleteFromGames(player1_id, player2_id);
      let foundSocket = usersConnectedInfo.find(el => el.usersId === emptyboard.clickedUserId);
      const state = chess.board().reverse();
      foundSocket.socketId.forEach(each => {
        io.to(each).emit('moveTo', {
          info: state});
      });
      let mySocket = usersConnectedInfo.find(el => el.usersId === userId);
      mySocket.socketId.forEach(each => {
          io.to(each).emit('moveTo', {
              info: state});
      });
    } 
    catch (error){
      console.log('something went wrong on the legal move validation', error);
    }
  });
// ------------------------------ END OF RESET / CLEAR ---------------------------------//

  socket.on("disconnect", () => {
      const indexOf = usersConnectedInfo.findIndex(el => {
        return el.socketId.find(el => {
          return el === socket.id;
        });
      });
      let spliced = usersConnectedInfo.splice(indexOf, 1);
  });
});
// ------------------------------------ end of socket setup  ------------------------------------ //



//routes
const { loginRouter } = require('./routes/login.cjs');
const { registerRouter } = require('./routes/registration.cjs');
const { allUsersRouter } = require('./routes/allusers.cjs');
const { normalChessRouter } = require('./routes/normal_chess.cjs');

app.use(loginRouter);
app.use(registerRouter);
app.use(allUsersRouter);
app.use(normalChessRouter);


// --- CHESS --- //
const {Chess} = require('chess.js')
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const chess = new Chess(FEN)

app.post('/api/legalmoves', (req, res) => {
  try{
    const movesLegal = chess.moves({ square: req.body.possibleMoves});
    res.json({legalmoves: movesLegal});
  } 
  catch {
    console.log('something went wrong on the legal move validation');
  }
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


// other important routes
app.get("/api/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.post('/api/signout', (req, res) => {
    req.session = null;
    res.json({ userId: null });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express SERVER listening on port ${PORT}`);
});