import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const collection = 'game';
const getObject = (obj) => {
  const { ops } = obj;
  return ops[0];
}
async function create(db) {
  const Game = db.collection(collection);
  const createdAt = moment().toDate();
  const gameId = uuidv4();
  const obj = { gameId, createdAt };
  const game = await Game.insertOne(obj);
  return Promise.resolve(getObject(game));
}

async function findById(db, gameId) {
  const Game = db.collection(collection);
  const obj = { gameId };
  const game = await Game.findOne(obj);
  return Promise.resolve(game);
}

async function findActiveGame(db) {
  const Game = db.collection(collection);
  const time = moment().subtract(60, 'seconds').toDate();
  const game = await Game.findOne({ createdAt: { $gte: time } });
  return Promise.resolve(game);
}

module.exports = {
  create,
  findById,
  findActiveGame,
};