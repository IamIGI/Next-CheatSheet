import { MongoClient } from 'mongodb';

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

export default {
  connectDatabase,
};
