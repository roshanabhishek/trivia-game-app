import moment from "moment";

const userCollection = 'user';
const getObject = (obj) => {
  const { ops } = obj;
  return ops[0];
}

async function create(db, params) {
  const User = db.collection(userCollection);
  const createdAt = moment().toDate();
  const { username } = params;
  const obj = { username, createdAt };
  const user = await User.insertOne(obj);
  return Promise.resolve(getObject(user));
}

async function findByUsername(db, username) {
  const User = db.collection(userCollection);
  const obj = { username };
  const user = await User.findOne(obj);
  return Promise.resolve(user);
}

module.exports = {
  create,
  findByUsername,
};