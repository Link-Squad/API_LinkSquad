/* IMPORT DEPENDENCIES */
require('dotenv').config();
require('./config/db.config');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const passportConfig = require('./config/passport.config');
const session = require('./config/session.config');
const cors = require('./config/cors.config');
const {normalizePort} = require('./helpers/helpers');
const httpErrors = require('./middlewares/httpErrors.middleware');

/* MIDDLEWARE */
const app = express();
//app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(session);
//app.use(passportConfig);


/* ROUTES */
const router = require('./config/routes.js');
app.use('/', router);

/*ERRORS*/
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(httpErrors.errorHandler);

/* Listen on provided port */
const port = normalizePort(process.env.PORT);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});