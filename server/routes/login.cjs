const express = require("express");
const { compare } = require("../encrypt.cjs");
const { selectAllDataFromUsersDB } = require('../db.cjs');

const loginRouter = express.Router();
loginRouter.post('/api/login', (req, res) => {
    let matchForUserIDs;
    const {email, password} = req.body;
    if(email !== '' && password !== ''){ //if not empty
        // res.json({validation: false}); 
        selectAllDataFromUsersDB()
            .then((allData) => {
                matchForUserIDs = allData.rows.find(el => {//match for email
                    return el.email === email;
                });
                if (matchForUserIDs){ //match for email === true
                    let pwdOfUser = matchForUserIDs.password;
                    // res.json({incorrectData: false});
                    compare(password, pwdOfUser)
                        .then((boolean)=>{//match for pwd
                            if(boolean === true){
                                req.session.userId = matchForUserIDs.id;//good
                                res.json({incorrectData: false});
                            }else{
                                res.json({incorrectData: true});
                            }
                        })
                        .catch(err => {
                            console.log('error with pwd?: ', err);
                        });
                }else {
                    console.log('match for email but not pwd');
                    res.json({incorrectData: true});
                }
            });
    } else {
        console.log('did not pass the validation. Show validation');
        res.json({validation: true}); 
    }
});
module.exports = { loginRouter};