const {SESSION_SECRET} = process.env;
const cookieSession = require("cookie-session");

module.exports.cookieSession = cookieSession({
    secret: SESSION_SECRET,
    // keys: [SESSION_SECRET]
    maxAge: 1000*60*60*24*14
});