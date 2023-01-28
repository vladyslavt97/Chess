const express = require("express");
const { hashPass } = require("../encrypt");
const { insertDataIntoUsersDB } = require('../db');

const app = express();
const { SESSION_SECRET } = process.env;
const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);

const registerRouter = express.Router();

registerRouter.post('/registration', (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    hashPass(password).then((hashedPassword) => {
        if(firstname !== '' && lastname !== '' && email !== '' && password !== ''){
            insertDataIntoUsersDB(firstname, lastname, email, hashedPassword)
                .then(()=>{
                    res.json({ success: true, validation: false });
                    
                })
                .catch((err) => {
                    console.log('render error', err);
                    res.json({ success: false });
                });
        } else {
            console.log('did not pass the validation. Show validation');
            res.json({validation: true});
        }
    });
});

module.exports = { registerRouter };