const express = require("express");
const app = express();

const normalChessRouter = express.Router();
normalChessRouter.post('/api/normalchess-move', (req, res) => {
    
});
normalChessRouter.post('/api/normalchess-emptyboard', (req, res) => {
    
});
normalChessRouter.post('/api/normalchess-legalmoves', (req, res) => {
    
});
module.exports = { normalChessRouter };