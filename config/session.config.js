const expressSession = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);

const session = expressSession({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: true,
	cookie: {
		secure: process.env.SESSION_SECURE,
		sameSite: process.env.SESSION_SAMESITE || true,
		httpOnly: true,
		maxAge: Number(process.env.SESSION_MAX_AGE),
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: Number(process.env.SESSION_MAX_AGE),
	}),
});

module.exports = session;
