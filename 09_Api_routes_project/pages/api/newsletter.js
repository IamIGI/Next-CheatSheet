import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if ((req.method = 'POST')) {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    // Add to mongoDB you Ip address to whtie list (Network Access tab)
    // when you deploy app, also remember to add server ip there
    const mongoDbUser = {
      userName: 'NextUser',
      password: 'NextPassword',
      collectionName: 'events',
    };

    const client = await MongoClient.connect(
      `mongodb+srv://${mongoDbUser.userName}:${mongoDbUser.password}@cluster0.xgqtc.mongodb.net/${mongoDbUser.collectionName}?retryWrites=true&w=majority`
    );

    const db = client.db();
    await db.collection('newsletter').insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
