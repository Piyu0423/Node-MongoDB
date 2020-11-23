const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
  console.log('Connected correctly to server');
  const db = client.db(dbname);
  dboper.insertDocument(db, { name: "Vadonut", description: 'Test' }, 'dishes')
    .then((result) => {
      console.log("insert document:\n", result.ops);
      return dboper.findDocuments(db, 'dishes')
    })
    .then((docs) => {
      console.log('found documents:\n', docs);
      return dboper.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated test' }, 'dishes')
    })
    .then((result) => {
      console.log('updated document:\n', result.result);
      return dboper.findDocuments(db, 'dishes')
    })
    .then((docs) => {
      console.log('found documents:\n', docs);
      return db.dropCollection('dishes')
    })
    .then((result) => {
      console.log('dropped collection :', result);
      client.close();
    })
    .catch((err) => console.log(err));
})
  .catch((err) => console.log(err));