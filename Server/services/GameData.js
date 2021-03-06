const collection = 'gamedata';

async function getData(db, index) {
  const GameData = db.collection(collection);
  const obj = { index: Number(index) };
  const data = await GameData.findOne(obj);

  return Promise.resolve(data);
}

async function getAllGameData(db) {
  const GameData = db.collection(collection);
  const data = await GameData.find({}).toArray();

  return Promise.resolve(data);
}

module.exports = {
  getData,
  getAllGameData,
};