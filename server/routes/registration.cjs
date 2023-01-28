const express = require("express");
const { hashPass } = require("../encrypt.cjs");
const { insertDataIntoUsersDB } = require('../db.cjs');

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

registerRouter.post('/api/registration', (req, res) => {
    console.log('helo ins');

    const {firstname, lastname, email, password} = req.body;
    hashPass(password).then((hashedPassword) => {
        if(firstname !== '' && lastname !== '' && email !== '' && password !== ''){
            insertDataIntoUsersDB(firstname, lastname, email, hashedPassword)
                .then(()=>{
                    console.log('insertedd');
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