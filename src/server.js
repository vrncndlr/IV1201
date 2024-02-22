'use strict';

/**
 * Starts the server process that receives all HTTP requests and passes them on to relevant handler component.
 * All url routes to be accessed must be registered here with app.use(<url>)
 * Sets up BodyParser, CookieParser and handles CORS permissions.
 * 
 * Handle HTTP responses - is this part needed??
 * @type {{json: Function, raw: Function, text: Function, urlencoded: Function}|{json?: *, raw?: *, text?: *, urlencoded?: *}}
 */

const SERVER_PORT = 8000;
const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');

require('dotenv-safe').config({
    path: path.join(APP_ROOT_DIR, '.env'),
    example: path.join(APP_ROOT_DIR, '.env-example'),
});
 
const express = require('express');
const app = express();
//const cors = require('cors');
//app.use(cors())
//app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());


 // CORS: put in root URL without / in the first header below. 
// Has to include http://
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})


/**
 * Handles requests to /.
 * @returns {HTTPResponse} with a dummy message. 
 */
app.get('/', (req, res) => {
  return res.send('hello from group 16');
});

const loginRoute = require('./api/login')
app.use(loginRoute);

const registerRoute = require('./api/registration')
app.use(registerRoute);

const restoreAccountRoute = require('./api/sendRestoreMail')
app.use(restoreAccountRoute);

const UpdateAccountByEmailCodeRoute = require('./api/UpdateAccountByEmailCode');
app.use(UpdateAccountByEmailCodeRoute);
const fetchRoute = require('./api/fetch')
app.use(fetchRoute);

const updateRoute = require('./api/update')
app.use(updateRoute);

const availabilityRoute = require('./api/availability')
app.use(availabilityRoute);

const errorHandler = require('./api/ErrorHandler')
app.use(errorHandler);

const server = app.listen(
  //process.env.SERVER_PORT,
  process.env.PORT?process.env.PORT:SERVER_PORT,
  process.env.SERVER_HOST,
  () => {
    console.log(`Server started at ${server.address().address}:${server.address().port}`,);
  },
);

module.exports = server, app;