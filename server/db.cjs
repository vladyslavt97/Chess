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




/// Messages!
module.exports.insertMessage = (userId, recipient_id, oneMessage) => {
    return db.query(`
    WITH "user" AS ( SELECT * FROM users WHERE id = $1),
    new_message AS (INSERT INTO messages (sender_id, recipient_id, message) 
    VALUES ($1, $2, $3) 
    RETURNING sender_id, recipient_id, message, created_at, id)
    SELECT new_message.id, recipient_id, message, new_message.created_at, first, last, profile_pic_url, sender_id 
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
                u.first, u.last, u.profile_pic_url
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.created_at DESC
            limit $1
        ) as results ORDER BY created_at DESC
    `;

    return db.query(sql, [limit]);
};


// ------------------ GAME -----------------------//
