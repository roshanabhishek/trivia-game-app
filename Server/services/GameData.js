const collection = 'gamedata';

async function getData(db, index) {
  const GameData = db.collection(collection);
  const obj = { index: Number(index) };
  const data = await GameData.findOne(obj);

  return Promise.resolve(data);
}

module.exports = {
  getData,
};