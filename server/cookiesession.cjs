const {SESSION_SECRET} = process.env;
const cookieSession = require("cookie-session");

module.exports.cookieSession = cookieSession({
    name: 'session',
    // keys: [SESSION_SECRET],
    keys: ['somestr'],
    maxAge: 1000*60*60*24*14
});