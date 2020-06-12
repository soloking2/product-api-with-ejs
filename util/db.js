const {MongoClient} = require('mongodb');

let _db;
const mongoConnect = callback => {
 MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
  .then(client => {
    console.log('connected successfully');
    _db = client.db('shop');
    callback();
  }).catch(err => {
    console.log(err)
    throw err;
  });
};

const getDb= () => {
  if(_db) {
    return _db;
  }
  throw 'No databse found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
