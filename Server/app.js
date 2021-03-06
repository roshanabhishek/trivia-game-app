import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import CloudUtils from './cloud/cloud_utils';

const app = express();

app.use(cors());
var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
const uri = "";
MongoClient.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) return console.error(err);

    console.log('Connected to database');
    db = client.db('gamestation');
  });

/**
* Middleware
*/

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
* Register the routes
*/

app.post('/data/register', (req, res, next) => {
  const params = req.body;
  return CloudUtils.registerNewUser(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/joinGame', (req, res, next) => {
  const params = req.body;
  return CloudUtils.joinOrCreateGame(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/fetchWaitingListPlayers', (req, res, next) => {
  const params = req.body;
  return CloudUtils.fetchWaitingListPlayers(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/fetchQuestion', (req, res, next) => {
  const params = req.body;
  return CloudUtils.fetchQuestion(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/updateAnswer', (req, res, next) => {
  const params = req.body;

  return CloudUtils.updateAnswer(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/fetchPlayerResult', (req, res, next) => {
  const params = req.body;

  return CloudUtils.fetchPlayerResult(db, params)
    .then(result => res.json(result))
    .catch(next);
});

app.post('/data/fetchLeaderboard', (req, res, next) => {
  const params = req.body;

  return CloudUtils.fetchLeaderboard(db, params)
    .then(result => res.json(result))
    .catch(next);
});


export default app;
