import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const collection = 'gamelog';
const getObject = (obj) => {
  const { ops } = obj;
  return ops[0];
}

async function create(db, params) {
  const GameLog = db.collection(collection);
  const createdAt = moment().toDate();
  const { username, gameId } = params;
  const obj = { gameId, createdAt, username };
  const gamelog = await GameLog.insertOne(obj);
  return Promise.resolve(getObject(gamelog));
}

async function getGamePlayerSize(db, gameId) {
  const GameLog = db.collection(collection);
  const obj = { gameId };
  const gamelogs = await GameLog.find(obj).count();
  return Promise.resolve(gamelogs);
}

async function getGamePlayerList(db, gameId) {
  const GameLog = db.collection(collection);
  const obj = { gameId };
  const data = await GameLog.find(obj).toArray();;
 
  return Promise.resolve(data);
}

module.exports = {
  create,
  getGamePlayerSize,
  getGamePlayerList,
};