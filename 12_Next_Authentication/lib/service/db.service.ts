import { MongoClient } from 'mongodb';

export enum DbCollections {
  Users = 'users',
}

async function connectDatabase() {
  // Add to mongoDB your IP address to white list (Network Access tab)
  // when you deploy app, also remember to add server ip there
  const mongoDbUser = {
    userName: 'NextUser',
    password: 'NextPassword',
    collectionName: 'AuthenticationNextApp',
  };

  const client = await MongoClient.connect(
    `mongodb+srv://${mongoDbUser.userName}:${mongoDbUser.password}@cluster0.xgqtc.mongodb.net/${mongoDbUser.collectionName}?retryWrites=true&w=majority`
  );
  return client;
}

async function findOneRecord(
  client: MongoClient,
  collectionName: DbCollections,
  filter: { key: string; value: string }
) {
  return await client.db().collection(collectionName).findOne(filter);
}

export default {
  connectDatabase,
  findOneRecord,
};
