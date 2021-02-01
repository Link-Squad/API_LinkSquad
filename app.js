/* IMPORT DEPENDENCIES */
require('dotenv').config();
require('./config/db.config');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const session = require('./config/session.config');
const cors = require('./config/cors.config');
const {normalizePort} = require('./helpers/helpers');
const httpErrors = require('./middlewares/httpErrors.middleware');

/* MIDDLEWARE */
const app = express();

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
}

// CORS
app.options('*', cors)
app.use(cors);
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session);


/* ROUTES */
const router = require('./config/routes.js');
app.use('/', router);
app.get('/', (req, res) => res.send('hey'))

/*ERRORS*/
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(httpErrors.errorHandler);

/* Listen on provided port */
const port = normalizePort(process.env.PORT);
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});