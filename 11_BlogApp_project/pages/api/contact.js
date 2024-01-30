import { MongoClient } from 'mongodb';

async function connectDatabase() {
  // Add to mongoDB your IP address to white list (Network Access tab)
  // when you deploy app, also remember to add server ip there
  try {
    const mongoDbUser = {
      userName: 'NextUser',
      password: 'NextPassword',
      collectionName: 'BlogApp',
    };

    const client = await MongoClient.connect(
      `mongodb+srv://${mongoDbUser.userName}:${mongoDbUser.password}@cluster0.xgqtc.mongodb.net/${mongoDbUser.collectionName}?retryWrites=true&w=majority`
    );
    return client;
  } catch (err) {
    res.status(500).json({ message: 'Could not connect to DB' });
    return;
  }
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Input Validation failed' });
      return;
    }

    //store in db
    const newMessage = {
      email,
      name,
      message,
    };

    // Db connection

    const client = await connectDatabase();
    if (!client) return;

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();
    res
      .status(201)
      .json({ message: 'Successfully store the message', message: newMessage });
  }
}

export default handler;
