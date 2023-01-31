const {SESSION_SECRET} = process.env;
const cookieSession = require("cookie-session");

module.exports.cookieSession = cookieSession({
    name: 'session',
    keys: [SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000
});