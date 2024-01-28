import { MongoClient } from 'mongodb';

async function connectDatabase() {
  // Add to mongoDB your IP address to white list (Network Access tab)
  // when you deploy app, also remember to add server ip there
  const mongoDbUser = {
    userName: 'NextUser',
    password: 'NextPassword',
    collectionName: 'events',
  };

  const client = await MongoClient.connect(
    `mongodb+srv://${mongoDbUser.userName}:${mongoDbUser.password}@cluster0.xgqtc.mongodb.net/${mongoDbUser.collectionName}?retryWrites=true&w=majority`
  );
  return client;
}

async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  // sort in descending order
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}

export default {
  connectDatabase,
  insertDocument,
  getAllDocuments,
};
