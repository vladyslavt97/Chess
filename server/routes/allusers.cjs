const express = require("express");
const { selectAllDataFromUsersDB } = require('../db.cjs');

const allUsersRouter = express.Router();
allUsersRouter.get('/api/allusers', (req, res) => {
    selectAllDataFromUsersDB()
        .then((data) => {
            const withoutMe = data.rows.filter(meOut=>{
                return meOut.id !== req.session.userId;
            });
            res.json({success: true, allUsers: withoutMe});
        })
        .catch(err =>{
            console.log('the error in the friends process: ', err);
            res.json({success: false});
        });
});

module.exports = { allUsersRouter };