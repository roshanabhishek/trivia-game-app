import moment from 'moment';

const collection = 'userlog';
const getObject = (obj) => {
  const { ops } = obj;
  return ops[0];
}

async function create(db, params) {
  const UserLog = db.collection(collection);
  const createdAt = moment().toDate();
  const { username, gameId, answer, timeTaken } = params;
  const obj = { gameId, createdAt, username, answer, timeTaken };
  const userlog = await UserLog.insertOne(obj);
  return Promise.resolve(getObject(userlog));
}

async function getUserLogs(db, username, gameId) {
  const UserLog = db.collection(collection);
  const obj = { gameId, username };
  const data = await UserLog.find(obj).toArray();;

  return Promise.resolve(data);
}

async function getAllUsersLogs(db, gameId) {
  const UserLog = db.collection(collection);
  const obj = { gameId };
  const data = await UserLog.find(obj).toArray();;

  return Promise.resolve(data);
}

module.exports = {
  create,
  getUserLogs,
  getAllUsersLogs,
};