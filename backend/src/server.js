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
//app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

/**
 * CORS: put in root URL without / in the first header below. 
 * Has to include http://
 */
app.use((req, res, next) => {
  res.set({"Access-Control-Allow-Origin": "http://localhost:3000"});
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  next();
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


const server = app.listen(
  //process.env.SERVER_PORT,
  SERVER_PORT,
  process.env.SERVER_HOST,
  () => {
    console.log(`Server started at ${server.address().address}:${server.address().port}`,);
  },
);

module.exports = server, app;