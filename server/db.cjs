require('dotenv').config();
const {DATABASE_URL} = process.env;
const spicedPg = require('spiced-pg');
const db = spicedPg(DATABASE_URL);

module.exports.selectAllDataFromUsersDB = () =>{
    return db.query(`SELECT * FROM users;`);
};

module.exports.insertDataIntoUsersDB = (firstname, lastname, email, hashedPassword) => {
    return db.query(`INSERT INTO users (first, last, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, hashedPassword]);
};

//mine
module.exports.getMyUSerFromDB = (id) =>{
    return db.query(`SELECT * FROM users
    Where id = $1;`, [id]);
};


/// Messages!
module.exports.insertMessage = (userId, recipient_id, oneMessage) => {
    return db.query(`
    WITH "user" AS ( SELECT * FROM users WHERE id = $1),
    new_message AS (INSERT INTO messages (sender_id, recipient_id, message) 
    VALUES ($1, $2, $3) 
    RETURNING sender_id, recipient_id, message, created_at, id)
    SELECT new_message.id, recipient_id, message, new_message.created_at, first, last, sender_id 
    FROM "user", new_message;`, [userId, recipient_id, oneMessage]); 
};

//insertMessageToAll
module.exports.insertMessageToAll = (userId, text) => {
    return db.query(`
    INSERT INTO messages (sender_id, message) 
    VALUES ($1, $2) 
    RETURNING *;`, [userId, text]); //with outer join on Users? or Select * From USers
};

//
module.exports.getLatestMessages = (limit = 10) => {
    const sql = `
        SELECT * FROM (
            SELECT m.id, m.sender_id, m.recipient_id, m.message, m.created_at,
                u.first, u.last
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.created_at DESC
            limit $1
        ) as results ORDER BY created_at DESC
    `;

    return db.query(sql, [limit]);
};


// ------------------ GAME -----------------------//
//insert a new game to start
module.exports.startingFenInsert = (player1_id, player2_id, board) => {
    return db.query(`
    INSERT INTO games (player1_id, player2_id, board) 
    VALUES ($1, $2, $3) 
    RETURNING *;`, [player1_id, player2_id, board]);
};

//update the board after each move
module.exports.updateTheBoard = (player1_id, player2_id, board) => {
    return db.query(`UPDATE games 
                    SET board = $3
                    WHERE (player1_id = $1 AND player2_id = $2)
                    OR (player2_id = $1 AND player1_id = $2)
                    RETURNING *;`,[player1_id, player2_id, board]);
};

//delete the game
module.exports.deleteFromGames = (player1_id, player2_id) => {
    return db.query(`
    DELETE FROM games 
    WHERE (player1_id = $1 AND player2_id = $2)
    OR (player1_id = $2 AND player2_id = $1)
    RETURNING *;`,[player1_id, player2_id]);
};


//
module.exports.myLatestGame = (userId) => {
    return db.query(`
    SELECT *
    FROM games
    WHERE (player1_id = $1 OR player2_id = $1)
    ORDER BY created_at DESC;`,[userId]);
};



//online users!!!!!!!!!
module.exports.getOnlineUsersByTheirIDs = (onlineUsers) =>{
    return db.query(`
        SELECT * FROM users WHERE id=ANY($1)
        `, [onlineUsers]);
};