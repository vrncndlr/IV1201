'use strict';
const SERVER_PORT = 8000;
const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');

/**
 * Load the configuration files
 */
require('dotenv-safe').config({
    path: path.join(APP_ROOT_DIR, '.env'),
    example: path.join(APP_ROOT_DIR, '.env.example'),
});

const express = require('express');
const app = express();
//app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

/**
 * Handle HTTP responses
 * @type {{json: Function, raw: Function, text: Function, urlencoded: Function}|{json?: *, raw?: *, text?: *, urlencoded?: *}}
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.send('hello from group 16');
});

const loginRoute = require('./api')
app.use(loginRoute);

/*app.post('/login', async (req, res) => {
  return res.send(userJson);
})

'/login', */

const server = app.listen(
  //process.env.SERVER_PORT,
  SERVER_PORT,
  process.env.SERVER_HOST,
  () => {
    console.log(`Server started at ${server.address().address}:${server.address().port}`,);
  },
);

module.exports = server, app; // Needed for tests.